import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private  apiUrl = 'http://localhost:8084/api/v1/clients'; 
 
  getIntervenantId(): string | null {
    // Implémentez la logique pour récupérer l'ID de l'intervenant
    return localStorage.getItem('intervenantId'); // Exemple
  }
  private authTokenKey = 'authToken';
  private userRoleKey = 'userRole';

  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, password: string, role: string): Observable<boolean> {
    return this.http.post<any>(
        'http://localhost:8084/api/v1/auth/login',
        { email, password, role } 
    ).pipe(
        tap(response => {
            if (response.token) {
                localStorage.setItem('authToken', response.token);
                localStorage.setItem('userEmail', response.email);
                if (response.role) {
                    localStorage.setItem('userRole', response.role);
                } else {
                    localStorage.setItem('userRole', role);
                }
            }
        }),
        map(response => !!response.token),
        catchError(error => {
            console.error('Login error:', error);
            return of(false);
        })
    );
}

  signup(firstName: string, lastName: string, email: string, password: string): Observable<boolean> {
    return this.http.post<any>(`${this.apiUrl}/signup`, {
      firstName,
      lastName,
      email,
      password
    }, {
      headers: { 'Content-Type': 'application/json' }
    }).pipe(
      map(response => !!response.token),
      catchError(error => {
        console.error('Erreur API:', error);
        return throwError(() => ({
          message: error.error?.message || 'Erreur technique côté serveur',
          status: error.status
        }));
      })
    );
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.authTokenKey);
  }

  getUserRole(): string {
   const role = localStorage.getItem(this.userRoleKey);
    return role!;
    }

  logout(): void {
    localStorage.removeItem(this.authTokenKey);
    localStorage.removeItem(this.userRoleKey);
    this.router.navigate(['/login']);
    console.log('Déconnexion réussie');
  }

  getToken(): string | null {
    return localStorage.getItem(this.authTokenKey);
  }

  // Méthode optionnelle pour vérifier le rôle
  hasRole(requiredRole: string): boolean {
    const userRole = this.getUserRole();
    return userRole === requiredRole;
  }

 
}