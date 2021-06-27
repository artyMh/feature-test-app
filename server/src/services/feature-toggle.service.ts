import HttpException from '@exceptions/http.exception'
import featureToggle, { FeatureToggleModel } from '@models/feature-toggle.model'
import CustomerService from './customer.service'

export default class FeatureToggleService {
    private readonly featureToggles = featureToggle
    private readonly customerService = new CustomerService()

    findAllFeatureToggles = async (): Promise<FeatureToggleModel[]> => {
        const featureToggles: FeatureToggleModel[] = await this.featureToggles.find()
        return featureToggles
    }

    findCustomerFeatureToggles = async (customerId: string): Promise<FeatureToggleModel[]> => {
        const foundCustomer = await this.customerService.findCustomerById(customerId)

        if (!foundCustomer) {
            throw new HttpException(409, `Customer with id ${customerId} doesn't exists!`)
        }

        const customerFeatureToggles = await this.featureToggles.find({ customerIds: { $all: [customerId] } })
        return customerFeatureToggles
    }

    createFeatureToggle = async (featureToggle: FeatureToggleModel): Promise<FeatureToggleModel> => {
        const findFeatureToggle: FeatureToggleModel = await this.featureToggles.findOne({ technicalName: featureToggle.technicalName })

        if (findFeatureToggle) {
            throw new HttpException(409, `Feature with name '${featureToggle.technicalName}' already exists!`)
        }

        const createdFeatureToggle: FeatureToggleModel = await this.featureToggles.create(featureToggle)
        return createdFeatureToggle
    }

    updateFeatureToggle = async (featureToggle: FeatureToggleModel): Promise<FeatureToggleModel> => {
        const findFeatureToggle: FeatureToggleModel = await this.featureToggles.findById(featureToggle._id)

        if (!findFeatureToggle) {
            throw new HttpException(409, `Feature with id '${featureToggle._id}' doesn't exists!`)
        }

        const updatedFeatureToggle: FeatureToggleModel = await this.featureToggles.findByIdAndUpdate(findFeatureToggle._id, featureToggle)
        return updatedFeatureToggle
    }

    deleteFeatureToggle = async (featureToggleId: string): Promise<FeatureToggleModel> => {
        const findFeatureToggle: FeatureToggleModel = await this.featureToggles.findOne({ _id: featureToggleId })

        if (!findFeatureToggle) {
            throw new HttpException(409, `Feature with id '${featureToggleId}' doesn't exists!`)
        }

        const deletedFeatureToggle: FeatureToggleModel = await this.featureToggles.findByIdAndDelete(featureToggleId)
        return deletedFeatureToggle
    }
}
