import { Body, Controller, Delete, Get, Param, Post, Put, UseInterceptors } from "@nestjs/common"
import { ValidatorInterceptor } from "src/interceptors/validator.interceptor";
import { CreateCustomerContract } from "../contracts/customer.contract";
import { Customer } from "../models/customer.model";
import { Result } from "../models/result.model";

@Controller('v1/customers')
export class CustomerController {
    @Get()
    findAllCustomers(): Result {
        return new Result(
            null,
            true,
            [],
            null
        )
    }

    @Get(':document')
    getById(@Param('document') document): Result {
        return new Result(
            null,
            true,
            [],
            null
        )
    }

    @Post()
    @UseInterceptors(new ValidatorInterceptor(new CreateCustomerContract()))
    post(@Body() body: Customer): Result {
        return new Result(
            'Cliente cadastrado com sucesso!',
            true,
            body,
            null
        );
    }

    @Put(':id')
    put(@Param('id') id, @Body() body): Result {
        return new Result(
            'Cliente atualizado com sucesso',
            true,
            [],
            null
        )
    }

    @Delete(':id')
    delete(@Param('id') id): Result {
        return new Result(
            'Cliente deletado com sucesso',
            true,
            [],
            null
        )
    }
}