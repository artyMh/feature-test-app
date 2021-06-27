import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { FeatureToggle } from 'src/app/core/models/feature-toggle.model'

@Injectable({
    providedIn: 'root'
})
export class FeatureToggleService {

    private readonly apiBaseUrl = 'http://localhost:3000/api/feature-toggle'

    constructor(private http: HttpClient) { }

    public getFeatureToggles(): Observable<{data: FeatureToggle[]}> {
        return this.http.get<{data: FeatureToggle[]}>(`${this.apiBaseUrl}`)
    }

    public deleteFeatureToggle(featureToggleId: string): Observable<FeatureToggle> {
        return this.http.delete<FeatureToggle>(`${this.apiBaseUrl}/${featureToggleId}`)
    }

    public createFeatureToggle(newFeatureToggle: FeatureToggle): Observable<FeatureToggle> {
        return this.http.post<FeatureToggle>(`${this.apiBaseUrl}`, newFeatureToggle)
    }

    public updateFeatureToggle(updatedFeatureToggle: FeatureToggle): Observable<FeatureToggle> {
        return this.http.put<FeatureToggle>(`${this.apiBaseUrl}`, updatedFeatureToggle)
    }
}