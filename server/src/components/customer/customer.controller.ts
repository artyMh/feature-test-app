import { NextFunction, Request, Response } from 'express'
import CustomerService from '@services/customer.service'
import { CustomerModel } from '@models/customer.model'
import { CustomerDTO } from './customer.dto'

export default class CustomerController {
    private readonly customerService = new CustomerService()

    getAllCustomers = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const findAllCustomersData: CustomerModel[] = await this.customerService.findAllCustomers()

            res.status(200).json({ data: findAllCustomersData, messsage: 'found_customers' })
        } catch (error) {
            next(error)
        }
    }

    createCustomer = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const customerData: CustomerDTO = req.body
            const createToggleData: CustomerModel = await this.customerService.createCustomer(customerData)
            res.status(201).json({ data: createToggleData, messsage: 'customer_created' })
        } catch (error) {
            next(error)
        }
    }

    updateCustomer = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const customerData: CustomerDTO = req.body
            const createToggleData: CustomerModel = await this.customerService.updateCustomer(customerData)
            res.status(201).json({ data: createToggleData, messsage: 'customer_updated' })
        } catch (error) {
            next(error)
        }
    }

    deleteCustomer = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const customerId: string = req.params.id
            const createToggleData: CustomerModel = await this.customerService.deleteCustomer(customerId)
            res.status(201).json({ data: createToggleData, messsage: 'customer_deleted' })
        } catch (error) {
            next(error)
        }
    }
}
