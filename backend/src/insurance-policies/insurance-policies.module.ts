import { Module } from '@nestjs/common';
import { InsurancePoliciesService } from './insurance-policies.service';
import { InsurancePoliciesController } from './insurance-policies.controller';

@Module({
  controllers: [InsurancePoliciesController],
  providers: [InsurancePoliciesService],
})
export class InsurancePoliciesModule {}
