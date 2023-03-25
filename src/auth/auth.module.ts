/* eslint-disable prettier/prettier */
// aqui vai ficar o modulo JWT para emitir tokens jwt, verificar se temos o token valido recebendo da aplicação
// instalando o JWT --> npm install @nestjs/jwt@9.0.0
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from 'src/databasePrisma/prisma.module';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    JwtModule.register({
      secret: '0dLa27tyKYNSyl5HFnPnNzH0RfNEJ1iY',
      // signOptions: { expiresIn: '1d' }
    }),
    UserModule,
    PrismaModule, // acessando o banco de dados
  ],
  controllers: [AuthController],
})
export class AuthModule {}

// A nossa configuração: instalação esta pronta ja conseguimos emitir e validar tokens

// para conseguir emitir e validar tokens vamos fazer pelo serviço, crie um arquivo chamado auth.service.ts