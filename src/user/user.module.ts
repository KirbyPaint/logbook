import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from '../prisma.service';
import { LogService } from '../log/log.service';

@Module({
  controllers: [UserController],
  providers: [UserService, PrismaService, LogService],
  exports: [UserService],
})
export class UserModule {}
