import { Component, OnInit } from '@angular/core'
import { MessageService } from 'primeng/api'
import { CustomersService } from 'src/app/core/services/customers.service'
import { Customer } from 'src/app/core/models/customer.model'

@Component({
    selector: 'customers',
    templateUrl: 'customers.component.html'
})
export class CustomersComponent implements OnInit {

    customers: Customer[] = []

    displayAddDialog = false

    constructor(
        private messageService: MessageService,
        private customersService: CustomersService
    ) { }

    ngOnInit() {
        this.refreshCustomers()
    }

    showAddDialog() {
        this.displayAddDialog = true
    }

    hideAddDialog() {
        this.displayAddDialog = false
    }

    onSubmitCustomer(newCustomer: Customer) {
        this.hideAddDialog()
        this.customersService.createCustomer(newCustomer).subscribe(
            () => {
                this.refreshCustomers()
                this.messageService.add({ severity: 'success', life: 4000, summary: 'Success', detail: 'Customer created' })
            },
            res => this.messageService.add({ severity: 'error', life: 4000, summary: 'Error', detail: `Customer creation failed: ${res.error.message}` }),
        )
    }

    refreshCustomers() {
        this.customersService.getCustomers().subscribe((res) => this.customers = res.data)
    }
}
