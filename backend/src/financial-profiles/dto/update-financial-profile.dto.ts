import { PartialType } from '@nestjs/mapped-types';
import { CreateFinancialProfileDto } from './create-financial-profile.dto';

export class UpdateFinancialProfileDto extends PartialType(CreateFinancialProfileDto) {}
