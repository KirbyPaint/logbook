import { Module } from '@nestjs/common';
import { Prime3LogService } from './prime3-log.service';
import { Prime3LogController } from './prime3-log.controller';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [Prime3LogController],
  providers: [Prime3LogService, PrismaService],
})
export class Prime3LogModule {}
