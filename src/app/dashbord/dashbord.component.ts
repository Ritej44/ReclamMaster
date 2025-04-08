
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

  constructor( private http:HttpClient, private authService: AuthService, private router: Router) {}
  
  ngOnInit() {

    let bodyData={
      "name":this.name
    };
    this.http.get("http://localhost:8084/api/v1/Clients/getName").subscribe((response: any) => {
      this.name = response.name;
     
      
    });
  
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

