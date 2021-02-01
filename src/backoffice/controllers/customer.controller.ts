import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, UseInterceptors } from "@nestjs/common"
import { model } from "mongoose";
import { ValidatorInterceptor } from "src/interceptors/validator.interceptor";
import { CreateCustomerAddressContract } from "../contracts/Customer/createCustomerAddress.contract";
import { CreateCustomerContract } from "../contracts/Customer/customer.contract";
import { CreateCustomerDto } from "../dtos/create-customer-dto";
import { Address } from "../models/address.model";
import { Customer } from "../models/customer.model";
import { Pet } from "../models/pet.model";
import { Result } from "../models/result.model";
import { User } from "../models/user.model";
import { AccountService } from "../services/account.services";
import { CustomerService } from "../services/customer.service";

@Controller('v1/customers')

export class CustomerController {
    
    constructor(
        private readonly accountService: AccountService,
        private readonly customerService: CustomerService
        ) {}

    @Get()
    async findAllCustomers() {
        const customers = await this.customerService.findAll()
        return new Result(
            null,
            true,
            customers,
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
    async post(@Body() body: CreateCustomerDto) {
        let user
        let customer
        try {

            user = await this.accountService.create(
                new User(body.document, body.password)
            )
            customer = new Customer(body.name, body.document, body.email, [], null, null, null, user)
            const result = await this.customerService.create(customer)
            return new Result('Cliente criado com sucesso', true, result, null)

        } catch (err) {
            throw new HttpException(new Result('Erro ao processar requisição', false, null, err), HttpStatus.BAD_REQUEST)
        }
        
    }

    @Post(':document/address/billing')
    @UseInterceptors(new ValidatorInterceptor(new CreateCustomerAddressContract()))
    async addBillingAddress (@Body() body: Address, @Param('document') document) {
        try {
            const result = await this.customerService.addBillingAddress(body, document)
            return new Result('Adicionado endereço de cobrança', true, body, null)
        } catch (err) {
            throw new HttpException(new Result('Erro ao processar requisição', false, null, err), HttpStatus.BAD_REQUEST)
        }
    }

    @Post(':document/address/shipping')
    @UseInterceptors(new ValidatorInterceptor(new CreateCustomerAddressContract()))
    async addShippingAddress (@Body() body: Address, @Param('document') document) {
        try {
            const result = await this.customerService.addShippingAddress(body, document)
            return new Result('Adicionado endereço de entrega', true, body, null)
        } catch (err) {
            throw new HttpException(new Result('Erro ao processar requisição', false, null, err), HttpStatus.BAD_REQUEST)
        }
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