/* eslint-disable prettier/prettier */
import { SetMetadata } from "@nestjs/common/decorators";
import { Role } from "../enums/role.enum";

// O Decorator Roles receber o tipo do enum ou varios, ...distribui eles dentro do argumento

export const ROLES_KEY = "roles";
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);

// agora precisamos validar as rotas para saber se o usuario que esta usando as rotas realmente tem a role, a função administrativa 
// va para a pasta do prisma no arquivo schema.prisma e adicione um novo campo: role

// agora utilize o decorator @Roles(Role.Admin) nas rotas, va para pasta user dentro do arquivo user.controller.ts e aplique o decorator criado nas rotas

// vamos validar esse decorator Roles para validar um decorator precisamos de um guard pro role, va para a pasta guards e crie um arquivo role.guard.ts