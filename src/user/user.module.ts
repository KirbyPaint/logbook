import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from '../prisma.service';
import { Prime1LogService } from '../prime1-log/prime1-log.service';
import { Prime2LogService } from '../prime2-log/prime2-log.service';
import { Prime3LogService } from '../prime3-log/prime3-log.service';

@Module({
  controllers: [UserController],
  providers: [
    UserService,
    PrismaService,
    Prime1LogService,
    Prime2LogService,
    Prime3LogService,
  ],
  exports: [UserService],
})
export class UserModule {}
