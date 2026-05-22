import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environment/environment';
import { Cart } from '../../../interfaces/private/cart.interface';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private url = `${environment.apiUrl}/carts`;

  constructor(private http: HttpClient) {}

  getAllCarts(): Observable<Cart[]> {
    return this.http.get<Cart[]>(this.url);
  }

  getCartById(id: number): Observable<Cart> {
    return this.http.get<Cart>(`${this.url}/${id}`);
  }

  createCart(cart: Partial<Cart>): Observable<Cart> {
    return this.http.post<Cart>(this.url, cart);
  }

  updateCart(id: number, cart: Partial<Cart>): Observable<Cart> {
    return this.http.put<Cart>(`${this.url}/${id}`, cart);
  }

  deleteCart(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
