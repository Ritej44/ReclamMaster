import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authTokenKey = 'authToken'; // Clé pour stocker le token dans le localStorage
  private userRoleKey = 'userRole'; // Clé pour stocker le rôle de l'utilisateur dans le localStorage

  constructor(private http: HttpClient, private router: Router) {}

  /**
   * Méthode pour connecter l'utilisateur.
   * @param email Email de l'utilisateur
   * @param password Mot de passe
   * @param role Rôle de l'utilisateur (client, intervenant, admin)
   * @returns Observable<boolean> Retourne true si la connexion est réussie, sinon false
   */
  login(email: string, password: string, role: string): Observable<boolean> {
    // Simule une requête HTTP vers un backend pour l'authentification
    return this.http.post<{ token: string }>('http://localhost:8080/api/login', { email, password, role }).pipe(
      tap(response => {
        if (response.token) {
          // Stocke le token et le rôle dans le localStorage
          localStorage.setItem(this.authTokenKey, response.token);
          localStorage.setItem(this.userRoleKey, role);
        }
      }),
      map(response => !!response.token) // Convertit la réponse en boolean
    );
  }

  getIntervenantId(): string | null {
    // Implémentez la logique pour récupérer l'ID de l'intervenant
    return localStorage.getItem('intervenantId'); // Exemple
  }

  /**
   * Méthode pour inscrire un nouvel utilisateur.
   * @param email Email de l'utilisateur
   * @param password Mot de passe
   * @returns Observable<boolean> Retourne true si l'inscription est réussie, sinon false
   */
  signup(email: string, password: string): Observable<boolean> {
    // Simule une requête HTTP vers un backend pour l'inscription
    return this.http.post<{ success: boolean }>('/api/signup', { email, password }).pipe(
      map(response => response.success) // Retourne true si l'inscription est réussie
    );
  }

  /**
   * Méthode pour vérifier si l'utilisateur est connecté.
   * @returns boolean Retourne true si l'utilisateur est connecté, sinon false
   */
  isLoggedIn(): boolean {
    // Vérifie si un token est présent dans le localStorage
    return !!localStorage.getItem(this.authTokenKey);
  }

  /**
   * Méthode pour récupérer le rôle de l'utilisateur connecté.
   * @returns string | null Retourne le rôle de l'utilisateur ou null si non connecté
   */
  getUserRole(): string | null {
    return localStorage.getItem(this.userRoleKey);
  }

  /**
   * Méthode pour déconnecter l'utilisateur.
   */
  logout(): void {
    // Supprime le token et le rôle du localStorage
    localStorage.removeItem(this.authTokenKey);
    localStorage.removeItem(this.userRoleKey);
    // Redirige l'utilisateur vers la page de connexion
    this.router.navigate(['/login']);
    console.log('Déconnexion réussie');
  }

  /**
   * Méthode pour récupérer le token d'authentification.
   * @returns string | null Retourne le token ou null si non connecté
   */
  getToken(): string | null {
    return localStorage.getItem(this.authTokenKey);
  }
}