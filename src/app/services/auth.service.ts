import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { tap } from 'rxjs/operators';

export interface User {
  id: number;
  username: string;
  email: string;
  role: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    user: User;
    token: string;
    expiresIn: string;
  };
}

export interface ProfileResponse {
  success: boolean;
  data: {
    user: User;
  };
}

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/auth`;
  private tokenKey = 'auth_token';
  private userKey = 'current_user';

  // BehaviorSubject para mantener el estado del usuario autenticado
  private currentUserSubject = new BehaviorSubject<User | null>(this.getCurrentUser());
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) { }

  private getSkipToastHeaders(): HttpHeaders {
    return new HttpHeaders({ 'X-Skip-Error-Toast': 'true' });
  }

  /**
   * 🟢 Login de usuario
   * POST /api/auth/login
   */
  login(credentials: { email: string; password: string }): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, credentials, { headers: this.getSkipToastHeaders() }).pipe(
      tap(response => {
        if (response.success) {
          this.setToken(response.data.token);
          this.setCurrentUser(response.data.user);
        }
      })
    );
  }

  /**
   * 🟢 Registro de nuevo usuario
   * POST /api/auth/register
   */
  register(userData: { username: string; email: string; password: string; role?: string }): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/register`, userData, { headers: this.getSkipToastHeaders() }).pipe(
      tap(response => {
        if (response.success) {
          this.setToken(response.data.token);
          this.setCurrentUser(response.data.user);
        }
      })
    );
  }

  /**
   * 🔴 Logout del usuario
   * POST /api/auth/logout
   */
  logout(): Observable<any> {
    this.clearToken();
    this.clearCurrentUser();
    return of({ success: true, message: 'Sesión cerrada exitosamente.' });
  }

  /**
   * 🔁 Refrescar token
   * POST /api/auth/refresh-token
   */
  refreshToken(): Observable<any> {
    const token = this.getToken();
    if (!token) {
      throw new Error('No token available');
    }

    return this.http.post(`${this.apiUrl}/refresh-token`, { token }).pipe(
      tap((response: any) => {
        if (response.success) {
          this.setToken(response.data.token);
        }
      })
    );
  }

  /**
   * 👤 Obtener perfil del usuario
   * GET /api/auth/profile
   */
  getProfile(): Observable<ProfileResponse> {
    return this.http.get<ProfileResponse>(`${this.apiUrl}/profile`);
  }

  /**
   * Verificar si el usuario está autenticado
   */
  isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) return false;

    // Verificar si el token no ha expirado
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const now = Date.now() / 1000;
      return payload.exp > now;
    } catch (error) {
      return false;
    }
  }

  /**
   * Obtener el token actual
   */
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  /**
   * Establecer el token
   */
  private setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  /**
   * Limpiar el token
   */
  private clearToken(): void {
    localStorage.removeItem(this.tokenKey);
  }

  /**
   * Obtener el usuario actual
   */
  getCurrentUser(): User | null {
    const userStr = localStorage.getItem(this.userKey);
    if (userStr) {
      try {
        return JSON.parse(userStr);
      } catch (error) {
        return null;
      }
    }
    return null;
  }

  /**
   * Establecer el usuario actual
   */
  private setCurrentUser(user: User): void {
    localStorage.setItem(this.userKey, JSON.stringify(user));
    this.currentUserSubject.next(user);
  }

  /**
   * Limpiar el usuario actual
   */
  private clearCurrentUser(): void {
    localStorage.removeItem(this.userKey);
    this.currentUserSubject.next(null);
  }

  /**
   * Obtener headers con token para peticiones autenticadas
   */
  getAuthHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }
}