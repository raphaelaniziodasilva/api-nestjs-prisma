/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { UserController } from './user.controller';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [],
  exports: [],
})
export class UserModule {}

// va para o arquivo app.module.ts em imports e faça a importação do UserModule