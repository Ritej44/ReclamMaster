import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashbord-admin',
  templateUrl: './dashbord-admin.component.html',
  styleUrls: ['./dashbord-admin.component.css']
})
export class DashbordAdminComponent {

constructor(private authService :AuthService ,private router:Router){}  
  userProfile = {
    name: 'Nom',
    firstName: 'Prénom',
    email: 'mail@gmail.com',
    avatar: '/assets/no img.png',
  };

  stats = {
    totalProducts: 5483,
    orders: 2859,
    totalStock: 5483,
    outOfStock: 38,
  };

  notifications = [2,1];
  

  logout():void {
    this.authService.logout();

    this.router.navigate(['/login']);  }


    
    

  }


