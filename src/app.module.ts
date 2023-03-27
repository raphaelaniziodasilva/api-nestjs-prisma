/* eslint-disable prettier/prettier */
import { forwardRef, Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    forwardRef(() => UserModule), 
    forwardRef(() => AuthModule)
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
