import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-parametre',
  templateUrl: './parametre.component.html',
  styleUrls: ['./parametre.component.css']
})
export class ParametreComponent {

constructor(private authService:AuthService,private router:Router){}

  logout():void {
    this.authService.logout();

    this.router.navigate(['/login']);  }
}
