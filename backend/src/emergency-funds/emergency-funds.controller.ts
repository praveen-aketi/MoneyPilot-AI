import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EmergencyFundsService } from './emergency-funds.service';
import { CreateEmergencyFundDto } from './dto/create-emergency-fund.dto';
import { UpdateEmergencyFundDto } from './dto/update-emergency-fund.dto';

@Controller('emergency-funds')
export class EmergencyFundsController {
  constructor(private readonly emergencyFundsService: EmergencyFundsService) {}

  @Post()
  create(@Body() createEmergencyFundDto: CreateEmergencyFundDto) {
    return this.emergencyFundsService.create(createEmergencyFundDto);
  }

  @Get()
  findAll() {
    return this.emergencyFundsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.emergencyFundsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEmergencyFundDto: UpdateEmergencyFundDto) {
    return this.emergencyFundsService.update(+id, updateEmergencyFundDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.emergencyFundsService.remove(+id);
  }
}
