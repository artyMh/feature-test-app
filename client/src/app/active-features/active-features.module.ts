import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { ButtonModule } from 'primeng/button'
import { CardModule } from 'primeng/card'
import { MessagesModule } from 'primeng/messages'
import { MessageModule } from 'primeng/message'
import { DropdownModule } from 'primeng/dropdown'
import { MultiSelectModule } from 'primeng/multiselect'

import { CustomersService } from 'src/app/core/services/customers.service'
import { ActiveFeatureRoutingModule } from './active-features-routing.module'
import { FeatureToggleService } from 'src/app/core/services/feature-toggle.service'
import { ActiveFeatureComponent } from './active-features.component'
import { FeaturesService } from 'src/app/core/services/features.service'

@NgModule({
    declarations: [
        ActiveFeatureComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ButtonModule,
        CardModule,
        MessagesModule,
        MessageModule,
        DropdownModule,
        MultiSelectModule,
        ActiveFeatureRoutingModule
    ],
    providers: [
        CustomersService,
        FeatureToggleService,
        FeaturesService
    ]
})
export class ActiveFeaturesModule {
}
