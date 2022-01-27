import { Injectable } from '@nestjs/common';
import { Prime1Log, Prime2Log, Prime3Log, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { LogMetadataType } from './dto/metadata-return.type';
import { UpdateLog1Dto } from './dto/update-log1.dto';
import * as hash from 'object-hash';

@Injectable()
export class LogService {
  constructor(private prisma: PrismaService) {}

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UserWhereUniqueInput;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
    first?: string;
    last?: string;
  }): Promise<Prime1Log[] | Prime2Log[] | Prime3Log[]> {
    console.log('params', params);
    if (params) {
      const { skip, take, cursor, where, orderBy } = params;
      return await this.prisma.prime1Log.findMany({
        skip,
        take,
        cursor,
        where,
        orderBy: {
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

  async superFind(params: {
    skip?: string;
    take?: string;
    cursor?: Prisma.UserWhereUniqueInput;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
  }): Promise<LogMetadataType> {
    console.log('params', params);

    // Why don't we set first/last to be the cursor override?
    // That's how it functionally works...
    const { skip, take, cursor, where, orderBy, first, last } = Object(params);

    const cursorIndex = first;

    const logs = await this.prisma.prime1Log.findMany({
      skip: Number(skip) || undefined,
      take: Number(take) || undefined,
      cursor,
      where,
      orderBy: {
        entry: 'asc',
      },
      include: {
        User: true,
      },
    });

    const total = logs.length;
    const firstIdx = logs[0].id;
    const lastIdx = logs[logs.length - 1].id;

    const firstLog = logs[0];
    const lastLog = logs[logs.length - 1];

    const firstLogBefore = await this.prisma.prime1Log.findMany({
      orderBy: {
        entry: 'asc',
      },
      cursor: {
        id: firstLog.id,
      },
      take: -1,
      skip: 1,
    });
    console.log('firstLogBeforeSelection', firstLogBefore);

    const firstLogAfter = await this.prisma.prime1Log.findMany({
      orderBy: {
        entry: 'asc',
      },
      cursor: {
        id: lastLog.id,
      },
      take: 1,
      skip: 1,
    });

    const meta = {
      idBefore: firstLogBefore[0]?.id ?? firstIdx,
      idAfter: firstLogAfter[0]?.id ?? lastIdx,
      total,
      firstIdx,
      lastIdx,
      filterParams: params,
      filterParamsHash: hash(JSON.stringify(params)),
    };
    return {
      logs,
      meta,
    };
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
