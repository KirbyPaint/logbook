import { Controller, Delete, Get, Param, Query } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Prime1LogService } from './prime1-log.service';

@Controller('prime1-log')
export class Prime1LogController {
  constructor(private readonly prime1LogService: Prime1LogService) {}

  @Get()
  findAll(@Query() query: Prisma.Prime1LogFindManyArgs) {
    return this.prime1LogService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.prime1LogService.findOne(id);
  }

  @Get('scanned')
  findScanned() {
    return this.prime1LogService.findScanned();
  }

  @Delete()
  superDelete() {
    return this.prime1LogService.superDelete();
  }
}
