export type FeatureName = {
    name: string
}

export interface FeatureDTO {
    customerId: string
    features: FeatureName[]
}
