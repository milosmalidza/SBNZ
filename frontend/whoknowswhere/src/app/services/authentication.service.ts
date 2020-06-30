import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) {}

  login(auth: any): Observable<any> {
    return this.http.post('api/auth/login',
      { email: auth.username, password: auth.password },
      { headers: this.headers, responseType: 'json' }
    );
  }
  
}
