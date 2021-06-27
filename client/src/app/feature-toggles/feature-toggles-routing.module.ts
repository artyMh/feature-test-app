import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { FeatureTogglesComponent } from './feature-toggles.component'

export const routes: Routes = [
  { path: '', component: FeatureTogglesComponent }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class FeatureTogglesRoutingModule {
}
