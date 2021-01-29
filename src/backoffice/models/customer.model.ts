'use strict'

import { Address } from './address.model';
import { CreditCard } from './creditCard.model';
import { Pet } from './pet.model';

export class Customer {
    public active: boolean

    constructor(
        public name: string,
        public document: string,
        public email: string,
        public password: string,
        public pets: Pet[],
        public billingAddress: Address,
        public shippingAddress: Address,
        public creditCard: CreditCard
    ) {
       name = name;
       document = document;
       email = email;
       password = password;
       this.active = true;
       pets = pets;
       billingAddress = billingAddress;
       shippingAddress = shippingAddress;
       creditCard = creditCard;
    }
}
