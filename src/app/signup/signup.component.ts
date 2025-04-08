import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  name :string="";
  email :string="";
  password :string="";
  role:string="";
  confirmPassword: string = "";
  passwordsMatch: boolean = true;


  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService,
    private http :HttpClient
  ) {  }

  save() {
    this.checkPasswordMatch();
  
    if (!this.passwordsMatch) {
      this.toastr.error('Les mots de passe ne correspondent pas');
      return;
    }
  
    let bodyData = {
      "name": this.name,
      "email": this.email,
      "password": this.password,
      "role": this.role
    };
  
    let url: string;
    let successMessage: string;
  
    switch (this.role) {
      case "Client":
        url = "http://localhost:8084/api/v1/Clients/save";
        successMessage = "Client est enregistré avec succès";
        break;
      case "admin":
        url = "http://localhost:8084/api/v1/admins/save";
        successMessage = "Admin est enregistré avec succès";
        break;
      case "Intervenant":
        url = "http://localhost:8084/api/v1/intervenant/save";
        successMessage = "Intervenant est enregistré avec succès";
        break;
      default:
        this.toastr.error('Rôle non reconnu');
        return;
    }
  
    this.http.post(url, bodyData, { responseType: 'text' }).subscribe({
      next: (resultData: any) => {
        console.log(resultData);
        alert(successMessage);
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('Error saving user', error);
        this.toastr.error('Erreur lors de l\'enregistrement de l\'utilisateur');
      }
    });
  }
  
  checkPasswordMatch() {
    this.passwordsMatch = this.password === this.confirmPassword;
  }


  
}