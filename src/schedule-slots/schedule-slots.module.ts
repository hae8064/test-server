import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleSlot } from './entities/schedule-slot.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ScheduleSlot])],
  exports: [TypeOrmModule],
})
export class ScheduleSlotsModule {}
