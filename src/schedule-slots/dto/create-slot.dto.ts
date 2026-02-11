import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsInt, IsOptional, Min } from 'class-validator';
import { SlotStatus } from '../entities/schedule-slot.entity';

export class CreateSlotDto {
  @ApiProperty({
    description:
      '시작 시각 (KST). 타임존 생략 시 KST로 해석. 30분 단위(00분 또는 30분). endAt은 서버에서 startAt+30분으로 자동 계산',
    example: '2025-02-15T09:00:00',
  })
  @IsDateString()
  startAt: string;

  @ApiPropertyOptional({ description: '정원 (기본 3)', default: 3 })
  @IsOptional()
  @IsInt()
  @Min(1)
  capacity?: number;

  @ApiPropertyOptional({ enum: SlotStatus, default: SlotStatus.OPEN })
  @IsOptional()
  @IsEnum(SlotStatus)
  status?: SlotStatus;
}
