import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, IsUUID, MinLength } from 'class-validator';

export class CreatePublicBookingDto {
  @ApiProperty({
    description: '예약 링크의 토큰',
    example: '316dfc6e5487f58a5e922b435601dd4a9e1dc3d1d4655f9d1042a68f7b8f292c',
  })
  @IsString()
  @MinLength(1)
  token: string;

  @ApiProperty({
    description: '예약할 슬롯 ID',
  })
  @IsUUID()
  slotId: string;

  @ApiProperty({
    description: '신청자 이메일',
    example: 'applicant@example.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: '신청자 이름',
    example: '홍길동',
  })
  @IsString()
  @MinLength(1)
  name: string;

  @ApiPropertyOptional({
    description: '신청자 연락처',
  })
  @IsOptional()
  @IsString()
  phone?: string;
}
