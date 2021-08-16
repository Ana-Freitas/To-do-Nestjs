import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, ValidationPipe, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body(ValidationPipe) createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async findAll() {
    return this.userService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findOne(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':username')
  async findByUsername(@Param('username') username: string) {
    return this.userService.findByUsername(username);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body(ValidationPipe) updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.userService.remove(id);
  }
}
