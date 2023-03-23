/* eslint-disable prettier/prettier */
import { NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const dt = Date.now();

    return next.handle().pipe(
      tap(() => {
        const request = context.switchToHttp().getRequest();

        console.log(`URL: ${request.url}`);
        console.log(`METHOD: ${request.method}`);
        console.log(`Eecução levou: ${Date.now() - dt} molisegundos`);
      }),
    );
  }
}
// O LoggingInterceptor pode ser usado de forma global e local
// va para o arquivo user.controller.ts e use de forma  local o interceptor
// va para o arquivo maints e use de forma global o interceptor