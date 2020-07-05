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


}
