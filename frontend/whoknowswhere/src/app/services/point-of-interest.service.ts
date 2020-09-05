import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PointOfInterestService {

  constructor(private http: HttpClient) { }

  createPOI(dto: any): Observable<any> {
    return this.http.post<any>('api/poi/create-poi', dto);
  }

  getAllPOI(): Observable<any> {
    return this.http.get<any>('api/poi/all');
  }

  removePOI(dto: any): Observable<any> {
    return this.http.post<any>('api/poi/delete', dto);
  }

  restorePOI(dto: any): Observable<any> {
    return this.http.post<any>('api/poi/restore', dto);
  }
}
