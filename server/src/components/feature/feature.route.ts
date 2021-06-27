import { Router } from 'express'
import FeatureController from './feature.controller'

export default class FeatureRoute {
    private readonly path = '/feature'
    private readonly featureController = new FeatureController()
    public readonly router = Router()

    constructor() {
        this.initializeRoutes()
    }

    private initializeRoutes() {
        this.router.post(`${this.path}`, this.featureController.getCustomerFeatures)
    }
}
