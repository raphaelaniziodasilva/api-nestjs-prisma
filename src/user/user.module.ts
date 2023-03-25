/* eslint-disable prettier/prettier */
import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { PrismaModule } from 'src/databasePrisma/prisma.module';
import { UserIdCheckMiddleware } from '../middleware/user-id-check.middleware';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [PrismaModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],// exportando o serviço para poder ter acesso a ele em outros arquivos
})

// precisamos importar uma interface do nestjs que vai nos obrigar a implementar o metodo que consiga utilizar: aplicar o middleware 
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
      consumer.apply(UserIdCheckMiddleware).forRoutes({
        path: 'users/:id',
        method: RequestMethod.ALL
      });
  }
}

// va para o arquivo app.module.ts em imports e faça a importação do UserModule