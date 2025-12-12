import { Module } from '@nestjs/common';
import { SipPlansService } from './sip-plans.service';
import { SipPlansController } from './sip-plans.controller';

@Module({
  controllers: [SipPlansController],
  providers: [SipPlansService],
})
export class SipPlansModule {}
