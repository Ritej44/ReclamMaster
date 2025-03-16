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
      nom: [''],
      email: ['', [Validators.required, Validators.email]],
      role: ['', [Validators.required, Validators.minLength(3)]],
      pwd: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  ngOnInit() {
    this.infoForm();
  }

  infoForm() {
    this.dataForm = this.fb.group({
      nom: [''],
      email: ['', [Validators.required, Validators.email]],
      role: ['', [Validators.required, Validators.minLength(3)]],
      pwd: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  onLogin(): void {
    if (this.dataForm.invalid) {
      console.log('Erreurs de validation :', this.dataForm.errors); // Affichez les erreurs dans la console
      this.showFormErrors(); // Affichez les erreurs à l'utilisateur
      return;
    }

    const email = this.dataForm.value.email;
    const pwd = this.dataForm.value.pwd;
    const role = this.dataForm.value.role;

    // Appel de la méthode login du AuthService
    this.authService.login(email, pwd, role).subscribe(
      (success: boolean) => {
        if (success) {
          this.toastr.success('Connexion réussie', 'Succès');
          this.redirectBasedOnRole(role);
        } else {
          this.toastr.error('Adresse email ou mot de passe incorrect', 'Échec de la connexion');
        }
      },
      (error) => {
        this.toastr.error('Une erreur est survenue lors de la connexion', 'Erreur');
      }
    );
  }

  /**
   * Affiche les erreurs de validation du formulaire.
   */
  showFormErrors(): void {
    const controls = this.dataForm.controls;
    for (const controlName in controls) {
      if (controls[controlName].errors) {
        const errors = controls[controlName].errors;
        if (errors?.['required']) {
          this.toastr.warning(`${controlName} est requis.`, 'Champ obligatoire');
        }
        if (errors?.['email']) {
          this.toastr.warning('L\'email est invalide.', 'Erreur de saisie');
        }
        if (errors?.['minlength']) {
          this.toastr.warning(`${controlName} doit contenir au moins ${errors['minlength'].requiredLength} caractères.`, 'Erreur de saisie');
        }
      }
    }
  }

  /**
   * Redirige l'utilisateur en fonction de son rôle.
   * @param role Rôle de l'utilisateur (client, admin, intervenant)
   */
  redirectBasedOnRole(role: string): void {
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
  }

  loginWithGoogle(): void {
    console.log('Connexion avec Google');
  }
}