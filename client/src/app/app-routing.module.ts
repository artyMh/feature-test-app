import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

const routes: Routes = [
    { path: '', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
    { path: 'customers', loadChildren: () => import('./customers/customers.module').then(m => m.CustomersModule) },
    { path: 'feature-toggles', loadChildren: () => import('./feature-toggles/feature-toggles.module').then(m => m.FeatureTogglesModule) },
    { path: 'active-features', loadChildren: () => import('./active-features/active-features.module').then(m => m.ActiveFeaturesModule) }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
