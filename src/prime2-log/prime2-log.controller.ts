import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { Prime2LogService } from './prime2-log.service';
import { CreatePrime2LogDto } from './dto/create-prime2-log.dto';
import { UpdatePrime2LogDto } from './dto/update-prime2-log.dto';

@Controller('prime2-log')
export class Prime2LogController {
  constructor(private readonly prime2LogService: Prime2LogService) {}

  @Post()
  create(@Body() createPrime2LogDto: CreatePrime2LogDto) {
    return this.prime2LogService.create(createPrime2LogDto);
  }

  @Get()
  findAll() {
    return this.prime2LogService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.prime2LogService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePrime2LogDto: UpdatePrime2LogDto) {
    return this.prime2LogService.update(+id, updatePrime2LogDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.prime2LogService.remove(+id);
  }
}
