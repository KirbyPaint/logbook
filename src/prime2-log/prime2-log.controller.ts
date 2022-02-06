import { Controller, Delete, Get, Param, Query } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Prime2LogService } from './prime2-log.service';

@Controller('prime2-log')
export class Prime2LogController {
  constructor(private readonly prime2LogService: Prime2LogService) {}

  @Get()
  findAll(@Query() query: Prisma.Prime2LogFindManyArgs) {
    return this.prime2LogService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.prime2LogService.findOne(id);
  }

  @Get('scanned')
  findScanned() {
    return this.prime2LogService.findScanned();
  }

  @Delete()
  superDelete() {
    return this.prime2LogService.superDelete();
  }
}
