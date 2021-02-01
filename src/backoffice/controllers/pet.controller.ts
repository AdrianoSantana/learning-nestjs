import { Body, Controller, HttpException, HttpStatus, Param, Post, Put, UseInterceptors } from "@nestjs/common";
import { ValidatorInterceptor } from "src/interceptors/validator.interceptor";
import { CreatePetContract } from "../contracts/Customer/createPet.contract";
import { Pet } from "../models/pet.model";
import { Result } from "../models/result.model";
import { CustomerService } from "../services/customer.service";

@Controller('v1/customers')
export class PetController {
    constructor(private readonly customerService: CustomerService) {}

    @Post(':document/pets')
    @UseInterceptors(new ValidatorInterceptor(new CreatePetContract()))
    async createPet(@Param('document') document: string, @Body() data: Pet) {
        try {
            await this.customerService.createPet(data, document)
            return new Result('Pet adicionado com sucesso!', true, data, null)
        } catch (error) {
            new HttpException(new Result('Erro ao processar requisição!', false, null, error), HttpStatus.BAD_REQUEST)
        }
    }

    @Put(':document/pets/:id')
    @UseInterceptors(new ValidatorInterceptor(new CreatePetContract()))
    async updatePet(@Param('document') document: string, @Body() data: Pet, @Param('id') id: string) {
        try {
            await this.customerService.updatePet(data, document, id)
            return data
        } catch (error) {
            new HttpException(new Result('Erro ao processar requisição!', false, null, error), HttpStatus.BAD_REQUEST)
        }
    }
}