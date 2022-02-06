import { PartialType } from '@nestjs/mapped-types';
import { CreatePrime3LogDto } from './create-prime3-log.dto';

export class UpdatePrime3LogDto extends PartialType(CreatePrime3LogDto) {}
