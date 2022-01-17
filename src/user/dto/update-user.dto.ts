import { PartialType } from '@nestjs/mapped-types';
import { Prime1Log, Prime2Log, Prime3Log } from '@prisma/client';
import { IsEmail, IsOptional, IsString, IsUUID } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsOptional()
  @IsEmail()
  email?: string;
  @IsOptional()
  @IsString()
  name?: string;
  @IsOptional()
  @IsString()
  username?: string;
  @IsOptional()
  @IsString()
  password?: string;
  @IsOptional()
  @IsUUID()
  Prime1Log: Prime1Log;
  @IsOptional()
  @IsUUID()
  Prime2Log: Prime2Log;
  @IsOptional()
  @IsUUID()
  Prime3Log: Prime3Log;
}
