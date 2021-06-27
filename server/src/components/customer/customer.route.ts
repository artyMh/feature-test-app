import { Router } from 'express'
import CustomerController from './customer.controller'

export default class CustomerRoute {
    private readonly path = '/customer'
    private readonly customerController = new CustomerController()
    public readonly router = Router()

    constructor() {
        this.initializeRoutes()
    }

    private initializeRoutes() {
        this.router.get(`${this.path}`, this.customerController.getAllCustomers)
        this.router.post(`${this.path}`, this.customerController.createCustomer)
        this.router.put(`${this.path}`, this.customerController.updateCustomer)
        this.router.delete(`${this.path}/:id`, this.customerController.deleteCustomer)
    }
}
