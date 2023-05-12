/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseInterceptors } from '@nestjs/common';
import { UseGuards } from '@nestjs/common/decorators';
import { LoggingInterceptor } from '../interceptors/log.onterceptor';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdatePutUserDTO } from './dto/update-put-user.dto';
import { UserService } from './user.service';
import { AuthGuard } from '../guards/auth.guard';
import { RoleGuard } from '../guards/role.guard';
import { Role } from '../enums/role.enum';
import { Roles } from '../decorators/roles.decorator';

// vamos fazer a autenticação das rotas, todas as rotas vão ter o guard RoleGuard e depois vamos la no postman e adicionar o token em cada rota para fazer a autenticação das rotas
@UseGuards(AuthGuard, RoleGuard)
// ,importe o arquivo role.enum
@Roles(Role.Admin)
// @UseInterceptors(LoggingInterceptor)// usando o interceptor de forma local

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