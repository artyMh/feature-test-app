import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { ActiveFeatureComponent } from './active-features.component'

export const routes: Routes = [
  { path: '', component: ActiveFeatureComponent }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ActiveFeatureRoutingModule {
}
