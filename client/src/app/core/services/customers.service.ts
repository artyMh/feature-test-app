import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { Customer } from 'src/app/core/models/customer.model'

@Injectable({
    providedIn: 'root'
})
export class CustomersService {

    private readonly apiBaseUrl = 'http://localhost:3000/api/customer'

    constructor(private http: HttpClient) { }

    public getCustomers(): Observable<{data: Customer[]}> {
        return this.http.get<{data: Customer[]}>(`${this.apiBaseUrl}`)
    }

    public deleteCustomer(customerId: string): Observable<Customer> {
        return this.http.delete<Customer>(`${this.apiBaseUrl}/${customerId}`)
    }

    public createCustomer(newCustomer: Customer): Observable<Customer> {
        return this.http.post<Customer>(`${this.apiBaseUrl}`, newCustomer)
    }

    public updateCustomer(updatedCustomer: Customer): Observable<Customer> {
        return this.http.put<Customer>(`${this.apiBaseUrl}`, updatedCustomer)
    }
}