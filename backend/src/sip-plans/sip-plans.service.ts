import { Injectable } from '@nestjs/common';
import { CreateSipPlanDto } from './dto/create-sip-plan.dto';
import { UpdateSipPlanDto } from './dto/update-sip-plan.dto';

@Injectable()
export class SipPlansService {
  create(createSipPlanDto: CreateSipPlanDto) {
    return 'This action adds a new sipPlan';
  }

  findAll() {
    return `This action returns all sipPlans`;
  }

  findOne(id: number) {
    return `This action returns a #${id} sipPlan`;
  }

  update(id: number, updateSipPlanDto: UpdateSipPlanDto) {
    return `This action updates a #${id} sipPlan`;
  }

  remove(id: number) {
    return `This action removes a #${id} sipPlan`;
  }
}
