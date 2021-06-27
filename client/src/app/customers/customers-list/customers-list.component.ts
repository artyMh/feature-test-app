import { Component, EventEmitter, Input, Output } from '@angular/core'
import { Customer } from 'src/app/core/models/customer.model'

@Component({
    selector: 'customers-list',
    templateUrl: 'customers-list.component.html'
})
export class CustomersListComponent {

    @Input() customers: Customer[] | null = []
    @Output() customerActionProceed = new EventEmitter()
    
    constructor() { }
}
