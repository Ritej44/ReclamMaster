import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8084/api/v1/Clients';
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;
  private authTokenKey = 'authToken';
  private userRoleKey = 'userRole';

  getIntervenantId(): string | null {
    // Implémentez la logique pour récupérer l'ID de l'intervenant
    return localStorage.getItem('intervenantId'); 
  }

  
  constructor(private http: HttpClient, private router: Router) {
    const storedUser = localStorage.getItem('currentUser');
    this.currentUserSubject = new BehaviorSubject<any>(storedUser ? JSON.stringify(storedUser) : null);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  
  getUserName(): Promise<string> {
    return this.http.get(`${this.apiUrl}/profile`, { responseType: 'text' }).toPromise().then(response => response || '');
  }

  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  public isLoggedIn(): boolean {
    return this.currentUserValue !== null;
  }

  login(obj: any) : Observable<any> {
    return this.http.post(' http://localhost:8084/api/v1/Clients/login',obj);

  }

  logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('authToken');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
    console.log('Déconnexion réussie');
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


  getUserRole(): string {
    const role = localStorage.getItem(this.userRoleKey);
    return role || '';
  }

  getToken(): string | null {
    return localStorage.getItem(this.authTokenKey);
  }

  storeUserData(token: string, user: any) {
    localStorage.setItem('authToken', token);
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.currentUserSubject.next(user);
  }

 
}