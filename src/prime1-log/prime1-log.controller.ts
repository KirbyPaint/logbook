import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { Prime1LogService } from './prime1-log.service';
import { CreatePrime1LogDto } from './dto/create-prime1-log.dto';
import { UpdatePrime1LogDto } from './dto/update-prime1-log.dto';

@Controller('prime1-log')
export class Prime1LogController {
  constructor(private readonly prime1LogService: Prime1LogService) {}

  @Post()
  create(@Body() createPrime1LogDto: CreatePrime1LogDto) {
    return this.prime1LogService.create(createPrime1LogDto);
  }

  @Get()
  findAll() {
    return this.prime1LogService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.prime1LogService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePrime1LogDto: UpdatePrime1LogDto) {
    return this.prime1LogService.update(+id, updatePrime1LogDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.prime1LogService.remove(+id);
  }
}
