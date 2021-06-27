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
