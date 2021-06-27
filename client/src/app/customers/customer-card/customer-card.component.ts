import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core'
import { ConfirmationService, MessageService } from 'primeng/api'
import { Customer } from 'src/app/core/models/customer.model'
import { CustomersService } from 'src/app/core/services/customers.service'

@Component({
    selector: 'customer-card',
    templateUrl: 'customer-card.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomerCardComponent {

    @Input() customer: Customer
    @Output() customerActionProceed = new EventEmitter()

    displayEditDialog = false

    constructor(
        private customersService: CustomersService,
        private confirmationService: ConfirmationService,
        private messageService: MessageService
    ) { }

    onEditCustomer(newCustomer: Customer) {
        this.hideEditDialog()
        this.customersService.updateCustomer(newCustomer).subscribe(
            () => {
                this.messageService.add({ severity: 'info', life: 4000, summary: 'Success', detail: 'Customer updated' })
                this.customerActionProceed.emit()
            },
            res => this.messageService.add({ severity: 'error', life: 4000, summary: 'Error', detail: `Customer update failed: ${res.error.message}` }),
        )
    }

    onDeleteCustomer() {
        this.confirmationService.confirm({
            message: `Are you sure you want to delete '${this.customer.firstName} ${this.customer.lastName}' customer?`,
            accept: () => {
                this.customersService.deleteCustomer(this.customer._id).subscribe(
                    () => {
                        this.messageService.add({ severity: 'info', life: 4000, summary: 'Success', detail: 'Customer deleted' })
                        this.customerActionProceed.emit()
                    },
                    res => this.messageService.add({ severity: 'error', life: 4000, summary: 'Error', detail: `Customer delete failed: ${res.error.message}` })
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
}
