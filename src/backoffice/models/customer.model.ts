'use strict'

import { Address } from './address.model';
import { CreditCard } from './creditCard.model';
import { Pet } from './pet.model';
import { User } from './user.model';

export class Customer {
    public active: boolean

    constructor(
        public name: string,
        public document: string,
        public email: string,
        public pets: Pet[],
        public billingAddress: Address,
        public shippingAddress: Address,
        public creditCard: CreditCard,
        public user: User
    ) {
       name = name;
       document = document;
       email = email;
       pets = pets;
       billingAddress = billingAddress;
       shippingAddress = shippingAddress;
       creditCard = creditCard;
    }
}
