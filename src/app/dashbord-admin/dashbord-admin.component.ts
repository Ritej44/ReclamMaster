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
    avatar: 'assets/isra.jpg',
  };

  stats = {
    totalProducts: 5483,
    orders: 2859,
    totalStock: 5483,
    outOfStock: 38,
  };

  notifications = [2,1];
  isDarkMode = false;
  
  logout():void {
    this.authService.logout();

    this.router.navigate(['/login']);  }

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    console.log('Dark mode state:', this.isDarkMode); 
    if (this.isDarkMode) {
        document.body.classList.add('dark-mode');
    } else {
        document.body.classList.remove('dark-mode');

    }

  }

}
