import { Document, Schema, model } from 'mongoose'

export interface FeatureToggle {
    displayName?: string
    technicalName: string
    expiresOn?: Date
    description?: string
    inverted: boolean
    customerIds: string[]
}

export interface FeatureToggleModel extends FeatureToggle, Document {}

const schema = new Schema<FeatureToggleModel>({
    displayName: String,
    technicalName: { type: String, required: true },
    expiresOn: Date,
    description: String,
    inverted: { type: Boolean, required: true },
    customerIds: [
        {
            type: String,
            required: true
        }
    ]
})

const featureToggle = model<FeatureToggleModel>('FeatureToggle', schema)

export default featureToggle
