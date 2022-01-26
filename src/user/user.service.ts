import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import * as chalk from 'chalk';
import { LogService } from '../log/log.service';
import { PrismaService } from '../prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService, private logService: LogService) {}

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

  async findOne(id: string): Promise<User | null> {
    return await this.prisma.user.findUnique({
      where: { id },
      include: {
        Prime1Log: true,
        Prime2Log: true,
        Prime3Log: true,
      },
    });
  }

  async update(id: string, params: Prisma.UserUpdateInput): Promise<User> {
    // why is ID coming back as an object?
    console.log('params', params);
    console.log('id', id);
    const why = id.toString();
    const userToUpdate = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });
    if (!userToUpdate) {
      throw new Error('User not found');
    }
    return userToUpdate;
  }

  async addLogToUser(userId: string, logId: string) {
    await this.prisma.user.findUnique({
      where: { id: userId },
    });
    await this.logService.findOne(logId);

    // Now need to create the relation between the user and the log
    const updatedUser = await this.prisma.user.update({
      where: { id: userId },
      data: {
        Prime1Log: { connect: { id: logId } },
      },
    });

    await this.logService.update(logId, {
      User: updatedUser,
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
