import { Document, Schema, model } from 'mongoose'

export interface Customer {
    firstName: string
    lastName: string
}

export interface CustomerModel extends Customer, Document {}

const schema = new Schema<CustomerModel>({
    firstName: String,
    lastName: String
})

const customer = model<CustomerModel>('Customer', schema)

export default customer
