import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DestinationService {

  constructor(private http: HttpClient) { }

  getRecommendation(dto: any): Observable<any> {
    return this.http.post<any>('api/dest/recommendation', dto);
  }

  getTrending(): Observable<any> {
    return this.http.get<any>('api/dest/trending');
  }

  likeDestination(destination: any): Observable<any> {
    return this.http.post<any>('api/dest/like', destination);
  }

  isLikedDestination(destination: any): Observable<any> {
    return this.http.post<any>('api/dest/is-liked', destination);
  }

  getAllDestinations(): Observable<any> {
    return this.http.get<any>('api/dest/all');
  }

  createDestination(dto: any): Observable<any> {
    return this.http.post<any>('api/dest/create-destination', dto);
  }

  removeDestination(dto: any): Observable<any> {
    return this.http.post<any>('api/dest/delete', dto);
  }

  restoreDestination(dto: any): Observable<any> {
    return this.http.post<any>('api/dest/restore', dto);
  }


}
