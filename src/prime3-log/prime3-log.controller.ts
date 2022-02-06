import { Controller, Delete, Get, Param, Query } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Prime3LogService } from './prime3-log.service';

@Controller('prime3-log')
export class Prime3LogController {
  constructor(private readonly prime3LogService: Prime3LogService) {}

  @Get()
  findAll(@Query() query: Prisma.Prime3LogFindManyArgs) {
    return this.prime3LogService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.prime3LogService.findOne(id);
  }

  @Get('scanned')
  findScanned() {
    return this.prime3LogService.findScanned();
  }

  @Delete()
  superDelete() {
    return this.prime3LogService.superDelete();
  }
}
