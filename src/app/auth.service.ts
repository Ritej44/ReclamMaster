import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'}

)
export class AuthService {

  constructor() { }
  login(username: string, password: string,role:string): boolean {
    // Implémentez la logique de connexion ici
    // Retourne true si la connexion est réussie, sinon false
    return true;
  }

  signup(username: string, password: string): boolean {
    // Implémentez la logique d'inscription ici
    // Retourne true si l'inscription est réussie, sinon false
    return true;
  }

  isLoggedIn(): boolean {
    // Implémentez la logique pour vérifier si l'utilisateur est connecté
    return true;
  }
  logout(): void {
    // Implémentez la logique de déconnexion ici
    // Par exemple, effacez le token d'authentification du localStorage
    localStorage.removeItem('authToken');
    console.log('Déconnexion réussie');
  }
}
