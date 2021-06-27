import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { ButtonModule } from 'primeng/button'
import { InputTextModule } from 'primeng/inputtext'
import { CardModule } from 'primeng/card'
import { DialogModule } from 'primeng/dialog'
import { MessagesModule } from 'primeng/messages'
import { MessageModule } from 'primeng/message'

import { CustomersService } from 'src/app/core/services/customers.service'
import { CustomersRoutingModule } from './customers-routing.module'
import { CustomersComponent } from './customers.component'
import { CustomerCardComponent } from './customer-card/customer-card.component'
import { CustomersListComponent } from './customers-list/customers-list.component'
import { CustomerFormComponent } from './customer-form/customer-form.component'

@NgModule({
    declarations: [
        CustomersComponent,
        CustomerCardComponent,
        CustomersListComponent,
        CustomerFormComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ButtonModule,
        InputTextModule,
        CardModule,
        DialogModule,
        MessagesModule,
        MessageModule,
        CustomersRoutingModule
    ],
    providers: [
        CustomersService
    ]
})
export class CustomersModule {
}
