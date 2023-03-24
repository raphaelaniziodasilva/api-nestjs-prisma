/* eslint-disable prettier/prettier */
import { IsEmail } from 'class-validator';

export class AuthPasswordRecoveryDTO {

    // para recuperar a senha só precisamos do email e verificar se esta cadastrado para fazer o envio
    @IsEmail()
    email: string;
}
