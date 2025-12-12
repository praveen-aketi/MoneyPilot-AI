import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SipPlansService } from './sip-plans.service';
import { CreateSipPlanDto } from './dto/create-sip-plan.dto';
import { UpdateSipPlanDto } from './dto/update-sip-plan.dto';

@Controller('sip-plans')
export class SipPlansController {
  constructor(private readonly sipPlansService: SipPlansService) {}

  @Post()
  create(@Body() createSipPlanDto: CreateSipPlanDto) {
    return this.sipPlansService.create(createSipPlanDto);
  }

  @Get()
  findAll() {
    return this.sipPlansService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sipPlansService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSipPlanDto: UpdateSipPlanDto) {
    return this.sipPlansService.update(+id, updateSipPlanDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sipPlansService.remove(+id);
  }
}
