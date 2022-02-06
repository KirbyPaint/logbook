import { Injectable } from '@nestjs/common';
import { Prime3Log, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import * as chalk from 'chalk';

@Injectable()
export class Prime3LogService {
  constructor(private prisma: PrismaService) {}

  async findAll(params: Prisma.Prime3LogFindManyArgs): Promise<Prime3Log[]> {
    if (params) {
      const { skip, take, cursor, where, orderBy } = params;
      return await this.prisma.prime3Log.findMany({
        skip,
        take,
        cursor,
        where,
        orderBy: orderBy ?? {
          entry: 'asc',
        },
        include: {
          User: true,
        },
      });
    } else {
      return await this.prisma.prime3Log.findMany({
        include: {
          User: true,
        },
        orderBy: {
          entry: 'asc',
        },
      });
    }
  }

  async findOne(id: string): Promise<Prime3Log | null> {
    try {
      return await this.prisma.prime3Log.findUnique({
        where: { id },
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  async findScanned(): Promise<Prime3Log[]> {
    return this.prisma
      .$queryRaw`SELECT * FROM "Prime3Log" WHERE "userId" IS NOT NULL`;
  }

  async superDelete() {
    console.log(`お前はもう`, chalk.red`死んでいる`);
    return this.prisma.$queryRaw`DELETE FROM "Prime3Log" WHERE 3=3`;
  }
}
