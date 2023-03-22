/* eslint-disable prettier/prettier */
import { IsString, IsNotEmpty, IsEmail, IsStrongPassword, IsOptional, IsDateString } from 'class-validator';

export class CreateUserDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsStrongPassword({
    minLength: 6,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })
  password: string;

  @IsOptional()
  @IsDateString()
  birthAt: string;
}
