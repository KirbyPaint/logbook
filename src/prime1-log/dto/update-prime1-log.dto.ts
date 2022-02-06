import { PartialType } from '@nestjs/mapped-types';
import { CreatePrime1LogDto } from './create-prime1-log.dto';

export class UpdatePrime1LogDto extends PartialType(CreatePrime1LogDto) {}
