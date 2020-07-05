import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(private authService: AuthenticationService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.authService.isLoggedIn()) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${this.authService.getBearerToken()}`
        }
      });
    }
    return next.handle(req);
  }
}