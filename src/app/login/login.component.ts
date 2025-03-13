import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  dataForm: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private toastr: ToastrService,
    
  ) {
    this.dataForm = this.fb.group({
      nom: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.email]],
      role: ['', [Validators.required, Validators.minLength(3)]],
      pwd: ['', [Validators.required, Validators.minLength(8)]],
      pwdd: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  ngOnInit() {
    this.infoForm();
  }

  infoForm() {
    this.dataForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      role: ['', [Validators.required, Validators.minLength(3)]],
      pwd: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  onLogin(): void {
    // Vérifier si le formulaire est valide
    if (this.dataForm.invalid) {
      if (this.dataForm.get('email')?.errors?.['required']) {
        this.toastr.warning('L\'email est requis.', 'Champ obligatoire');
      }
      if (this.dataForm.get('email')?.errors?.['email']) {
        this.toastr.warning('L\'email est invalide.', 'Erreur de saisie');
      }
      if (this.dataForm.get('pwd')?.errors?.['required']) {
        this.toastr.warning('Le mot de passe est requis.', 'Champ obligatoire');
      }
      if (this.dataForm.get('pwd')?.errors?.['minlength']) {
        this.toastr.warning('Le mot de passe doit contenir au moins 8 caractères.', 'Erreur de saisie');
      }
      if (this.dataForm.get('role')?.errors?.['required']) {
        this.toastr.warning('Le rôle est requis.', 'Champ obligatoire');
      }
      return;
    }
  
    const email = this.dataForm.value.email;
    const pwd = this.dataForm.value.pwd;
    const role = this.dataForm.value.role;
  
    // Vérifier la connexion via AuthService
    if (this.authService.login(email, pwd, role)) {
      switch (role.toLowerCase()) {
        case 'client':
          this.router.navigate(['/dashboard']);
          break;
        case 'admin':
          this.router.navigate(['/dashbord-admin']);
          break;
        case 'intervenant':
          this.router.navigate(['/intervenant']);
          break;
        default:
          this.toastr.warning('Rôle non reconnu', 'Erreur de rôle');
          break;
      }
    } else {
      this.toastr.error('Adresse email ou mot de passe incorrect', 'Échec de la connexion');
    }
  }
  loginWithGoogle(): void {
    console.log('Connexion avec Google');
  }
}
