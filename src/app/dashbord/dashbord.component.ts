
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';
import { Client } from '../models/Client.model';
@Component({
  selector: 'app-dashbord',
  templateUrl: './dashbord.component.html',
  styleUrls: ['./dashbord.component.css'],
})
export class DashbordComponent {
  ClientsArray : any[] = [];
  selectedClient?: Client;
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
    avatar: 'assets/isra.jpg',
  };

  notifications = [2,1];
  
  logout():void {
    this.authService.logout();

    this.router.navigate(['/login']);  }

  

}

