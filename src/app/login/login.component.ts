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
    /*
         Logine() {
    let bodyData = {
      "name": this.name,
      "email": this.email,
      "password": this.password,
      "role": this.role
    };
  
    let url: string;
    let successMessage: string;
  
    switch (this.role) {
      case "client":
        url = "http://localhost:8084/api/v1/Clients/login";
        this.toastr.success( "Client est connecté avec succès", "Succès");
        break;
      case "admin":
        url = "http://localhost:8084/api/v1/admins/login";
        this.toastr.success( "Admin est connecté avec succès", "Succès");
        break;
      case "intervenant":
        url = "http://localhost:8084/api/v1/intervenant/login";
        this.toastr.success( "Intervenant est connecté avec succès", "Succès");
        break;
      default:
        this.toastr.error('Rôle non reconnu');
        return;
    }
  
    this.http.post<any>(url, bodyData).subscribe({
      next: (response) => {
        console.log("Full response:", response);
        console.log("Données envoyées:", bodyData); // Debug

        if (response.status === true && response.token) {
          localStorage.setItem("token", response.token);
          localStorage.setItem("currentUser", JSON.stringify({
            name: response.name || this.name,
            email: this.email,
            role: this.role,
          }));
        }    

        switch (this.role) {
          case "client":
            this.router.navigateByUrl('/dashboard');
            break;
          case "admin":
            this.router.navigateByUrl('/dashbord-admin');
            break;
          case "intervenant":
            this.router.navigateByUrl('/dashboard-intervenant');
            break;
        }
      },
      error: (error) => {
        console.error('Error ', error);
        this.toastr.error('Erreur lors de la connexion de l\'utilisateur','Erreur');
      }
    });
  }
}*/

 private url: string = "http://localhost:8084/api/v1/auth/authenticate";

 Login() {
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
      console.error("Authentication error:", error);
    }
    
  } );
  
 
}

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
  storedUser: any = localStorage.getItem('currentUser');

  }



  

