/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { BadRequestException, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

// vamos fazer verificação de todas as rotas que tem o id antes de ir para o banco, id que temos certeza que não vai existir no banco
export class UserIdCheckMiddleware implements NestMiddleware {

    use(req: Request, res: Response, next: NextFunction) {

        //     se nao for numero       ou   se o numero for menor ou igual a 0   
        if(isNaN(Number(req.params.id)) || Number(req.params.id) <= 0) {
            throw new BadRequestException('Id invalido');
        }

        // chamando a função next
        next();
    }
    // va para o arquivo user.module.ts e configure o middleware
    
}