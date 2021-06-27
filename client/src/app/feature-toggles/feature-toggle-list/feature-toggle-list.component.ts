import { Component, EventEmitter, Input, Output } from '@angular/core'
import { Customer } from 'src/app/core/models/customer.model'
import { FeatureToggle } from 'src/app/core/models/feature-toggle.model'

@Component({
    selector: 'feature-toggle-list',
    templateUrl: 'feature-toggle-list.component.html'
})
export class FeatureToggleListComponent {

    @Input() customers: Customer[]
    @Input() featureToggles: FeatureToggle[] | null = []
    @Output() featureToggleActionProceed = new EventEmitter()
    
    constructor() { }
}
