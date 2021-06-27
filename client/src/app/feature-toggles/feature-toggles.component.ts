import { Component, OnInit } from '@angular/core'
import { MessageService } from 'primeng/api'
import { CustomersService } from 'src/app/core/services/customers.service'
import { FeatureToggleService } from 'src/app/core/services/feature-toggle.service'
import { Customer } from 'src/app/core/models/customer.model'
import { FeatureToggle } from 'src/app/core/models/feature-toggle.model'

@Component({
    selector: 'feature-toggles',
    templateUrl: 'feature-toggles.component.html'
})
export class FeatureTogglesComponent implements OnInit {

    customers: Customer[] = []
    featureToggles: FeatureToggle[] = []
    displayAddDialog = false
    customersLoaded = false

    constructor(
        private messageService: MessageService,
        private customersService: CustomersService,
        private featureToggleService: FeatureToggleService
    ) { }

    ngOnInit() {
        this.refreshFeatureToggles()
        this.refreshCustomers()
    }

    showAddDialog() {
        this.displayAddDialog = true
    }

    hideAddDialog() {
        this.displayAddDialog = false
    }

    onSubmitFeatureToggle(newFeatureToggle: FeatureToggle) {
        this.hideAddDialog()
        this.featureToggleService.createFeatureToggle(newFeatureToggle).subscribe(
            () => {
                this.refreshFeatureToggles()
                this.messageService.add({ severity: 'success', life: 4000, summary: 'Success', detail: 'Feature toggle created' })
            },
            res => this.messageService.add({ severity: 'error', life: 4000, summary: 'Error', detail: `Feature toggle creation failed: ${res.error.message}` }),
        )
    }

    refreshFeatureToggles() {
        this.featureToggleService.getFeatureToggles().subscribe((res) => this.featureToggles = res.data)
    }

    refreshCustomers() {
        this.customersService.getCustomers().subscribe((res) => {
            this.customers = res.data
            this.customersLoaded = true
        })
    }
}