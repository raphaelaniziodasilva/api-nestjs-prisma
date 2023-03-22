/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/databasePrisma/prisma.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdatePutUserDTO } from './dto/update-put-user.dto';

@Injectable()
export class UserService {
    // va para o arquivo user.module.ts em providers e faça a importação do UserService
    constructor(private readonly prisma: PrismaService) {}

    async create(data: CreateUserDTO) {
        return await this.prisma.user.create({
            data
        });
    }

    async list() {
        return await this.prisma.user.findMany();
    }

    async show(id: number) {
        return await this.prisma.user.findUnique({
            where: {id}
        });
    }

    async update(id: number, {name, email, password, birthAt}: UpdatePutUserDTO) {
        return await this.prisma.user.update({
            data: {name, email, password, birthAt: birthAt ? new Date(birthAt): null},
            where: {id}
        });
    }

    

}
