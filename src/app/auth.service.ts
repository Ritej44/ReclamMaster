import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit {

  constructor(private http: HttpClient, private router: Router) {}

  
  currentUser: any = [];
  
  getCurrentUser() {
    const currentUser = localStorage.getItem('currentUser');
    return currentUser ? JSON.parse(currentUser) : null;
  }
  getToken() {
    return localStorage.getItem('token');
  }
  ngOnInit() {
  this.currentUser =this.getCurrentUser();

   }
setCurrentUser(user: any) {
    localStorage.setItem('currentUser', JSON.stringify(user));
  }


  logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('authToken');
    this.router.navigate(['/login']);
    console.log('Déconnexion réussie');
  }




 
}