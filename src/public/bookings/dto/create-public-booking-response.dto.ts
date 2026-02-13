import { ApiProperty } from '@nestjs/swagger';

export class CreatePublicBookingResponseDto {
  @ApiProperty({
    example: '예약이 완료되었습니다.',
    description: '완료 메시지',
  })
  message: string;

  @ApiProperty({
    description: '생성된 예약 ID',
  })
  bookingId: string;
}
