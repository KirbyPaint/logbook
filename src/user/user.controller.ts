import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Prisma } from '@prisma/client';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: Prisma.UserCreateInput) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll(@Param('param') param) {
    return this.userService.findAll(param);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') userId: string, @Body() params: Prisma.UserUpdateInput) {
    return this.userService.update(userId, params);
  }

  @Patch(':userId/prime/:primeId')
  updateRelation(
    @Param('userId') userId: string,
    @Param('primeId') primeId: string,
  ) {
    return this.userService.addLogToUser(userId, primeId);
  }

  @Delete(':id')
  remove(@Param('id') id: Prisma.UserWhereUniqueInput) {
    return this.userService.delete(id);
  }

  @Delete('nuke/forReal')
  superDelete() {
    return this.userService.superDelete();
  }
}
