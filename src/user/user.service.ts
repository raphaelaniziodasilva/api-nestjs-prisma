/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
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
        // verificando se o id que foi informado existe 
        if(!(await this.prisma.user.count({ // vai contar quantos registros tem esse id 
            where: {
                id // so vai existir um id se não vai ter 0
            }
        }))) {
            throw new NotFoundException(`O usuário ${id} não existe`);
        }
        return await this.prisma.user.findUnique({
            where: {id}
        });
    }

    async update(id: number, {name, email, password, birthAt}: UpdatePutUserDTO) {
        if(!(await this.show(id))) {
            throw new NotFoundException(`O usuário ${id} não existe`);
        }
        
        return await this.prisma.user.update({
            data: {name, email, password, birthAt: birthAt ? new Date(birthAt): null},
            where: {id}
        });
    }

    async delete(id: number) {
        if(!(await this.show(id))) {
            throw new NotFoundException(`O usuário ${id} não existe`);
        }

        return await this.prisma.user.delete({
            where: {id}
        })
    }



    

}
