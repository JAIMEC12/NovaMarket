import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environment/environment';
import { Product } from '../../interfaces/public/public.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private url = `${environment.apiUrl}/products`;

  constructor(private http: HttpClient) {}

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.url);
  }

  getProductsLimit(limit: number): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.url}?limit=${limit}`);
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.url}/${id}`);
  }
}
