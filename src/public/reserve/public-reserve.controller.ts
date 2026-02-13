import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PublicReserveService } from './public-reserve.service';

@ApiTags('공개 - 예약 (Public Reserve)')
@Controller('public')
export class PublicReserveController {
  constructor(private readonly publicReserveService: PublicReserveService) {}

  @Get('reserve')
  @ApiOperation({
    summary: '예약 페이지 정보 조회',
    description:
      '토큰으로 링크 검증 후, 상담사 정보 및 예약 가능 슬롯 반환. 토큰 만료/이미 사용 시 401.',
  })
  @ApiQuery({
    name: 'token',
    required: true,
    description: '이메일로 수신한 예약 링크의 토큰',
  })
  @ApiQuery({
    name: 'date',
    required: false,
    description: '날짜 필터 (KST, YYYY-MM-DD). 생략 시 모든 미래 슬롯',
    example: '2026-02-11',
  })
  @ApiResponse({
    status: 200,
    description: '상담사 정보 및 예약 가능 슬롯 목록',
    schema: {
      type: 'object',
      properties: {
        counselor: { type: 'object', properties: { id: { type: 'string' } } },
        slots: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'string' },
              counselorId: { type: 'string' },
              startAt: { type: 'string' },
              endAt: { type: 'string' },
              capacity: { type: 'number' },
              bookedCount: { type: 'number' },
              status: { type: 'string' },
            },
          },
        },
      },
    },
  })
  @ApiResponse({ status: 400, description: 'token 파라미터 누락' })
  @ApiResponse({ status: 401, description: '토큰 없음/만료/이미 사용됨' })
  async reserve(@Query('token') token: string, @Query('date') date?: string) {
    return this.publicReserveService.getReservePage(token, date);
  }
}
