import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { Prime3LogService } from './prime3-log.service';
import { CreatePrime3LogDto } from './dto/create-prime3-log.dto';
import { UpdatePrime3LogDto } from './dto/update-prime3-log.dto';

@Controller('prime3-log')
export class Prime3LogController {
  constructor(private readonly prime3LogService: Prime3LogService) {}

  @Post()
  create(@Body() createPrime3LogDto: CreatePrime3LogDto) {
    return this.prime3LogService.create(createPrime3LogDto);
  }

  @Get()
  findAll() {
    return this.prime3LogService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.prime3LogService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePrime3LogDto: UpdatePrime3LogDto) {
    return this.prime3LogService.update(+id, updatePrime3LogDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.prime3LogService.remove(+id);
  }
}
