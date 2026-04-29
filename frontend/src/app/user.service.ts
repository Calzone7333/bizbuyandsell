import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
    ? 'http://localhost:8086/api/v1/user'
    : '/api/v1/user';

  constructor(private http: HttpClient) {}

  private getHeaders() {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  getAllUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/admin/all`, { headers: this.getHeaders() });
  }

  getProfile(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/profile`, { headers: this.getHeaders() });
  }

  updateProfile(profile: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/profile`, profile, { headers: this.getHeaders() });
  }

  changePassword(passwords: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/password`, passwords, { headers: this.getHeaders() });
  }

  softDelete(): Observable<any> {
    return this.http.delete(`${this.apiUrl}/deactivate`, { headers: this.getHeaders() });
  }
}
