export interface FeatureToggle {
    _id: string
    __v: string
    displayName?: string
    technicalName: string
    expiresOn?: Date
    description?: string
    inverted: boolean
    customerIds: string[]
}
