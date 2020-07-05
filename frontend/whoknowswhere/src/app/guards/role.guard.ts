import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, CanActivate } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private authenticationService: AuthenticationService,
              private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    
    const loggedUser = this.authenticationService.getCurrentUser();
    let permissions = route.data.permissions as Array<string>;

    if (loggedUser == null || !permissions.includes(loggedUser.authorities[0])) { // the user has only 1 role
      this.router.navigate(['/home']);
      return false;
    }

    return true;
  }
}
