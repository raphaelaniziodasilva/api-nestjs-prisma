/* eslint-disable prettier/prettier */
// aqui vai ficar o modulo JWT para emitir tokens jwt, verificar se temos o token valido recebendo da aplicação
// instalando o JWT --> npm install @nestjs/jwt@9.0.0

import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaModule } from '../databasePrisma/prisma.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY
    }),
    forwardRef(() => UserModule),
    // agora va para o arquivo app.module.ts e utilize forwardRef(() =>) em AuthModule e UserModule
  
    PrismaModule, // acessando o banco de dados
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}

// va para o arquivo app.module.ts em imports e importe o AuthModule

// A nossa configuração: instalação esta pronta ja conseguimos emitir e validar tokens

// para conseguir emitir e validar tokens vamos fazer pelo serviço, crie um arquivo chamado auth.service.ts
