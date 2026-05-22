import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environment/environment';
import { Product, ProductPayload } from '../../../interfaces/private/product.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private url = `${environment.apiUrl}/products`;

  constructor(private http: HttpClient) {}

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.url);
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.url}/${id}`);
  }

  createProduct(payload: ProductPayload): Observable<Product> {
    return this.http.post<Product>(this.url, payload);
  }

  updateProduct(id: number, payload: ProductPayload): Observable<Product> {
    return this.http.put<Product>(`${this.url}/${id}`, payload);
  }

  deleteProduct(id: number): Observable<Product> {
    return this.http.delete<Product>(`${this.url}/${id}`);
  }
}
