import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private http: HttpClient) { }

  retreiveLocationInfo(lngLat: any): Observable<any> {
    return this.http.post<any>('api/location/retreive-info', lngLat);
  }

}
