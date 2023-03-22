/* eslint-disable prettier/prettier */

import { IsDateString, IsEmail, IsNotEmpty, IsOptional, IsString, IsStrongPassword } from "class-validator";

export class UpdatePutUserDTO {
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    name: string;
  
    @IsNotEmpty()
    @IsEmail()
    @IsOptional()
    email: string;
  
    @IsNotEmpty()
    @IsStrongPassword({
      minLength: 6,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    })
    @IsOptional()
    password: string;

    @IsOptional()
    @IsDateString()
    birthAt: string;

}
