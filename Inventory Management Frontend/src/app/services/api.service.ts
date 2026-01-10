import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private baseUrl = 'http://localhost:5160/api';

  constructor(private http: HttpClient) {}

  register(user: { username: string; password: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/users/register`, user);
  }
  login(user: { username: string; password: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/users/login`, user);
  }
  getProducts(): Observable<any> { return this.http.get(`${this.baseUrl}/products`); }
  createProduct(dto: any): Observable<any> { return this.http.post(`${this.baseUrl}/products`, dto); }
  updateProduct(id: number, dto: any): Observable<any> { return this.http.put(`${this.baseUrl}/products/${id}`, dto); }
  deleteProduct(id: number): Observable<any> { return this.http.delete(`${this.baseUrl}/products/${id}`); }
  getWarehouses(): Observable<any> { return this.http.get(`${this.baseUrl}/warehouses`); }
  createWarehouse(dto: any): Observable<any> { return this.http.post(`${this.baseUrl}/warehouses`, dto); }
  getInventory(): Observable<any> { return this.http.get(`${this.baseUrl}/inventory`); }
  postMovement(dto: any): Observable<any> { return this.http.post(`${this.baseUrl}/movements`, dto); }
}
