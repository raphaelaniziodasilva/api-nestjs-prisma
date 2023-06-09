/* eslint-disable prettier/prettier */
import {
  forwardRef,
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { UserIdCheckMiddleware } from '../middleware/user-id-check.middleware';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PrismaModule } from '../databasePrisma/prisma.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    PrismaModule,
    forwardRef(() => AuthModule),
    // após importar o AuthModule agora precisamos resolver o erro de circular dependency
    // para resolver o erro de circular dependency vamos usar: forwardRef(() => AuthModule)
    // va para a pasta auth no arquivo auth.module.ts e utilize forwardRef((UserModule) => )
    
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService], // exportando o serviço para poder ter acesso a ele em outros arquivos
})

// precisamos importar uma interface do nestjs que vai nos obrigar a implementar o metodo que consiga utilizar: aplicar o middleware
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UserIdCheckMiddleware).forRoutes({
      path: 'users/:id',
      method: RequestMethod.ALL,
    });
  }
}

// va para o arquivo app.module.ts em imports e faça a importação do UserModule
