/* eslint-disable prettier/prettier */
// Vamos ter as rotas de um sistema de autenticação, fazer autenticação de um usuario aonde vamos ter o login, cadastro de um novo usuario e recuperação de senha

import { Body, Controller, Post } from '@nestjs/common/decorators';
import { AuthPasswordRecoveryDTO } from './dto/auth-password-recovery.dto';
import { AuthLoginDTO } from './dto/auth-login.dto';
import { AuthRegisterDTO } from './dto/auth-register.dto';
import { AuthResetPasswordDTO } from './dto/auth-reset-password.dto';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  // va para o arquivo auth.module.ts em controllers e importe o AuthController

  // para poder ter acesso ao UserService precisamos injetar aqui na classe
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  // login: usuario e senha
  @Post('login')
  async login(@Body() {email, password}: AuthLoginDTO) {
    return this.authService.login(email, password);
  }

  // criar um novo usuario
  @Post('register')
  async register(@Body() body: AuthRegisterDTO) {
    // vamos cadastrar um novo usuario, porém agente ja tem esse serviço de cadastro UserService que esta na pasta de user.service.ts
    // para poder acessar o UserService metodo create e usa-lo precisamos importar no arquivo auth.module.ts em imports o UserModule

    return this.userService.create(body);
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
}
