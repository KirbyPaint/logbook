import { Module } from '@nestjs/common';
import { Prime3LogService } from './prime3-log.service';
import { Prime3LogController } from './prime3-log.controller';

@Module({
  controllers: [Prime3LogController],
  providers: [Prime3LogService]
})
export class Prime3LogModule {}
