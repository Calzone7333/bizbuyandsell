import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListingService {
  private get host(): string {
    return window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
      ? 'localhost'
      : window.location.hostname;
  }

  private get protocol(): string {
    return window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' ? 'http:' : window.location.protocol;
  }

  private get apiUrl() { return `${this.protocol}//${this.host}:8086/api/listings`; }
  private get statsUrl() { return `${this.protocol}//${this.host}:8086/api/public/stats`; }
  private get interestUrl() { return `${this.protocol}//${this.host}:8086/api/interest`; }
  private get consultationUrl() { return `${this.protocol}//${this.host}:8086/api/consultations`; }
  private get filesUrl() { return `${this.protocol}//${this.host}:8086/api/files`; }

  constructor(private http: HttpClient) { }

  uploadFile(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<any>(`${this.filesUrl}/upload`, formData);
  }

  getPlatformStats(): Observable<any> {
    return this.http.get<any>(this.statsUrl);
  }

  getAllListings(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getListingsByCategory(category: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/category/${category}`);
  }

  getListingDetails(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  createListing(listing: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, listing);
  }

  requestAccess(listingId: number, message?: string): Observable<any> {
    return this.http.post<any>(`${this.interestUrl}/request/${listingId}`, { message });
  }

  respondToRequest(requestId: number, status: string): Observable<any> {
    return this.http.put<any>(`${this.interestUrl}/${requestId}/respond`, null, { 
      params: { status } 
    });
  }

  getReceivedRequests(): Observable<any[]> {
    return this.http.get<any[]>(`${this.interestUrl}/seller`);
  }

  getSentRequests(): Observable<any[]> {
    return this.http.get<any[]>(`${this.interestUrl}/buyer`);
  }

  verifyListing(id: number, verificationData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${id}/verify`, verificationData);
  }

  calculateValuation(netProfit: number, assetsValue: number): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/calculate-valuation`, { 
      params: { netProfit, assetsValue } 
    });
  }

  bookConsultation(consultationData: any): Observable<any> {
    return this.http.post<any>(`${this.consultationUrl}/book`, consultationData);
  }
}
