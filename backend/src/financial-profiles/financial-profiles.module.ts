import { Module } from '@nestjs/common';
import { FinancialProfilesService } from './financial-profiles.service';
import { FinancialProfilesController } from './financial-profiles.controller';

@Module({
  controllers: [FinancialProfilesController],
  providers: [FinancialProfilesService],
})
export class FinancialProfilesModule {}
