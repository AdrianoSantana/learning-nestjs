import { CallHandler, ExecutionContext, HttpException, HttpStatus, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable } from "rxjs";
import { Contract } from "src/backoffice/contracts/contract";
import { Result } from "src/backoffice/models/result.model";

@Injectable()
export class ValidatorInterceptor implements NestInterceptor {
    constructor(public contract: Contract) {}
    
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        // Recuperar corpo da requisição
        const body = context.switchToHttp().getRequest().body

        // Validando
        const valid = this.contract.validate(body)

        // Se deu certo continua a requisição
        // se não retorna uma exception
        if (!valid) {
            throw new HttpException(
                new Result(
                    'Ocorreu um erro ao processar sua requisição',
                    false,
                    null,
                    this.contract.errors
                ),
                HttpStatus.BAD_REQUEST
            )
        }

        return next.handle()
    }

}