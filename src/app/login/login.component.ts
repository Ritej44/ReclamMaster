import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs/internal/Observable';
import { response } from 'express';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  showPassword = false;
  currentClient: any =[];

  ClientsArray : any[] = [];
  name :string="";
  role:string="";
  currentClientID = "";
  email: string ="";
  password: string ="";

  constructor(private router: Router,private http: HttpClient,private toastr:ToastrService ,private authService:AuthService) {
  }
 private url: string = "http://localhost:8084/api/v1/auth/authenticate";
  emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  validateEmail() {
    if (this.email && !this.emailRegex.test(this.email)) {
      this.toastr.error('Veuillez entrer un email valide.');
    }
  }
  

  validateFields(): boolean {
    if (!this.name) {
      this.toastr.error('Le nom est requis');
      return false;
    }
    if (!this.email) {
      this.toastr.error('L\'email est requis');
      return false;
    }
    if (!this.password) {
      this.toastr.error('Le mot de passe est requis');
      return false;
    }
    if (!this.emailRegex.test(this.email)) {
      this.toastr.error('Veuillez entrer un email valide');
      return false;
    }
    if (!this.role) {
      this.toastr.error('Le rôle est requis');
      return false;
    }
    return true;
  }  
 Login() {
  if (!this.validateFields()) {
      return;}
  const bodyData = {
    name: this.name,
    email: this.email,
    password: this.password,
    role: this.role

  };

  this.http.post<any>(this.url, bodyData).subscribe({
    next: (response) => {
      console.log("Full response:", response);
      console.log("Données envoyées:", bodyData); // Debug

      if (response.token) {
        localStorage.setItem("token", response.token);
        localStorage.setItem("currentUser", JSON.stringify({
          name:  this.name,
          email: this.email,
          role: response.role || this.role,
        }));
      } else {
        console.error("Authentication failed: No token in response");
      }
      switch (this.role) {
        case "CLIENT":
          this.router.navigateByUrl('/dashboard');
          break;
        case "ADMIN":
          this.router.navigateByUrl('/dashbord-admin');
          break;
        case "INTERVENANT":
          this.router.navigateByUrl('/dashboard-intervenant');
          break;
      }
    },
    error: (error) => {
      this.toastr.error('Erreur lors de l\'authentification');
      console.error("Authentication error:", error);
    }
    
  } );
  
 
}

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
  storedUser: any = localStorage.getItem('currentUser');

  }



  

