import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import * as chalk from 'chalk';
import { Prime1LogService } from '../prime1-log/prime1-log.service';
import { PrismaService } from '../prisma.service';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private prime1LogService: Prime1LogService,
  ) {}

  async create(data: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({
      data,
    });
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UserWhereUniqueInput;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
  }): Promise<User[]> {
    if (params) {
      const { skip, take, cursor, where, orderBy } = params;
      return this.prisma.user.findMany({
        skip,
        take,
        cursor,
        where,
        orderBy,
        include: {
          Prime1Log: true,
          Prime2Log: true,
          Prime3Log: true,
        },
      });
    } else {
      return this.prisma.user.findMany({
        include: {
          Prime1Log: true,
          Prime2Log: true,
          Prime3Log: true,
        },
      });
    }
  }

  async findOne(params: Prisma.UserFindUniqueArgs): Promise<User | null> {
    const { where } = params;
    return await this.prisma.user.findUnique({
      where,
      include: {
        Prime1Log: true,
        Prime2Log: true,
        Prime3Log: true,
      },
    });
  }

  async update(id: string, params: Prisma.UserUpdateInput): Promise<User> {
    const userToUpdate = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });
    if (!userToUpdate) {
      throw new Error('User not found');
    }
    const updatedUser = await this.prisma.user.update({
      where: {
        id,
      },
      data: params,
    });
    return updatedUser;
  }

  async delete(where: Prisma.UserWhereUniqueInput): Promise<User> {
    return this.prisma.user.delete({
      where,
    });
  }

  async superDelete() {
    console.log(`お前はもう`, chalk.red`死んでいる`);
    return this.prisma.$queryRaw`DELETE FROM "User" WHERE 1=1`;
  }
}
