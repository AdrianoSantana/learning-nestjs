'use strict'

import { Injectable } from "@nestjs/common";
import { Address } from "src/backoffice/models/address.model";
import { Pet } from "src/backoffice/models/pet.model";
import { Validator } from "src/utils/validator";
import { Contract } from "../contract";

@Injectable()
export class CreatePetContract implements Contract{
    errors: any[];

    validate(model: Pet): boolean {
        const validator = new Validator();

        validator.hasMinLen(model.name, 2, 'Nome inválido')
        validator.hasMinLen(model.gender, 2, 'Genero inválido')
    

        this.errors = validator.errors

        return validator.isValid()
    }
}
