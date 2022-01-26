import { Injectable } from '@nestjs/common';
import { Prime1Log, Prime2Log, Prime3Log, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { LogMetadataType } from './dto/metadata-return.type';
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
    const { skip, take, cursor, where, orderBy } = Object(params);
    // check if converting skip to number returns NaN
    // if it does, then set it to ZERO
    const intSkip = Number(skip) || 0;
    const intTake = Number(take) || 0;
    console.log('typeof intSkip', typeof intSkip);
    const logs = await this.prisma.prime1Log.findMany({
      skip: intSkip,
      take: intTake,
      cursor,
      where,
      orderBy: {
        entry: 'asc',
      },
      include: {
        User: true,
      },
    });
    console.log('logs[0]', logs[0]);
    const total = logs.length;
    const firstIdx = logs[0].id;
    const lastIdx = logs[logs.length - 1].id;
    const filterParams = {};
    // this will be the stuff I gotta figure out

    // in order to get the idBefore, we need to know the whole table
    // PLUS the item before the selection
    // so... create the full table
    // then find the id of the first item we need to select
    // then take one more from front and back if possible

    // Can we do a lookup on one item (the first) and like, take -1 to get the before? get a table of 2?

    // holy f this might be working
    const getFirstIdBefore = await this.findAll({
      take: -1,
      skip: 1,
      cursor: {
        id: firstIdx,
      },
    });

    const getFirstIdAfter = await this.findAll({
      take: 1,
      skip: 1,
      cursor: {
        id: lastIdx,
      },
    });

    // now theoretically first ID should be the idBefore
    // now run a query on the table where it's more limited
    // and see if this works
    console.log('getFirstIdBeforeSelection', getFirstIdBefore);
    console.log('getFirstIdAfterSelection', getFirstIdAfter);

    const meta = {
      idBefore: getFirstIdBefore[0].id,
      idAfter: getFirstIdAfter[0].id,
      total,
      firstIdx,
      lastIdx,
      filterParams: params,
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
