import { Component, OnInit } from '@angular/core'
import { MessageService } from 'primeng/api'

import { CustomersService } from 'src/app/core/services/customers.service'
import { Customer } from 'src/app/core/models/customer.model'
import { FeatureToggle } from 'src/app/core/models/feature-toggle.model'
import { FeatureToggleService } from 'src/app/core/services/feature-toggle.service'
import { CustomerFeature, SelectedFeature } from 'src/app/core/models/active-feature.model'
import { FeaturesService } from 'src/app/core/services/features.service'


type DropdownItem = {
    name: string
    code: string
}

@Component({
    selector: 'active-features',
    templateUrl: 'active-features.component.html'
})
export class ActiveFeatureComponent implements OnInit {
    
    customers: Customer[]
    featureToggles: FeatureToggle[]

    availableCustomers: DropdownItem[] = []
    availableFeatureToggles: DropdownItem[] = []

    selectedCustomerId: string
    selectedFeatures: string[] = []
    customerFeatureResult: CustomerFeature


    constructor(
        private messageService: MessageService,
        private customersService: CustomersService,
        private featureToggleService: FeatureToggleService,
        private featureService: FeaturesService
    ) {}

    ngOnInit() {
        this.customersService.getCustomers().subscribe(res => {
            this.customers = res.data
            this.availableCustomers = this.generateAvailableCustomers(this.customers)
            if (this.availableCustomers.length > 0) {
                this.selectedCustomerId = this.availableCustomers[0].code
            }
        })
        this.featureToggleService.getFeatureToggles().subscribe(res => {
            this.featureToggles = res.data
            this.availableFeatureToggles = this.generateAvailableFeatureToggles(this.featureToggles)
        })
    }

    getFeaturesForCustomer() {
        this.featureService.getCustomerFeatures({
            customerId: this.selectedCustomerId,
            features: this.selectedFeatures.map(feature => ({ name: feature }))
        }).subscribe(
            res => {
                this.customerFeatureResult = res.data
                this.messageService.add({ severity: 'success', life: 4000, summary: 'Success', detail: 'Got features for customer' })
            },
            res => this.messageService.add({ severity: 'error', life: 4000, summary: 'Error', detail: `Error while getting feature: ${res.error.message}` }),
        )
    }

    private generateAvailableCustomers(customers: Customer[]) {
        return customers.map(customer => ({
            name: `${customer.firstName} ${customer.lastName}`,
            code: customer._id
        }))
    }

    private generateAvailableFeatureToggles(featureToggles: FeatureToggle[]) {
        return featureToggles.map(featureToggle => ({
            name: featureToggle.technicalName,
            code: featureToggle.technicalName
        }))
    }
}

