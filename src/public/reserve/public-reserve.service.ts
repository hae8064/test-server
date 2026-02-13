import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as crypto from 'crypto';
import { EmailLinkToken } from '../../email-link-tokens/entities/email-link-token.entity';
import { ScheduleSlot } from '../../schedule-slots/entities/schedule-slot.entity';
import { ScheduleSlotsService } from '../../schedule-slots/schedule-slots.service';
import { User } from '../../users/entities/user.entity';

@Injectable()
export class PublicReserveService {
  constructor(
    @InjectRepository(EmailLinkToken)
    private readonly tokenRepository: Repository<EmailLinkToken>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly scheduleSlotsService: ScheduleSlotsService,
  ) {}

  /**
   * 토큰 검증 후 상담사 정보 및 예약 가능 슬롯 반환.
   * @throws UnauthorizedException 토큰 없음/미존재/만료/이미 사용됨
   */
  async getReservePage(
    rawToken: string,
    date?: string,
  ): Promise<{
    counselor: { id: string };
    slots: Record<string, unknown>[];
  }> {
    if (!rawToken?.trim()) {
      throw new BadRequestException('token 쿼리 파라미터가 필요합니다.');
    }

    const tokenHash = crypto
      .createHash('sha256')
      .update(rawToken.trim())
      .digest('hex');

    const tokenRecord = await this.tokenRepository.findOne({
      where: { tokenHash },
    });

    if (!tokenRecord) {
      throw new UnauthorizedException('유효하지 않거나 만료된 링크입니다.');
    }

    const now = new Date();
    if (tokenRecord.expiresAt.getTime() < now.getTime()) {
      throw new UnauthorizedException('링크가 만료되었습니다.');
    }

    if (tokenRecord.usedAt) {
      throw new UnauthorizedException('이미 사용된 링크입니다.');
    }

    const counselor = await this.userRepository.findOne({
      where: { id: tokenRecord.counselorId },
    });
    if (!counselor) {
      throw new UnauthorizedException('상담사 정보를 찾을 수 없습니다.');
    }

    const slots: ScheduleSlot[] =
      await this.scheduleSlotsService.findAvailableForPublic(
        tokenRecord.counselorId,
        date,
      );

    return {
      counselor: { id: counselor.id },
      slots: slots.map((s: ScheduleSlot) =>
        this.scheduleSlotsService.formatSlotForResponse(s),
      ),
    };
  }
}
