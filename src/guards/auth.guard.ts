/* eslint-disable prettier/prettier */
import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { AuthService } from "../auth/auth.service";
import { UserService } from "../user/user.service";

@Injectable()
export class AuthGuard implements CanActivate {

    // vamos precisar do serviço AuthService para verificar o token e também o UserService para pegar as informações do usuario
    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService) {}

    async canActivate(context: ExecutionContext) {

        const request = context.switchToHttp().getRequest();

        // precisamos ir la no headers extrair o authorization
        const {authorization} = request.headers;
        try {
            // dados do payload
            const data = this.authService.verifyToken((authorization ?? '').split(' ')[1]);

            // passando os dados do payload para o cara que esta solicitando
            request.tokenPayLoad = data;

            // passando os dados do usuario para o cara que esta solicitando
            request.user = await this.userService.show(data.id)

            // precisamos retornar um boolean, se eu posso ou não continuar a execução
            return true;
        } catch (error) {
            return false;
        }
    }
}
// va para pasta auth dentro do arquivo auth.controller.ts no metodo authorization e utilize AuthGuard

// o AuthGuard ele usa AuthService ou seja precisamos fazer a importação do AuthModule dentro de user, va para pasta user dentro do arquivo user.module.ts dentro de imports e importe o AuthModule