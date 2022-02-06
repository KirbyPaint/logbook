import { Module } from '@nestjs/common';
import { Prime2LogService } from './prime2-log.service';
import { Prime2LogController } from './prime2-log.controller';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [Prime2LogController],
  providers: [Prime2LogService, PrismaService],
})
export class Prime2LogModule {}
