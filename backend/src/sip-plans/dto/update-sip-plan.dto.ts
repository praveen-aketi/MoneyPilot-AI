import { PartialType } from '@nestjs/mapped-types';
import { CreateSipPlanDto } from './create-sip-plan.dto';

export class UpdateSipPlanDto extends PartialType(CreateSipPlanDto) {}
