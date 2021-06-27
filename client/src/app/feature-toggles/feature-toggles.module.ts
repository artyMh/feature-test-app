import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { ButtonModule } from 'primeng/button'
import { InputTextModule } from 'primeng/inputtext'
import { CardModule } from 'primeng/card'
import { DialogModule } from 'primeng/dialog'
import { MessagesModule } from 'primeng/messages'
import { MessageModule } from 'primeng/message'
import { CalendarModule } from 'primeng/calendar'
import { CheckboxModule } from 'primeng/checkbox'
import { MultiSelectModule } from 'primeng/multiselect'

import { CustomersService } from 'src/app/core/services/customers.service'
import { FeatureToggleService } from '../core/services/feature-toggle.service'
import { FeatureTogglesRoutingModule } from './feature-toggles-routing.module'
import { FeatureTogglesComponent } from './feature-toggles.component'
import { FeatureToggleListComponent } from './feature-toggle-list/feature-toggle-list.component'
import { FeatureToggleFormComponent } from './feature-toggle-form/feature-toggle-form.component'
import { FeatureToggleCardComponent } from './feature-toggle-card/feature-toggle-card.component'


@NgModule({
    declarations: [
        FeatureTogglesComponent,
        FeatureToggleListComponent,
        FeatureToggleFormComponent,
        FeatureToggleCardComponent
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
        CalendarModule,
        CheckboxModule,
        MultiSelectModule,
        FeatureTogglesRoutingModule
    ],
    providers: [
        CustomersService,
        FeatureToggleService
    ]
})
export class FeatureTogglesModule {
}
