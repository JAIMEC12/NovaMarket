import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';
import { environment } from '../../../../../environment/environment';
import {
  JwTPayload,
  LoguinRequest,
  LoguinResponse,
} from '../../../interfaces/private/login.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly API = environment.apiUrl;
  private readonly TOKEN_KEY = environment.tokenKey;
  private _token = signal<string | null>(localStorage.getItem(environment.tokenKey));

  isAuthenticated = computed(() => !!this.token());
  token = computed(() => this._token());

  payload = computed<JwTPayload | null>(() => {
    const t = this._token();
    return t ? this.decodeToken(t) : null;
  });

  username = computed(() => this.payload()?.username ?? null);
  userId = computed(() => this.payload()?.sub ?? null);

  constructor(private http: HttpClient) {}

  login(credentials: LoguinRequest) {
    return this.http.post<LoguinResponse>(`${this.API}/auth/login`, credentials).pipe(
      tap((res) => {
        localStorage.setItem(this.TOKEN_KEY, res.token);
        this._token.set(res.token);
      }),
    );
  }

  logout(router: any) {
    localStorage.removeItem(this.TOKEN_KEY);
    this._token.set(null);
    router.navigate(['/login']);
  }

  getToken(): string | null {
    return this._token();
  }

  private decodeToken(token: string): JwTPayload | null {
    try {
      const payload = token.split('.')[1];
      const decoded = atob(payload).replace(/-/g, '+').replace(/_/g, '/');
      return JSON.parse(decoded) as JwTPayload;
    } catch (error) {
      return null;
    }
  }
}
