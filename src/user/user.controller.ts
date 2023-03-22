/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdatePutUserDTO } from './dto/update-put-user.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  // va para o arquivo user.module.ts em controllers e faça a importação do UserController

  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() data: CreateUserDTO) {
    return await this.userService.create(data);
  }

  @Get()
  async list() {
    return await this.userService.list();
  }

  @Get(':id')
  async show(@Param('id', ParseIntPipe) id: number) {
    return await this.userService.show(id); 
  }

  @Put(':id')
  async update(@Body() data: UpdatePutUserDTO, @Param('id', ParseIntPipe) id: number) {
    return await this.userService.update(id, data)
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.userService.delete(id);
  }

}