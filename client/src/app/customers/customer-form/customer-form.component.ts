import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms'
import { Customer } from 'src/app/core/models/customer.model'

@Component({
    selector: 'customer-form',
    templateUrl: 'customer-form.component.html'
})
export class CustomerFormComponent implements OnInit {

    @Input() customer: Customer
    @Output() submitCustomer = new EventEmitter<Customer>()

    customerForm: FormGroup

    constructor(
        private formBuilder: FormBuilder
    ) { }

    ngOnInit() {
        this.customerForm = this.formBuilder.group({
            firstName: new FormControl(this.customer?.firstName ?? '', Validators.required),
            lastName: new FormControl(this.customer?.lastName ?? '', Validators.required)
        })
    }

    onSubmit() {
        const newCustomerValue: Customer = this.customerForm.value

        if (this.customer?._id) {
            newCustomerValue._id = this.customer._id
        }

        this.submitCustomer.emit(newCustomerValue)
    }
}
