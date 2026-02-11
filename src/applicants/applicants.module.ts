import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Applicant } from './entities/applicant.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Applicant])],
  exports: [TypeOrmModule],
})
export class ApplicantsModule {}
