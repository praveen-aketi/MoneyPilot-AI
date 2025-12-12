import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FinancialProfilesService } from './financial-profiles.service';
import { CreateFinancialProfileDto } from './dto/create-financial-profile.dto';
import { UpdateFinancialProfileDto } from './dto/update-financial-profile.dto';

@Controller('financial-profiles')
export class FinancialProfilesController {
  constructor(private readonly financialProfilesService: FinancialProfilesService) {}

  @Post()
  create(@Body() createFinancialProfileDto: CreateFinancialProfileDto) {
    return this.financialProfilesService.create(createFinancialProfileDto);
  }

  @Get()
  findAll() {
    return this.financialProfilesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.financialProfilesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFinancialProfileDto: UpdateFinancialProfileDto) {
    return this.financialProfilesService.update(+id, updateFinancialProfileDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.financialProfilesService.remove(+id);
  }
}
