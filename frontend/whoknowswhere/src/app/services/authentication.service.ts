import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) {}

  loginRequest(auth: any): Observable<any> {
    return this.http.post('api/auth/login',
      { email: auth.username, password: auth.password },
      { headers: this.headers, responseType: 'json' }
    );
  }

  registerRequest(user: any) {
    return this.http.post('api/auth/register', user);
  }

  login(user: any) {
    localStorage.setItem(environment.user, user);
  }

  logout(): void {
    localStorage.removeItem(environment.user);
  }

  isLoggedIn(): boolean {
    return localStorage.getItem(environment.user) !== null;
  }

  getCurrentUser(): any {
    return JSON.parse(localStorage.getItem(environment.user));
  }

  isRegisteredUser(): boolean {
    if (this.isLoggedIn()) {
      return this.getCurrentUser().authorities.includes('ROLE_USER');
    }
    return false;
  }

  isAdmin(): boolean {
    if (this.isLoggedIn()) {
      return this.getCurrentUser().authorities.includes('ROLE_ADMIN');
    }
    return false;
  }

  getBearerToken() {
    return this.getCurrentUser().token;
  }
  
}
