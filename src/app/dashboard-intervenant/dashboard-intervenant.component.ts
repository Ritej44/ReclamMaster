import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { Intervenant } from '../models/intervenant.model';

@Component({
  selector: 'app-dashboard-intervenant',
  templateUrl: './dashboard-intervenant.component.html',
  styleUrls: ['./dashboard-intervenant.component.css']
})
export class DashboardIntervenantComponent {
IntervenantArray : any[] = [];
  selectedIntervenant?: Intervenant;
  name :string="";
  currentUser: any;

  constructor( private http:HttpClient, private authService: AuthService, private router: Router) {}
  
  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      this.currentUser = this.authService.currentUserValue;

      // Ajoutez cette vérification de sécurité
      if (!this.currentUser) {
        console.error('User data is missing');
      }
    } else {
      console.error('User is not logged in');
    }
  
}
  userProfile = {
    name: 'Nom',
    email: 'mail@gmail.com',
    avatar: '/assets/no img.png',
  };

  notifications = [2,1];
  
  logout():void {
    this.authService.logout();

    this.router.navigate(['/login']);  }

  

}

