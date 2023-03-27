/* eslint-disable prettier/prettier */
import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { ROLES_KEY } from "src/decorators/roles.decorator";
import { Role } from "src/enums/role.enum";

@Injectable()
export class RoleGuard implements CanActivate {

    constructor(private readonly reflector: Reflector) {}

    async canActivate(context: ExecutionContext) {

        // vamos verificar se a rota que aplicamos este guard aqui possue o guard role

        // vamos usar o objeto reflector do proprio nestjs, precisamos injetar no constructor

        // getAllAndOverride: tudo que for sobre escrito dentro do nosso proprio metodo
        // vamos usar a chave que esta na pasta decorator no arquivo roles.decorator.ts
        // definindo os alvos dentro do [handler e a classe]

        const requeridRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [context.getHandler(), context.getClass])

        // se não tiver nehuma regra nescessaria 
        if(!requeridRoles) {
            return true;
        }

        // do request precisamos extrair o usuario precisamos saber o usuario que esta logado te as regras que são nescessarias 
        const {user} = context.switchToHttp().getRequest();

        // vamos verificar as regras do usuario
        const rolesFilted = requeridRoles.filter(role => role === user.role);

        // usuario tem acesso
        return rolesFilted.length > 0;
    }
}
// va para pasta user dentro do arquivo user.controller.ts e aplique RoleGuard no começo do controler, falando que todas as rotas vão ter o RoleGuard 