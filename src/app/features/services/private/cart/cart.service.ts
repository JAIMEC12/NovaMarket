import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environment/environment';
import { Cart, CartPayload } from '../../../interfaces/private/cart.interface';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private url = `${environment.apiUrl}/carts`;

  constructor(private http: HttpClient) {}

  getAllCarts(): Observable<any> {
    return this.http.get<any>(this.url);
  }

  getCartById(id: number): Observable<Cart> {
    return this.http.get<Cart>(`${this.url}/${id}`);
  }

  createCart(payload: CartPayload): Observable<Cart> {
    return this.http.post<Cart>(this.url, payload);
  }

  updateCart(id: number, payload: CartPayload): Observable<Cart> {
    return this.http.put<Cart>(`${this.url}/${id}`, payload);
  }

  deleteCart(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
