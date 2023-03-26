/* eslint-disable prettier/prettier */
import { createParamDecorator, ExecutionContext, NotFoundException } from "@nestjs/common";

export const User = createParamDecorator((filter: string, context: ExecutionContext) => {
    // pegando o request do contexto
    const request = context.switchToHttp().getRequest();

    if(request.user) {

        if(filter) {
            // vamos retornar qualquer dado filtrado do usuario 
            return request.user[filter]
        } else {
            // se não retornar o usuario inteiro
            return request.user
        }

        return request.user; // retorna os dados do decorato

    } else {
        throw new NotFoundException('Usuário não encontrado no Request. Use o AuthGuard para obter o usuário')
    }
})