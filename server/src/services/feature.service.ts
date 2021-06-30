import HttpException from '@exceptions/http.exception'
import { FeatureToggleModel } from '@models/feature-toggle.model'
import { Feature, CustomerFeature } from '@models/feature.model'
import CustomerService from './customer.service'
import FeatureToggleService from './feature-toggle.service'

export default class FeatureService {
    private readonly customerService = new CustomerService()
    private readonly featureToggleService = new FeatureToggleService()

    findCustomerFeatures = async (customerId: string, featureNames: string[]): Promise<Feature> => {
        const foundCustomer = await this.customerService.findCustomerById(customerId)

        if (!foundCustomer) {
            throw new HttpException(409, `Customer with id ${customerId} doesn't exists!`)
        }

        const customerFeatureToggles = await this.featureToggleService.findCustomerFeatureToggles(customerId)
        const features: Feature = {
            customerId,
            features: []
        }
        if (customerFeatureToggles.length > 0) {
            features.features = this.prepareCustomerFeatures(customerFeatureToggles, featureNames)
        }

        return features
    }

    private prepareCustomerFeatures(customerFeatureToggles: FeatureToggleModel[], selectedFeatureToggles: string[]): CustomerFeature[] {
        const customerFeaturesMap = customerFeatureToggles.map(f => f.technicalName)
        const customerNotInFeaturesList = selectedFeatureToggles.filter(selectedFeature => !customerFeaturesMap.includes(selectedFeature))

        const customerPrepredFeatureToggles = customerFeatureToggles
            .filter(({ technicalName }) => selectedFeatureToggles.includes(technicalName))
            .map(featureToggle => {
                const isExpired = this.isFeatureExpired(featureToggle)
                const customerFeature: CustomerFeature = {
                    name: featureToggle.technicalName,
                    active: true,
                    inverted: featureToggle.inverted,
                    expired: isExpired
                }

                if (customerFeature.inverted || customerFeature.expired) {
                    customerFeature.active = false
                }

                return customerFeature
            })

        if (customerNotInFeaturesList.length > 0) {
            customerNotInFeaturesList.forEach(notInListFeatureName =>
                customerPrepredFeatureToggles.push({
                    name: notInListFeatureName,
                    active: false,
                    inverted: false,
                    expired: false
                })
            )
        }

        return customerPrepredFeatureToggles
    }

    private isFeatureExpired(featureToggle: FeatureToggleModel): boolean {
        if (!featureToggle?.expiresOn) {
            return false
        }

        const currentDate = new Date()
        const featureDate = new Date(featureToggle.expiresOn)

        if (currentDate.getTime() > featureDate.getTime()) {
            return true
        }
        return false
    }
}
