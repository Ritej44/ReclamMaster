import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  ClientsArray : any[] = [];

  name :string="";
  role:string="";
  currentClientID = "";
  email: string ="";
  password: string ="";
  constructor(private router: Router,private http: HttpClient,private toastr:ToastrService) {}
 
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
  
    this.http.post(url, bodyData, { responseType: 'text' }).subscribe({
      next: (resultData: any) => {
        console.log(resultData);
        alert(successMessage);
  
        // Navigate after successful login
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
        this.toastr.error('Erreur lors de la connexion de l\'utilisateur');
      }
    });
  }
  
      /*  this.http.post(url,bodyData ,{responseType:'Text'}).subscribe( {
           (resultData: any) => {
        console.log(resultData);
        alert(successMessage);}
 
        if (resultData.message == "Email not exists")
        {
      
          alert("Email not exits");
    
 
        }
        else if(resultData.message == "Login Succes")
    
         {
          this.router.navigateByUrl('/dashboard');
        }
        else
        {
          alert("Incorrect Email and Password not match");
        }
      });
    }*/
  }



  

   /*

  infoForm() {
    this.dataForm = this.fb.group({
      name: [''],
      email: ['', [Validators.required, Validators.email]],
      role: ['', [Validators.required, Validators.minLength(3)]],
      pwd: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  onLogin(): void {
    if (this.dataForm.invalid) {
        this.showFormErrors();
        return;
    }

    const { email, pwd: password, role } = this.dataForm.value;

    this.authService.login(email, password, role).subscribe(
        (success: boolean) => {
            if (success) {
                this.toastr.success('Connexion réussie', 'Succès');
                this.redirectBasedOnRole(role);
            } else {
                this.toastr.error('Adresse email ou mot de passe incorrect', 'Échec');
            }
        },
        (error) => {
            this.toastr.error('Erreur serveur: ' + error.message, 'Erreur');
        }
    );
}

   * Affiche les erreurs de validation du formulaire.
  
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

   * Redirige l'utilisateur en fonction de son rôle.
   * @param role Rôle de l'utilisateur (client, admin, intervenant)
   
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
  */
