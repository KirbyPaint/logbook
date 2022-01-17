import { Injectable } from '@nestjs/common';
import { Prime1Log, Prime2Log, Prime3Log, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { UpdateLog1Dto } from './dto/update-log1.dto';

@Injectable()
export class LogService {
  constructor(private prisma: PrismaService) {}

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UserWhereUniqueInput;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
  }): Promise<Prime1Log[] | Prime2Log[] | Prime3Log[]> {
    if (params) {
      const { skip, take, cursor, where, orderBy } = params;
      return this.prisma.prime1Log.findMany({
        skip,
        take,
        cursor,
        where,
        orderBy,
        include: {
          User: true,
        },
      });
    } else {
      return this.prisma.prime1Log.findMany({
        include: {
          User: true,
        },
      });
    }
  }

  async findOne(id: string): Promise<Prime1Log | null> {
    return await this.prisma.prime1Log.findUnique({
      where: { id },
    });
  }

  async findScanned(): Promise<Prime1Log[] | Prime2Log[] | Prime3Log[]> {
    return this.prisma
      .$queryRaw`SELECT * FROM "Prime1Log" WHERE "userId" IS NOT NULL`;
  }

  // only updatable field is going to be who has collected this log
  update(id: string, updateLog1Dto: UpdateLog1Dto) {
    return `This action updates a #${id} log`;
  }
}
