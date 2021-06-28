import { NgModule } from '@angular/core'
import { CardModule } from 'primeng/card'

import { HomeRoutingModule } from './home-routing.module'
import { HomeComponent } from './home.component'

@NgModule({
    declarations: [
        HomeComponent
    ],
    imports: [
        CardModule,
        HomeRoutingModule
    ]
})
export class HomeModule {
}
