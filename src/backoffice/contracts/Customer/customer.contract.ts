'use strict'

import { Injectable } from "@nestjs/common";
import { Validator } from "src/utils/validator";
import { CreateCustomerDto } from "../../dtos/create-customer-dto";
import { Contract } from "../contract";

@Injectable()
export class CreateCustomerContract implements Contract{
    errors: any[];

    validate(model: CreateCustomerDto): boolean {
        const validator = new Validator();

        validator.hasMinLen(model.name, 5, 'Nome inválido')
        validator.isEmail(model.email, 'Email inválido')
        validator.isFixedLen(model.document, 11, 'CPF inválido')
        validator.hasMinLen(model.password, 6, 'Senha deve conter pelo menos 6 caracteres')

        this.errors = validator.errors

        return validator.isValid()
    }
}
