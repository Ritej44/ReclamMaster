import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
  logout(): void {
    // Implémentez la logique de déconnexion ici
    // Par exemple, effacez le token d'authentification du localStorage
    localStorage.removeItem('authToken');
    console.log('Déconnexion réussie');
  }
}
