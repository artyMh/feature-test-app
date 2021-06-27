export type SelectedFeature = {
    name: string
}

export interface FeatureRequest {
    customerId: string
    features: SelectedFeature[]
}

export type CustomerFeature = {
    name: string
    active: boolean
    inverted: boolean
    expired: boolean
}

export interface Feature {
    customerId: string
    features: CustomerFeature[]
}

