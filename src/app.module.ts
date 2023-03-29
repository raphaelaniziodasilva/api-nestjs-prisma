/* eslint-disable prettier/prettier */
import { forwardRef, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    // configurando a variavel de ambiente: modulo de configuração
    ConfigModule.forRoot(),

    // protegendo a API contra ataques de força bruta ou seja muito acesso por segundos
    // vamos instalar o pacote throttler: npm i @nestjs/throttler
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10
    }),

    forwardRef(() => UserModule), 
    forwardRef(() => AuthModule)
  ],
  controllers: [],
  providers: [{
    // protegendo todas as rotas da API contra ataques de força bruta
    provide: APP_GUARD,
    useClass: ThrottlerGuard
  }],
})
export class AppModule {}
