import { NgModule } from '@angular/core'
// import { CommonModule } from '@angular/common'
import { ButtonModule } from 'primeng/button'
// import { InputTextModule } from 'primeng/inputtext'
// import { CardModule } from 'primeng/card'
import { CustomersService } from 'src/app/core/services/customers.service'
import { HomeRoutingModule } from './home-routing.module'
import { HomeComponent } from './home.component'

@NgModule({
    declarations: [
        HomeComponent
    ],
    imports: [
        ButtonModule,
        HomeRoutingModule
    ],
    providers: [CustomersService]
})
export class HomeModule {
}
