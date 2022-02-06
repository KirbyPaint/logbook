import { Injectable } from '@nestjs/common';
import { CreatePrime2LogDto } from './dto/create-prime2-log.dto';
import { UpdatePrime2LogDto } from './dto/update-prime2-log.dto';

@Injectable()
export class Prime2LogService {
  create(createPrime2LogDto: CreatePrime2LogDto) {
    return 'This action adds a new prime2Log';
  }

  findAll() {
    return `This action returns all prime2Log`;
  }

  findOne(id: number) {
    return `This action returns a #${id} prime2Log`;
  }

  update(id: number, updatePrime2LogDto: UpdatePrime2LogDto) {
    return `This action updates a #${id} prime2Log`;
  }

  remove(id: number) {
    return `This action removes a #${id} prime2Log`;
  }
}
