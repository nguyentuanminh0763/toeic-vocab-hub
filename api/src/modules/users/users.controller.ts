import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ParseUUIDPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.userService.create(createUserDto);
    console.log(user);
    return {
      success: true,
      data: user,
      message: 'User created successfully',
    };
  }

  @Get()
  async findAll() {
    const users = await this.userService.findAll();
    return {
      success: true,
      users,
      message: 'User read successfully',
    };
  }

  @Get(':id')
  async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    const user = await this.userService.findOne(id);
    return {
      success: true,
      user,
      message: 'User read successfully',
    };
  }

  @Patch(':id/suspend')
  async suspendUser(@Param('id', new ParseUUIDPipe()) id: string) {
    const user = await this.userService.suspendUser(id);
    return {
      success: true,
      user,
      message: 'Suspend user successfully',
    };
  }

  @Patch(':id/activate')
  async activateUser(@Param('id', new ParseUUIDPipe()) id: string) {
    const user = await this.userService.activateUser(id);
    return {
      success: true,
      user,
      message: 'Activate user successfully',
    };
  }

  @Delete(':id')
  async softDeleteUser(@Param('id', new ParseUUIDPipe()) id: string) {
    await this.userService.softDeleteUser(id);
    return {
      success: true,
      message: 'Soft delete user successfully',
    };
  }

  @Patch(':id/restore')
  async restoreUser(@Param('id', new ParseUUIDPipe()) id: string) {
    await this.userService.restoreUser(id);
    return {
      success: true,
      message: 'Restore user successfully',
    };
  }

  @Delete(':id/hard')
  async hardDeleteUser(@Param('id', new ParseUUIDPipe()) id: string) {
    await this.userService.hardDeleteUser(id);
    return {
      success: true,
      message: 'Soft delete user successfully',
    };
  }
}
