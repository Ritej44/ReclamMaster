import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  username: string = '';
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';

  

  constructor(private authService: AuthService, private router: Router) {}

  onSignup(): void {
    if (this.authService.signup(this.username, this.password)) {
      this.router.navigate(['/login']);
    } else {
      // Gérer l'échec de l'inscription
    }
    
    // Implémentez la logique d'inscription ici
    console.log('First Name:', this.firstName);
    console.log('Last Name:', this.lastName);
    console.log('Email:', this.email);
    console.log('Password:', this.password);
    console.log('Confirm Password:', this.confirmPassword);
  }
}
