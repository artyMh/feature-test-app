import { NextFunction, Request, Response } from 'express'
import FeatureToggleService from '@services/feature-toggle.service'
import { FeatureToggleModel } from '@models/feature-toggle.model'
import { FeatureToggleDTO } from './feature-toggle.dto'

export default class FeatureToggleController {
    private readonly featureToggleService = new FeatureToggleService()

    getAllFeatureToggles = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const findAllFeatureToggleData: FeatureToggleDTO[] = await this.featureToggleService.findAllFeatureToggles()

            res.status(200).json({ data: findAllFeatureToggleData, message: 'found_toggles' })
        } catch (error) {
            next(error)
        }
    }

    createFeatureToggle = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const featureToggleData: FeatureToggleDTO = req.body
            const createToggleData: FeatureToggleModel = await this.featureToggleService.createFeatureToggle(featureToggleData)
            res.status(201).json({ data: createToggleData, message: 'toggle_created' })
        } catch (error) {
            next(error)
        }
    }

    updateFeatureToggle = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const featureToggleData: FeatureToggleDTO = req.body
            const createToggleData: FeatureToggleModel = await this.featureToggleService.updateFeatureToggle(featureToggleData)
            res.status(201).json({ data: createToggleData, message: 'toggle_updated' })
        } catch (error) {
            next(error)
        }
    }

    deleteFeatureToggle = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const featureToggleId: string = req.params.id
            const createToggleData: FeatureToggleModel = await this.featureToggleService.deleteFeatureToggle(featureToggleId)
            res.status(201).json({ data: createToggleData, message: 'toggle_deleted' })
        } catch (error) {
            next(error)
        }
    }
}
