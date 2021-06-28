import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms'

import { Customer } from 'src/app/core/models/customer.model'
import { FeatureToggle } from 'src/app/core/models/feature-toggle.model'

type CustomerIdsListItem = {
    customerName: string
    code: string
}

@Component({
    selector: 'feature-toggle-form',
    templateUrl: 'feature-toggle-form.component.html'
})
export class FeatureToggleFormComponent implements OnInit {

    @Input() customers: Customer[]
    @Input() featureToggle: FeatureToggle
    @Output() submitFeatureToggle = new EventEmitter<FeatureToggle>()

    featureToggleForm: FormGroup
    availableCustomersIds: CustomerIdsListItem[] = []
    selectedCustomerIds = []

    constructor(
        private formBuilder: FormBuilder
    ) { }

    ngOnInit() {
        this.generateCustomersIds()
        this.featureToggleForm = this.formBuilder.group({
            displayName: new FormControl(this.featureToggle?.displayName ?? ''),
            technicalName: new FormControl(this.featureToggle?.technicalName ?? '', Validators.required),
            expiresOn: new FormControl(this.featureToggle?.expiresOn ? new Date(this.featureToggle.expiresOn) : ''),
            description: new FormControl(this.featureToggle?.description ?? ''),
            inverted: new FormControl(this.featureToggle?.inverted ?? false),
            customerIds: new FormControl(this.featureToggle?.customerIds ?? '', Validators.required)
        })
    }

    onSubmit() {
        const newFeatureToggleValue: FeatureToggle = this.featureToggleForm.value


        if (this.featureToggle?._id) {
            newFeatureToggleValue._id = this.featureToggle._id
        }

        this.submitFeatureToggle.emit(newFeatureToggleValue)
    }

    private generateCustomersIds() {
        this.availableCustomersIds = this.customers.map(customer => {
            return {
                customerName: `${customer.firstName} ${customer.lastName}`,
                code: customer._id
            }
        })
    }
}
