/* eslint-disable prettier/prettier */
import { IsString, IsNotEmpty, IsEmail, IsStrongPassword, IsOptional, IsDateString, IsEnum } from 'class-validator';
import { Role } from '../../enums/role.enum';

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

  @IsOptional()
  // vamos passar o enum que espera um objeto esse objeto vai ser o Role, esse enum que queremos validar
  @IsEnum(Role)
   // o role so pode ser 1 ou 2
  role: number;
  // adicione a role no dto de atualização, e la na pasta user.service.ts em editar passe o role
}
