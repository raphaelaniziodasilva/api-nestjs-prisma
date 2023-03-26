/* eslint-disable prettier/prettier */
import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { AuthService } from "src/auth/auth.service";

@Injectable()
export class AuthGuard implements CanActivate {

    // vamos precisar do serviço authService para verificar o token
    constructor(private readonly authService: AuthService) {}

    canActivate(context: ExecutionContext) {

        const request = context.switchToHttp().getRequest();

        // precisamos ir la no headers extrair o authorization
        const {authorization} = request.headers;
        console.log(authorization)
        try {
            // dados do payload
            const data = this.authService.verifyToken((authorization ?? '').split(' ')[1]);

            // passando os dados do payload para o cara que esta solicitando
            request.tokenPayLoad = data;

            // precisamos retornar um boolean, se eu posso ou não continuar a execução
            return true;
        } catch (error) {
            return false;
        }
        
    }

    
    


}