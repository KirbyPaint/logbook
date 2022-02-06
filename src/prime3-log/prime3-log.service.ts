import { Injectable } from '@nestjs/common';
import { CreatePrime3LogDto } from './dto/create-prime3-log.dto';
import { UpdatePrime3LogDto } from './dto/update-prime3-log.dto';

@Injectable()
export class Prime3LogService {
  create(createPrime3LogDto: CreatePrime3LogDto) {
    return 'This action adds a new prime3Log';
  }

  findAll() {
    return `This action returns all prime3Log`;
  }

  findOne(id: number) {
    return `This action returns a #${id} prime3Log`;
  }

  update(id: number, updatePrime3LogDto: UpdatePrime3LogDto) {
    return `This action updates a #${id} prime3Log`;
  }

  remove(id: number) {
    return `This action removes a #${id} prime3Log`;
  }
}
