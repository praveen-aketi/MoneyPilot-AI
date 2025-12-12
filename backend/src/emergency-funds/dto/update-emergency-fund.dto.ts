import { PartialType } from '@nestjs/mapped-types';
import { CreateEmergencyFundDto } from './create-emergency-fund.dto';

export class UpdateEmergencyFundDto extends PartialType(CreateEmergencyFundDto) {}
