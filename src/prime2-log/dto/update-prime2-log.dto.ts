import { PartialType } from '@nestjs/mapped-types';
import { CreatePrime2LogDto } from './create-prime2-log.dto';

export class UpdatePrime2LogDto extends PartialType(CreatePrime2LogDto) {}
