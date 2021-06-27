import { Router } from 'express'
import FeatureToggleController from './feature-toggle.controller'

export default class FeatureToggleRoute {
    private readonly path = '/feature-toggle'
    private readonly featureToggleController = new FeatureToggleController()
    public readonly router = Router()

    constructor() {
        this.initializeRoutes()
    }

    private initializeRoutes() {
        this.router.get(`${this.path}`, this.featureToggleController.getAllFeatureToggles)
        this.router.post(`${this.path}`, this.featureToggleController.createFeatureToggle)
        this.router.put(`${this.path}`, this.featureToggleController.updateFeatureToggle)
        this.router.delete(`${this.path}/:id`, this.featureToggleController.deleteFeatureToggle)
    }
}
