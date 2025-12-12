import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InsurancePoliciesService } from './insurance-policies.service';
import { CreateInsurancePolicyDto } from './dto/create-insurance-policy.dto';
import { UpdateInsurancePolicyDto } from './dto/update-insurance-policy.dto';

@Controller('insurance-policies')
export class InsurancePoliciesController {
  constructor(private readonly insurancePoliciesService: InsurancePoliciesService) {}

  @Post()
  create(@Body() createInsurancePolicyDto: CreateInsurancePolicyDto) {
    return this.insurancePoliciesService.create(createInsurancePolicyDto);
  }

  @Get()
  findAll() {
    return this.insurancePoliciesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.insurancePoliciesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInsurancePolicyDto: UpdateInsurancePolicyDto) {
    return this.insurancePoliciesService.update(+id, updateInsurancePolicyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.insurancePoliciesService.remove(+id);
  }
}
