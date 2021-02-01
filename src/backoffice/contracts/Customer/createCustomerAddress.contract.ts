'use strict'

import { Injectable } from "@nestjs/common";
import { Address } from "src/backoffice/models/address.model";
import { Validator } from "src/utils/validator";
import { Contract } from "../contract";

@Injectable()
export class CreateCustomerAddressContract implements Contract{
    errors: any[];

    validate(model: Address): boolean {
        const validator = new Validator();

        validator.hasMinLen(model.street, 3, 'Rua inválida')
        validator.hasMinLen(model.city, 3, 'Cidade inválida')
        validator.hasMinLen(model.neighborhood, 3, 'Bairro inválido')
        validator.isFixedLen(model.zipCode, 8, 'CEP inválido')
        validator.isFixedLen(model.state, 2, 'Estado inválido')
        validator.isFixedLen(model.country, 3, 'País inválido')
        

        this.errors = validator.errors

        return validator.isValid()
    }
}
