import { Injectable } from '@nestjs/common';
import { CreatePrime1LogDto } from './dto/create-prime1-log.dto';
import { UpdatePrime1LogDto } from './dto/update-prime1-log.dto';

@Injectable()
export class Prime1LogService {
  create(createPrime1LogDto: CreatePrime1LogDto) {
    return 'This action adds a new prime1Log';
  }

  findAll() {
    return `This action returns all prime1Log`;
  }

  findOne(id: number) {
    return `This action returns a #${id} prime1Log`;
  }

  update(id: number, updatePrime1LogDto: UpdatePrime1LogDto) {
    return `This action updates a #${id} prime1Log`;
  }

  remove(id: number) {
    return `This action removes a #${id} prime1Log`;
  }
}
