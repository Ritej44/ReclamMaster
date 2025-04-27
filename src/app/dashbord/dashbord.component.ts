
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';
import { Client } from '../models/Client.model';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-dashbord',
  templateUrl: './dashbord.component.html',
  styleUrls: ['./dashbord.component.css'],
})
export class DashbordComponent {
  ClientsArray : any[] = [];
  selectedClient?: Client;
  name :string="";
  currentClient: any;
  private apiUrl = 'http://localhost:8084/api/v1/Clients';
  clientName!: string;


  constructor( private http:HttpClient, private authService: AuthService, private router: Router) {}
  
  ngOnInit() {
    
   
    this.http.get('http://localhost:8084/api/v1/Clients/current', {
      withCredentials: true  // This sends cookies/auth headers
    }).subscribe(
      response => console.log(response),
      error => console.error(error)
    );
   
}

userProfile = {
  name: 'Nom',
  firstName: 'Prénom',
  email: 'mail@gmail.com',
  avatar: '/assets/no img.png',
};
  notifications = [2,1];
  
  logout():void {
    this.authService.logout();

    this.router.navigate(['/login']);  }

  
  

}

