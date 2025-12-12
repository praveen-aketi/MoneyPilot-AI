import { Module } from '@nestjs/common';
import { EmergencyFundsService } from './emergency-funds.service';
import { EmergencyFundsController } from './emergency-funds.controller';

@Module({
  controllers: [EmergencyFundsController],
  providers: [EmergencyFundsService],
})
export class EmergencyFundsModule {}
