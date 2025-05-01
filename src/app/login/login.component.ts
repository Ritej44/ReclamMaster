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


  ClientsArray : any[] = [];
  name :string="";
  role:string="";
  currentClientID = "";
  email: string ="";
  password: string ="";

  loginObj: any = {
    name:'',
    email: '',
    password: ''
  };
  constructor(private router: Router,private http: HttpClient,private toastr:ToastrService ,private authService:AuthService) {
  }
    /*
    private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;
  private authTokenKey = 'authToken';
  
  
  const storedUser = localStorage.getItem('currentUser');
    let parsedUser = null;

    if (storedUser) {
      try {
        parsedUser = JSON.parse(storedUser);
      } catch (e) {
        console.error('Error parsing storedUser:', e);
      }
}
  this.currentUserSubject = new BehaviorSubject<any>(parsedUser);
    this.currentUser = this.currentUserSubject.asObservable();
  }

 Login(){
    debugger
  this.authService.login(this.loginObj).subscribe((res: any) => {
    console.log('res',res)
    localStorage.setItem('token',res.token);
     this.router.navigateByUrl('/dashboard');
  })
}*/
  Login() {
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
        successMessage = "Client est connecté avec succès";
        break;
      case "admin":
        url = "http://localhost:8084/api/v1/admins/login";
        successMessage = "Admin est connecté avec succès";
        break;
      case "intervenant":
        url = "http://localhost:8084/api/v1/intervenant/login";
        successMessage = "Intervenant est connecté avec succès";
        break;
      default:
        this.toastr.error('Rôle non reconnu');
        return;
    }
  
    this.http.post<any>(url, bodyData).subscribe({
      next: (response) => {
        console.log(response);
        this.authService.storeUserData(response.token,response.user);
        this.toastr.success('Connexion réussie','Succès');

        switch (this.role) {
          case "client":
            this.router.navigateByUrl('/dashboard');
            break;
          case "admin":
            this.router.navigateByUrl('/dashbord-admin');
            break;
          case "intervenant":
            this.router.navigateByUrl('/intervenant');
            break;
        }
      },
      error: (error) => {
        console.error('Error ', error);
        this.toastr.error('Erreur lors de la connexion de l\'utilisateur','Erreur');
      }
    });
  }
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
  
  }



  

