import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListingService {
  private apiUrl = 'http://localhost:8086/api/listings';
  private statsUrl = 'http://localhost:8086/api/public/stats';
  private interestUrl = 'http://localhost:8086/api/interest';
  private consultationUrl = 'http://localhost:8086/api/consultations';

  constructor(private http: HttpClient) { }

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
    return this.http.post<any>(`${this.apiUrl}/${id}/verify`, verificationData.summary, { 
      params: { 
        financials: verificationData.financials,
        gst: verificationData.gst,
        profit: verificationData.profit,
        identity: verificationData.identity
      } 
    });
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
