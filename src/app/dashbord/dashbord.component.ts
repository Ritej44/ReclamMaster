
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashbord',
  templateUrl: './dashbord.component.html',
  styleUrls: ['./dashbord.component.css'],
})

export class DashbordComponent implements OnInit {
  ClientsArray : any[] = [];
  name :string="";
  currentUser: any ;
  clientName!: string;



  constructor( private http:HttpClient, private authService: AuthService, private router: Router) {}

  
  getCurrentUser() {
    const currentUser = localStorage.getItem('currentUser');
    return currentUser ? JSON.parse(currentUser) : null;
  }
  ngOnInit() {
  this.currentUser =this.getCurrentUser();
}


  avatar: string = '/assets/no img.png';
  notifications = [2,1];
  
  logout():void {
    this.authService.logout();
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);  }

  
  

}

