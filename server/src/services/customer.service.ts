import HttpException from '@exceptions/http.exception'
import customer, { CustomerModel } from '@models/customer.model'

export default class CustomerService {
    private readonly customers = customer

    findCustomerById = async (customerId: string): Promise<CustomerModel> => {
        const findCustomer: CustomerModel = await this.customers.findOne({ _id: customerId })
        if (!findCustomer) {
            throw new HttpException(409, `Customer with id ${customerId} doesn't exists!`)
        }

        return findCustomer
    }

    findAllCustomers = async (): Promise<CustomerModel[]> => {
        const customers: CustomerModel[] = await this.customers.find()
        return customers
    }

    createCustomer = async (customer: CustomerModel): Promise<CustomerModel> => {
        const findCustomer: CustomerModel = await this.customers.findOne({ firstName: customer.firstName, lastName: customer.lastName })

        if (findCustomer) {
            throw new HttpException(409, `Customer with name '${customer.firstName} ${customer.lastName}' already exists!`)
        }

        const createdCustomer: CustomerModel = await this.customers.create(customer)
        return createdCustomer
    }

    updateCustomer = async (customer: CustomerModel): Promise<CustomerModel> => {
        const findCustomer: CustomerModel = await this.customers.findById(customer._id)

        if (!findCustomer) {
            throw new HttpException(409, `Customer with id '${findCustomer._id}' doesn't exists!`)
        }

        const updatedCustomer: CustomerModel = await this.customers.findByIdAndUpdate(findCustomer._id, customer)
        return updatedCustomer
    }

    deleteCustomer = async (customerId: string): Promise<CustomerModel> => {
        const findcustomer: CustomerModel = await this.customers.findById({ _id: customerId })

        if (!findcustomer) {
            throw new HttpException(409, `Customer with id '${customerId}' doesn't exists!`)
        }

        const deletedFeatureToggle: CustomerModel = await this.customers.findByIdAndDelete(customerId)
        return deletedFeatureToggle
    }
}
