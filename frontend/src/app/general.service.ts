import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {
  private apiUrl = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
    ? 'http://localhost:8086/api'
    : `${window.location.protocol}//${window.location.hostname}:8086/api`;

  constructor(private http: HttpClient) {}

  getPlatformStats(): Observable<any> {
    return this.http.get(`${this.apiUrl}/public/stats`, {
      headers: { 'X-Bizbuysell-Request': 'true' }
    });
  }

  getAllListings(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/listings`);
  }
}
