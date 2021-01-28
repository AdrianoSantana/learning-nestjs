import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common"
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
    post(@Body() body: Customer): Result {
        const customer = new Customer(
            body.name,
            body.document,
            body.email,
            body.password
        )
        return new Result(
            'Cliente cadastrado com sucesso!',
            true,
            customer,
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