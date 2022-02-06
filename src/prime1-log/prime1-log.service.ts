import { Injectable } from '@nestjs/common';
import { Prime1Log, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import * as chalk from 'chalk';

@Injectable()
export class Prime1LogService {
  constructor(private prisma: PrismaService) {}

  async findAll(params: Prisma.Prime1LogFindManyArgs): Promise<Prime1Log[]> {
    if (params) {
      const { skip, take, cursor, where, orderBy } = params;
      return await this.prisma.prime1Log.findMany({
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
      return await this.prisma.prime1Log.findMany({
        include: {
          User: true,
        },
        orderBy: {
          entry: 'asc',
        },
      });
    }
  }

  async findOne(id: string): Promise<Prime1Log | null> {
    try {
      return await this.prisma.prime1Log.findUnique({
        where: { id },
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  async findScanned(): Promise<Prime1Log[]> {
    return this.prisma
      .$queryRaw`SELECT * FROM "Prime1Log" WHERE "userId" IS NOT NULL`;
  }

  async superDelete() {
    console.log(`お前はもう`, chalk.red`死んでいる`);
    return this.prisma.$queryRaw`DELETE FROM "Prime1Log" WHERE 1=1`;
  }
}
