import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { CustomerFeature, FeatureRequest } from 'src/app/core/models/active-feature.model'

@Injectable({
    providedIn: 'root'
})
export class FeaturesService {
    private readonly apiBaseUrl = 'http://localhost:3000/api/feature'

    constructor(private http: HttpClient) { }

    public getCustomerFeatures(features: FeatureRequest): Observable<{data: CustomerFeature}> {
        return this.http.post<{data: CustomerFeature}>(`${this.apiBaseUrl}`, features)
    }
}
