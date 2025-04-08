import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate{

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    // 1. Vérification de connexion
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return false;
    }
  
    // 2. Vérification des rôles
    const requiredRoles = route.data['roles'] as string[];
    const userRole = this.authService.getUserRole(); // Ne peut pas être null
  
    if (requiredRoles && !requiredRoles.includes(userRole)) {
      this.router.navigate(['/access-denied']);
      return false;
    }
    return true;
  }
}
