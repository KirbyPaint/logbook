import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UpdateLog1Dto } from './dto/update-log1.dto';
import { LogService } from './log.service';

@Controller('log')
export class LogController {
  constructor(private readonly logService: LogService) {}

  // No Create method, logs will never be created
  // UNTIL METROID PRIME 4 IS OUT AYOOO

  @Get()
  findAll(@Param('param') param) {
    return this.logService.findAll(param);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.logService.findOne(id);
  }

  @Get('scanned/prime')
  findScanned() {
    return this.logService.findScanned();
  }

  // The only Update action that should be taken is
  // updating the User who has scanned the log
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLogDto: UpdateLog1Dto) {
    return this.logService.update(id, updateLogDto);
  }
}
