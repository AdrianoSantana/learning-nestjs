import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Address } from "../models/address.model";
import { Customer } from "../models/customer.model";
import { Pet } from "../models/pet.model";
import { CustomerDocument } from "../schemas/customer.schema";

@Injectable()
export class CustomerService {
    constructor(@InjectModel('Customer') private readonly model: Model<CustomerDocument>) {}

    // Cria novo cliente
    async create(data: Customer) : Promise<Customer> {
        const customer = new this.model(data)
        return await customer.save()
    }

    // Adiciona endereço de cobrança
    async addBillingAddress(data: Address, document: string): Promise<Customer> {
        const options = { upsert: true }
        return await this.model.findOneAndUpdate({ document }, {
            $set: {
                billingAddress: data
            }
        }, options)
    }

    // Adiciona endereço de entrega
    async addShippingAddress(data: Address, document: string): Promise<Customer> {
        const options = { upsert: true }
        return await this.model.findOneAndUpdate({ document }, {
            $set: {
                shippingAddress: data
            }
        }, options)
    }

    // Cria um pet
    async createPet(data: Pet, document: string): Promise<Customer> {
        const options = { upsert: true, new: true }
        return await this.model.findOneAndUpdate({ document }, {
            $push: {
                pets: data
            }
        }, options)
    }

    // UpdatePet
    async updatePet(data: Pet, document: string, id: string): Promise<Customer> {
        return await this.model.findOneAndUpdate({ document,'pets._id': id },{
            $set: {
                'pets.$': data
            }
        })
    }

    // Get all customer
    async findAll(): Promise<Customer[]> {
        return await this.model
            .find({}, 'name email document')
            .sort('document')
            .exec()
    }

    // Get Customers with users
}