/* eslint-disable prettier/prettier */
// Vamos ter as rotas de um sistema de autenticação, fazer autenticação de um usuario aonde vamos ter o login, cadastro de um novo usuario e recuperação de senha

import { Body, Controller, Post } from '@nestjs/common/decorators';
import { AuthPasswordRecoveryDTO } from './dto/auth-password-recovery.dto';
import { AuthLoginDTO } from './dto/auth-login.dto';
import { AuthRegisterDTO } from './dto/auth-register.dto';
import { AuthResetPasswordDTO } from './dto/auth-reset-password.dto';
import { AuthService } from './auth.service';
import { VerifyTokenDTO } from './dto/auth-verify-token.dto';

@Controller('auth')
export class AuthController {
  // va para o arquivo auth.module.ts em controllers e importe o AuthController

  constructor(private readonly authService: AuthService) {}

  // login: usuario e senha
  @Post('login')
  async login(@Body() {email, password}: AuthLoginDTO) {
    return this.authService.login(email, password);
  }

  // criar um novo usuario
  @Post('register')
  async register(@Body() body: AuthRegisterDTO) {   
    return this.authService.register(body);
  }

  // recuperação da senha: verificando se o email esta cadastrado
  @Post('passwordRecovery')
  async passwordRecovery(@Body() {email}: AuthPasswordRecoveryDTO) {
    return this.authService.passwordRecovery(email);
  }

  // recuperação da senha: trocando a senha por uma nova
  @Post('resetPassword')
  async resetPassword(@Body() {password, token}: AuthResetPasswordDTO) {
    return this.authService.resetPassword(password, token);
  }

  // verificando o token
  @Post('verifyToken')
  async verifyToken(@Body() body: VerifyTokenDTO){
    return await this.authService.verifyToken(body.token);
  }


}
