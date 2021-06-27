import { NextFunction, Request, Response } from 'express'
import FeatureService from '@services/feature.service'
import { FeatureDTO } from './feature.dto'
import { Feature } from '@models/feature.model'

export default class FeatureController {
    private readonly featureToggleService = new FeatureService()

    getCustomerFeatures = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const featureRequest: FeatureDTO = req.body
            const featureNames = featureRequest.features.map(feature => feature.name)
            const findCustomerFeatures: Feature = await this.featureToggleService.findCustomerFeatures(featureRequest.customerId, featureNames)

            res.status(200).json({ data: findCustomerFeatures, messsage: 'found_features' })
        } catch (error) {
            next(error)
        }
    }
}
