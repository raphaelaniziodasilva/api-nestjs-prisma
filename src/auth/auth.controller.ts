/* eslint-disable prettier/prettier */
// Vamos ter as rotas de um sistema de autenticação, fazer autenticação de um usuario aonde vamos ter o login, cadastro de um novo usuario e recuperação de senha

import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common/decorators';
import { AuthPasswordRecoveryDTO } from './dto/auth-password-recovery.dto';
import { AuthLoginDTO } from './dto/auth-login.dto';
import { AuthRegisterDTO } from './dto/auth-register.dto';
import { AuthResetPasswordDTO } from './dto/auth-reset-password.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { User } from 'src/decorators/user.decorator';

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

  // // autorização do token
  // @UseGuards(AuthGuard) // fazendo o uso do guard authorization
  // @Post('authorization')
  // async authorization(@Req() req){
  //   // vamos utilizar os guards que tem um objetivo que e dizer se pode ou não executar o manupulador de rotas, essa rota authorization só pode ser executada se eu tiver um token valido 
  //   // criando o guards, dentro da pasta src crie uma nova pasta chamada guards e dentro dela crie um arquivo chamado auth.guard.ts
  //   return {authorization: 'ok', data: req.tokenPayLoad, user: req.user};
  // }

  // vamos fazer a autorização do token de uma outra forma criando um decorator @User aonde ja vamos ter acesso de todos os dados do usuario, afinal o que tem no token também tem no usuario

  // crie uma pasta dentro de src chamado decorators e dentro dela crie um arquivo user.decorator.ts

  // autorização do token
  @UseGuards(AuthGuard) // fazendo o uso do guard authorization
  @Post('authorization')
  async authorization(@User() user){ // fazendo uso do decorator criado @User
    // dentro do decorator @User(podemos passar os dados que queremos filtrar ex: "email", "id, "nome) e etc...
    return {user};
  }

}
