import { Injectable } from '@nestjs/common';
import { CreateEmergencyFundDto } from './dto/create-emergency-fund.dto';
import { UpdateEmergencyFundDto } from './dto/update-emergency-fund.dto';

@Injectable()
export class EmergencyFundsService {
  create(createEmergencyFundDto: CreateEmergencyFundDto) {
    return 'This action adds a new emergencyFund';
  }

  findAll() {
    return `This action returns all emergencyFunds`;
  }

  findOne(id: number) {
    return `This action returns a #${id} emergencyFund`;
  }

  update(id: number, updateEmergencyFundDto: UpdateEmergencyFundDto) {
    return `This action updates a #${id} emergencyFund`;
  }

  remove(id: number) {
    return `This action removes a #${id} emergencyFund`;
  }
}
