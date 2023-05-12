/* eslint-disable prettier/prettier */
// Vamos ter as rotas de um sistema de autenticação, fazer autenticação de um usuario aonde vamos ter o login, cadastro de um novo usuario e recuperação de senha

import {
  Body,
  Controller,
  FileTypeValidator,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  FileFieldsInterceptor,
  FileInterceptor,
  FilesInterceptor,
} from '@nestjs/platform-express'; // ler arquivos
import { AuthService } from './auth.service';
import { AuthLoginDTO } from './dto/auth-login.dto';
import { AuthPasswordRecoveryDTO } from './dto/auth-password-recovery.dto';
import { AuthRegisterDTO } from './dto/auth-register.dto';
import { AuthResetPasswordDTO } from './dto/auth-reset-password.dto';
// vamos importar o writeFile para salvar os arquivos no db
import { writeFile } from 'fs/promises';
import { join } from 'path';
import { User } from '../decorators/user.decorator';
import { AuthGuard } from '../guards/auth.guard';

@Controller('auth')
export class AuthController {
  // va para o arquivo auth.module.ts em controllers e importe o AuthController

  constructor(private readonly authService: AuthService) {}

  // login: usuario e senha
  @Post('login')
  async login(@Body() { email, password }: AuthLoginDTO) {
    return this.authService.login(email, password);
  }

  // criar um novo usuario
  @Post('register')
  async register(@Body() body: AuthRegisterDTO) {
    return this.authService.register(body);
  }

  // recuperação da senha: verificando se o email esta cadastrado
  @Post('passwordRecovery')
  async passwordRecovery(@Body() { email }: AuthPasswordRecoveryDTO) {
    return this.authService.passwordRecovery(email);
  }

  // recuperação da senha: trocando a senha por uma nova
  @Post('resetPassword')
  async resetPassword(@Body() { password, token }: AuthResetPasswordDTO) {
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
  async authorization(@User() user) {
    // fazendo uso do decorator criado @User
    // dentro do decorator @User(podemos passar os dados que queremos filtrar ex: "email", "id, "nome) e etc...
    return { user };
  }

  // upload de arquivo de fotos usando o post
  @UseInterceptors(FileInterceptor('file'))
  @UseGuards(AuthGuard)
  @Post('photo')
  async uploadPhoto(@User() user, @UploadedFile(new ParseFilePipe({
    validators: [ // validação de arquivos
      new FileTypeValidator({fileType: 'image/jpg'}), // só arquivos jpg
      new MaxFileSizeValidator({maxSize: 1024 * 50}) // tamanho do arquivo
    ]
  })) photo: Express.Multer.File) {
    // agora vamos salvar a foto: arquivo no sistema
    // crie uma pasta fora do src chamado storage e dentro dela uma subpasta photo nessa pasta vai ser gerado as photos enviando pelo post

    const result = await writeFile(
      join(__dirname, '..', '..', 'storage', 'photo', 'damon slayer.jpg'),
      photo.buffer,
    );

    return { result };
  }

  // upload de varios arquivos de fotos usando o post
  @UseInterceptors(FilesInterceptor('files'))
  @UseGuards(AuthGuard)
  @Post('files')
  async uploadFiles(
    @User() user,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    return files;
  }

  // upload de varios arquivos de fotos e documnets usando o post
  @UseInterceptors(
    FileFieldsInterceptor([
      {
        name: 'photo',
        maxCount: 1,
      },
      {
        name: 'documents',
        maxCount: 10,
      },
    ]),
  )
  @UseGuards(AuthGuard)
  @Post('files-fields')
  async uploadFilesFields(
    @User() user,
    @UploadedFiles()
    files: { photo: Express.Multer.File; documents: Express.Multer.File[] },
  ) {
    return files;
  }
}
