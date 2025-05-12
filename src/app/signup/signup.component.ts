import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  showconfirmPassword : boolean= false
  showPassword :boolean = false
  name :string="";
  email :string="";
  password :string="";
  role:string="";
  confirmPassword: string = "";
  passwordsMatch: boolean = true;
 

  private url: string = "http://localhost:8084/api/v1/auth/register";

  constructor(
    private http: HttpClient,
    private router: Router,
    private toastr: ToastrService
  ) {}

  
  emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  validateEmail() {
    if (this.email && !this.emailRegex.test(this.email)) {
      this.toastr.error('Veuillez entrer un email valide.');
    }
  }

  
  validatePasswords() {
    if (this.password !== this.confirmPassword) {
      this.toastr.error('Les mots de passe ne correspondent pas.');
    }
  }
  save() {
    if (!this.validateFields()) {
      return;
    }

    this.checkPasswordMatch();

    if (!this.passwordsMatch) {
      this.toastr.error('Les mots de passe ne correspondent pas');
      return;
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const bodyData = {
      name: this.name,
      email: this.email,
      password: this.password,
      role: this.role
    };

    this.http.post<any>(this.url, bodyData).subscribe({
      next: (resultData) => {
        console.log(resultData);
        this.toastr.success('Utilisateur enregistré avec succès');
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
    if (!this.confirmPassword) {
      this.toastr.error('La confirmation du mot de passe est requise');
      return false;
    }
    if (!this.role) {
      this.toastr.error('Le rôle est requis');
      return false;
    }
    return true;
  }  


  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
  
  toggleconfirmPasswordVisibility() {
    this.showconfirmPassword = !this.showconfirmPassword;
  }
  
}