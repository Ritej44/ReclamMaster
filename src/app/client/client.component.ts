import { Component, OnInit } from '@angular/core';
import { Client } from '../models/Client.model';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent  {
  searchResults: any[] = [];


showEditPopup: boolean = false;
showAddPopup: boolean = false;
    ClientsArray : any[] = [];
    name :string="";
    email:string="";
    password:string="";
    role:string="";
    currentClientID = "";

    logout():void {
      this.authService.logout();
  
      this.router.navigate(['/login']);  }
  
    
    constructor(private http: HttpClient ,private toastr:ToastrService,private authService :AuthService ,private router:Router){
         this.getAllClients();
    }
    
  searchClients(event: Event) { 
    const searchTerm = (event.target as HTMLInputElement).value;
   
   if (searchTerm.trim() === '') {
     this.getAllClients();
   } else {
     this.http.get(`http://localhost:8084/api/user/search/name/${searchTerm}`, { responseType: 'json' })
       .subscribe({
         next: (resultData: any) => {
           console.log(resultData);
 
           // Vérifiez si la réponse est un tableau
           if (Array.isArray(resultData)) {
             this.ClientsArray = resultData;
           } else {
             this.ClientsArray = [resultData];
           }
         },
         error: (error) => {
           console.error('Error searching intervenants:', error);
           this.toastr.error('Erreur lors de la recherche des Clients');

           this.ClientsArray = [];
         }
       });
   }
 }
 
    
    getAllClients() {
      this.http.get("http://localhost:8084/api/user/client/getAll")
      .subscribe((resultData: any)=>{
        console.log(resultData);
        this.ClientsArray = resultData;
    });
      
  
    }
  
    register()
    {
      let bodyData = {
        "name" : this.name,
        "email" : this.email,
        "password" : this.password,
        "role":this.role
      };
      this.http.post("http://localhost:8084/api/v1/Clients/create",bodyData,{responseType: 'text'}).subscribe((resultData: any)=>
      {
          console.log(resultData);
          this.toastr.success("Client inscrie avec success");
      });
    }
  
      
  
  
    setUpdate(data: any)
    {
     this.name = data.name;
     this.email=data.email;
     this.password = data.password;
     this.role = data.role;
     this.currentClientID = data.id;
     
    }
  
      UpdateRecords(){
      let bodyData = {
        "name" : this.name,
        "email":this.email,
        "role" : this.role
      };
      
      this.http.put(`http://localhost:8084/api/user/editClient/${this.currentClientID} `,
         bodyData,{responseType: 'text'}).subscribe((resultData: any)=>
      {
          console.log(resultData);
          this.toastr.success("Client mise à jour avec succes")
          this.getAllClients();
          this.resetForm();

      });
    }
  resetForm() {
    this.currentClientID="";
    this.name = "";
    this.email=""
    this.password = "";
    this.role  = "";  
  }
   
    

    
    openAjoutPopup() {
      this.resetForm();
      this.showAddPopup = true;
    }
    openEditPopup(ClientItem: any): void {
      this.setUpdate(ClientItem);
      this.showEditPopup = true;
    }
  
    closePopups() {
      this.showEditPopup = false;
      this.showAddPopup = false;
    
    }
     

    
    setDelete(data: any) {
      if (confirm('Êtes-vous sûr de vouloir supprimer ce client ?')) {
        this.http.delete(`http://localhost:8084/api/user/delete/${data.id}`, 
          { responseType: 'text' }).subscribe({
            next: (resultData: any) => {
              console.log(resultData);
              this.currentClientID = data.id;
              console.log(this.currentClientID);
              this.toastr.success('Client supprimé avec succès');
              
              this.getAllClients(); 
            },
            error: (error) => {
              console.error('Erreur lors de la suppression:', error);
              this.toastr.error('Échec de la suppression du client', 'Erreur');
            }
          });
      }
    }
  
}

