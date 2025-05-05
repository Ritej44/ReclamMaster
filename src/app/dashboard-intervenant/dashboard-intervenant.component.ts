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
  avatar: string = '/assets/no img.png';


  constructor( private http:HttpClient, private authService: AuthService, private router: Router) {}
  
  getCurrentUser() {
    const currentUser = localStorage.getItem('currentUser');
    return currentUser ? JSON.parse(currentUser) : null;
  }
  
  ngOnInit() {
  this.currentUser = this.getCurrentUser();}

  

  notifications = [2,1];
  
  logout():void {
    this.authService.logout();

    this.router.navigate(['/login']);  }

  

}

