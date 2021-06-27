import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core'
import { ConfirmationService, MessageService } from 'primeng/api'

import { Customer } from 'src/app/core/models/customer.model'
import { FeatureToggle } from 'src/app/core/models/feature-toggle.model'
import { FeatureToggleService } from 'src/app/core/services/feature-toggle.service'


@Component({
    selector: 'feature-toggle-card',
    templateUrl: 'feature-toggle-card.component.html'
})
export class FeatureToggleCardComponent implements OnChanges {

    @Input() customers: Customer[]
    @Input() featureToggle: FeatureToggle
    @Output() featureToggleActionProceed = new EventEmitter()

    displayEditDialog = false
    featureCustomersList = ''

    constructor(
        private featureToggleService: FeatureToggleService,
        private confirmationService: ConfirmationService,
        private messageService: MessageService
    ) { }

    ngOnChanges() {
        this.createCustomerList()
    }

    onEditFeatureToggle(newFeatureToggle: FeatureToggle) {
        this.hideEditDialog()
        this.featureToggleService.updateFeatureToggle(newFeatureToggle).subscribe(
            () => {
                this.messageService.add({ severity: 'info', life: 4000, summary: 'Success', detail: 'Feature toggle updated' })
                this.featureToggleActionProceed.emit()
            },
            res => this.messageService.add({ severity: 'error', life: 4000, summary: 'Error', detail: `Feature toggle update failed: ${res.error.message}` }),
        )
    }

    onDeleteFeatureToggle() {
        this.confirmationService.confirm({
            message: `Are you sure you want to delete '${this.featureToggle.technicalName}' feature toggle?`,
            accept: () => {
                this.featureToggleService.deleteFeatureToggle(this.featureToggle._id).subscribe(
                    () => {
                        this.messageService.add({ severity: 'info', life: 4000, summary: 'Success', detail: 'Feature toggle deleted' })
                        this.featureToggleActionProceed.emit()
                    },
                    res => this.messageService.add({ severity: 'error', life: 4000, summary: 'Error', detail: `Feature toggle delete failed: ${res.error.message}` })
                )
            }
        })
    }

    showEditDialog() {
        this.displayEditDialog = true
    }

    hideEditDialog() {
        this.displayEditDialog = false
    }

    private createCustomerList() {
        const list: string[] = []
        this.featureToggle.customerIds.forEach(id => {
            const foundCustomer = this.customers.find(customer => customer._id === id)
            if (foundCustomer) {
                list.push(`${foundCustomer.firstName} ${foundCustomer.lastName} `)
            }
        })
        this.featureCustomersList = list.join(', ')
    }
}
