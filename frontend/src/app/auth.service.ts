import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
    ? 'http://localhost:8086/api/v1/auth'
    : `http://${window.location.hostname}:8086/api/v1/auth`;
  private loggedInSubject = new BehaviorSubject<boolean>(this.hasToken());

  constructor(private http: HttpClient) {}

  private hasToken(): boolean {
    return !!localStorage.getItem('token');
  }

  get isLoggedIn$() {
    return this.loggedInSubject.asObservable();
  }

  register(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData);
  }

  verify(email: string, otp: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/verify`, { email, otp }).pipe(
      tap((response: any) => {
        if (response.token) {
          localStorage.setItem('token', response.token);
          localStorage.setItem('userEmail', response.email);
          localStorage.setItem('userRole', response.role);
          localStorage.setItem('kycVerified', String(response.kycVerified));
          this.loggedInSubject.next(true);
        }
      })
    );
  }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      tap((response: any) => {
        if (response.token) {
          localStorage.setItem('token', response.token);
          localStorage.setItem('userEmail', response.email);
          localStorage.setItem('userRole', response.role);
          localStorage.setItem('kycVerified', String(response.kycVerified));
          this.loggedInSubject.next(true);
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userRole');
    localStorage.removeItem('kycVerified');
    this.loggedInSubject.next(false);
  }

  forgotPassword(email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/forgot-password`, { email });
  }

  resetPassword(resetData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/reset-password`, resetData).pipe(
      tap((response: any) => {
        if (response.token) {
          localStorage.setItem('token', response.token);
          localStorage.setItem('userEmail', response.email);
          localStorage.setItem('userRole', response.role);
          localStorage.setItem('kycVerified', String(response.kycVerified));
          this.loggedInSubject.next(true);
        }
      })
    );
  }

  isLoggedIn(): boolean {
    return this.loggedInSubject.value;
  }

  getUserRole(): string | null {
    return localStorage.getItem('userRole');
  }

  isAdmin(): boolean {
    return this.getUserRole() === 'ADMIN';
  }

  isKycVerified(): boolean {
    return localStorage.getItem('kycVerified') === 'true';
  }
}
