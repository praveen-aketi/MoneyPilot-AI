import { Injectable } from '@nestjs/common';
import { CreateFinancialProfileDto } from './dto/create-financial-profile.dto';
import { UpdateFinancialProfileDto } from './dto/update-financial-profile.dto';

@Injectable()
export class FinancialProfilesService {
  create(createFinancialProfileDto: CreateFinancialProfileDto) {
    return 'This action adds a new financialProfile';
  }

  findAll() {
    return `This action returns all financialProfiles`;
  }

  findOne(id: number) {
    return `This action returns a #${id} financialProfile`;
  }

  update(id: number, updateFinancialProfileDto: UpdateFinancialProfileDto) {
    return `This action updates a #${id} financialProfile`;
  }

  remove(id: number) {
    return `This action removes a #${id} financialProfile`;
  }
}
