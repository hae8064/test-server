import { ApiProperty } from '@nestjs/swagger';
import { SlotResponseDto } from './slot-response.dto';

export class CreateSlotResponseDto {
  @ApiProperty({
    example: '슬롯이 생성되었습니다.',
    description: '생성 완료 메시지',
  })
  message: string;

  @ApiProperty({
    type: SlotResponseDto,
    description: '생성된 슬롯',
  })
  slot: SlotResponseDto;
}
