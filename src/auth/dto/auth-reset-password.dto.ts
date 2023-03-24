/* eslint-disable prettier/prettier */
import { IsJWT, IsString, MinLength } from 'class-validator';

export class AuthResetPasswordDTO {

    // para poder resetar a senha nos precisamos de uma nova senha e o token de autorização: ou seja o codigo

    @IsString()
    @MinLength(6)
    password: string

    @IsJWT()
    token: string
}
