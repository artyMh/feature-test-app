import { Component } from '@angular/core'
import { MenuItem } from 'primeng/api'

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'feature-toggle-app'

    items: MenuItem[] = [
        { label: 'Home', icon: 'pi pi-fw pi-home', routerLink: ['/'] },
        { label: 'Customers', icon: 'pi pi-fw pi-users', routerLink: ['/customers'] },
        { label: 'Feature toggles', icon: 'pi pi-fw pi-sliders-h', routerLink: ['/feature-toggles'] },
        { label: 'Active features', icon: 'pi pi-fw pi-th-large', routerLink: ['/active-features'] }
    ]
}
