/* eslint-disable prettier/prettier */
// esse serviço vai ficar responsavel por fazer emissões e verificações de tokens jwt
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/databasePrisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) {}
  // precisamos importar o PrismaModule para ter acesso ao banco de dados, vá para o arquivo auth.module.ts em imports e importe o PrismaModule

  // vamos precisar do controller de autenticação, crie um arquivo chamado auth.controller.ts

  async createToken() {
    // return await this.jwtService.sign();
  }

  async verifyToken(token: string) {
    // return await this.jwtService.verify();
  }

  // login: usuario e senha
  async login(email: string, password: string) {
    const user = await this.prisma.user.findFirst({
        where: {
            email,
            password
        }
    });

    if(!user) {
        throw new UnauthorizedException('Email e/ou senha incorretos');
    }

    return user;
  }

  // recuperação da senha: verificando se o email esta cadastrado
  async passwordRecovery(email: string) {
    const user = await this.prisma.user.findFirst({
        where: {
            email
        }
    });
    
    if(!user) {
        throw new UnauthorizedException('Email incorreto');
    }
    // TO DO: Enviar email...
  }

  // recuperação da senha: trocando a senha por uma nova
  async resetPassword(password: string, token: string) {
    // TO DO: Validar token

    const id = 0;

    await this.prisma.user.update({
        where: {
            id, // usuario que vai trocar a senha
        },
        data: {
            password, // dados que vai ser atualizado: trocando a senha
        }
    });

    return true;    
  }  
}
