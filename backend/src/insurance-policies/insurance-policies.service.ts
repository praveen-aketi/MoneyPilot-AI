import { Injectable } from '@nestjs/common';
import { CreateInsurancePolicyDto } from './dto/create-insurance-policy.dto';
import { UpdateInsurancePolicyDto } from './dto/update-insurance-policy.dto';

@Injectable()
export class InsurancePoliciesService {
  create(createInsurancePolicyDto: CreateInsurancePolicyDto) {
    return 'This action adds a new insurancePolicy';
  }

  findAll() {
    return `This action returns all insurancePolicies`;
  }

  findOne(id: number) {
    return `This action returns a #${id} insurancePolicy`;
  }

  update(id: number, updateInsurancePolicyDto: UpdateInsurancePolicyDto) {
    return `This action updates a #${id} insurancePolicy`;
  }

  remove(id: number) {
    return `This action removes a #${id} insurancePolicy`;
  }
}
