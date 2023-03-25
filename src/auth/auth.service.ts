/* eslint-disable prettier/prettier */
// esse serviço vai ficar responsavel por fazer emissões e verificações de tokens jwt
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { PrismaService } from 'src/databasePrisma/prisma.service';
import { UserService } from 'src/user/user.service';
import { AuthRegisterDTO } from './dto/auth-register.dto';

@Injectable()
export class AuthService {
  // va para o arquivo auth.module.ts em providers e importe o AuthService

  // para poder ter acesso ao JwtService para criar o token e UserService para regidtrar o usuario precisamos injetar aqui na classe
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
    private readonly userService: UserService
  ) {}
  // precisamos importar o PrismaModule para ter acesso ao banco de dados, vá para o arquivo auth.module.ts em imports e importe o PrismaModule

  // vamos precisar do controller de autenticação, crie um arquivo chamado auth.controller.ts

  async createToken(user: User) { // importando o User do @prisma/client 
    return {
      accessToken: this.jwtService.sign({ // metodo sign serve para assinar o token
        // criando o payload
        id: user.id,
        name: user.name,
        email: user.email
      }, {
        // options: criando o token 
        expiresIn: "7 days", // token expira em 7 dias
        subject: String(user.id),
        issuer: 'login', // emitindo o token 
        audience: 'users' // quem tem acesso ao token
      })
    };
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

    return this.createToken(user);
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
    // TO DO: Enviar o email...
    return true;
  }

  // recuperação da senha: trocando a senha por uma nova
  async resetPassword(password: string, token: string) {
    // TO DO: Validar token

    const id = 0;

    const user = await this.prisma.user.update({
        where: {
            id, // usuario que vai trocar a senha
        },
        data: {
            password, // dados que vai ser atualizado: trocando a senha
        }
    });
    return this.createToken(user);
  }

  async register(data: AuthRegisterDTO) {
    // vamos cadastrar um novo usuario, porém agente ja tem esse serviço de cadastro UserService que esta na pasta de user.service.ts
    // para poder acessar o UserService metodo create e usa-lo precisamos importar no arquivo auth.module.ts em imports o UserModule
    const user = await this.userService.create(data); // criando o usuario

    // com o usuario criado ele ja vai estar autenticado 
    return this.createToken(user);
  }
}
