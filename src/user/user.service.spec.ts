/* eslint-disable prettier/prettier */
// aqui vamos fazer os testes unitarios da nossa aplicação do service

import { Test, TestingModule } from "@nestjs/testing";
import { PrismaService } from "../databasePrisma/prisma.service";
import { UserService } from "./user.service";

// vamos fazer os testes unitarios do UserService
describe('UserService', () => {
    let userService: UserService;

    // antes de cada teste
    beforeEach(async () => {
        // vamos criar um module fake para ter o serviço funcionando
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UserService,
                PrismaService
            ],           
        }).compile();

        userService = module.get<UserService>(UserService);
    });

    test('Validar a definição', () => {
        expect(userService).toBeDefined();
    })



})