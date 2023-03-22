/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdatePutUserDTO } from './dto/update-put-user.dto';

@Controller('users')
export class UserController {
  // va para o arquivo user.module.ts em controllers e faça a importação do UserController

  @Post()
  async create(@Body() {name, email, password}: CreateUserDTO) {
    return {name, email, password};
  }

  @Get()
  async list(users) {
    return {users:[]};
  }

  @Get(':id')
  async show(@Param('id', ParseIntPipe) id: number) {
    return {user:{}, id}
  }

  @Put(':id')
  async update(@Body() {name, email, password}: UpdatePutUserDTO, @Param('id', ParseIntPipe) id: number) {
    return {
        method: 'put',
        name, email, password,
        id
    }    
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return {
        id
    }
  }


}