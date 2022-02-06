import { Injectable } from '@nestjs/common';
import { Prime2Log, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import * as chalk from 'chalk';

@Injectable()
export class Prime2LogService {
  constructor(private prisma: PrismaService) {}

  async findAll(params: Prisma.Prime2LogFindManyArgs): Promise<Prime2Log[]> {
    if (params) {
      const { skip, take, cursor, where, orderBy } = params;
      return await this.prisma.prime2Log.findMany({
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
      return await this.prisma.prime2Log.findMany({
        include: {
          User: true,
        },
        orderBy: {
          entry: 'asc',
        },
      });
    }
  }

  async findOne(id: string): Promise<Prime2Log | null> {
    try {
      return await this.prisma.prime2Log.findUnique({
        where: { id },
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  async findScanned(): Promise<Prime2Log[]> {
    return this.prisma
      .$queryRaw`SELECT * FROM "Prime2Log" WHERE "userId" IS NOT NULL`;
  }

  async superDelete() {
    console.log(`お前はもう`, chalk.red`死んでいる`);
    return this.prisma.$queryRaw`DELETE FROM "Prime2Log" WHERE 1=1`;
  }
}
