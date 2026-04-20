import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8080/api/v1/user';

  constructor(private http: HttpClient) { }

  getProfile(): Observable<any> {
    return this.http.get(`${this.apiUrl}/profile`);
  }

  updateProfile(profileData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/profile`, profileData);
  }

  changePassword(passwords: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/password`, passwords);
  }

  softDelete(): Observable<any> {
    return this.http.post(`${this.apiUrl}/soft-delete`, {});
  }

  reactivate(email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/reactivate`, { email });
  }
}
