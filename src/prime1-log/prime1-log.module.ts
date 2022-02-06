import { Module } from '@nestjs/common';
import { Prime1LogService } from './prime1-log.service';
import { Prime1LogController } from './prime1-log.controller';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [Prime1LogController],
  providers: [Prime1LogService, PrismaService],
})
export class Prime1LogModule {}
