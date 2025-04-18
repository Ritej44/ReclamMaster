import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { ToastrService } from 'ngx-toastr';
import { error } from 'console';

@Component({
  selector: 'app-listeintervenant',
  templateUrl: './listeintervenant.component.html',
  styleUrls: ['./listeintervenant.component.css']
})
export class ListeintervenantComponent {
  
searchResults:any[]=[];
showEditPopup: boolean = false;
showAddPopup: boolean = false;
  intervenantArray : any[] = [];
  name :string="";
  email:string="";
  password:string="";
  role:string="";
  currentIntervenantID = "";

  constructor(private http: HttpClient,private authService :AuthService ,private toastr:ToastrService,private router:Router) {
    this.getAllIntervenants();}

    searchIntervenants(event: Event) {
      const searchTerm = (event.target as HTMLInputElement).value;
  
      if (searchTerm.trim() === '') {
        this.getAllIntervenants();
      } else {
        this.http.get(`http://localhost:8084/api/v1/Clients/search/name/${searchTerm}`, { responseType: 'json' })
          .subscribe({
            next: (resultData: any) => {
              console.log(resultData);
              this.intervenantArray = resultData; 
            },
            error: (error) => {
              console.error('Error searching intervenants:', error);
              this.toastr.error('Erreur lors de la recherche des clients');
            }
          });
      }
    }
    
  logout():void {
    this.authService.logout();

    this.router.navigate(['/login']);  }

  
  getAllIntervenants() {
    this.http.get("http://localhost:8084/api/v1/intervenant/getAll")
    .subscribe((resultData: any)=>{
      console.log(resultData);
      this.intervenantArray = resultData;
  }); }


  
  register()
  {
    let bodyData = {
      "name" : this.name,
      "email" : this.email,
      "password" : this.password,
      "role":this.role
    };
    this.http.post("http://localhost:8084/api/v1/intervenant/create",bodyData,{responseType: 'text'}).subscribe((resultData: any)=>
    {
        console.log(resultData);
        this.toastr.success("Intervenant inscrie avec succès");
    });
  }

  
  setUpdate(data: any)
  {
   this.name = data.name;
   this.email=data.email;
   this.password=data.password;
   this.role=data.role;
   this.currentIntervenantID = data.id;
  
  }
  
  UpdateRecords()
  {
    let bodyData = {
      "name" : this.name,
      "email":this.email,
      "role":this.role
    };
    
    this.http.put("http://localhost:8084/api/v1/intervenant/edit"+ "/" + this.currentIntervenantID ,
       bodyData,{responseType: 'text'}).subscribe((resultData: any)=>
    {
        console.log(resultData);
        this.toastr.success("Intervenant mise à jour avec succès")
        this.getAllIntervenants();
    });
  }
  
  resetForm() {
    this.currentIntervenantID="";
    this.name = "";
    this.email=""
    this.password = "";
    this.role  = "";  
  }
  openAjoutPopup() {
    this.resetForm();
    this.showAddPopup = true;
  }
  openEditPopup(intervenant: any): void {
    this.setUpdate(intervenant);
    this.showEditPopup = true;
  }

  closePopups() {
    this.showEditPopup = false;
    this.showAddPopup = false;
  
  }
 
  
  setDelete(data: any)
  {  
    if (confirm('Êtes-vous sûr de vouloir supprimer cet intervenant ?')) {
      this.http.delete(`http://localhost:8084/api/v1/intervenant/delete/${data.id}`,
        { responseType: 'text' }).subscribe({
          next: (resultData: any) => {  
        console.log(resultData);
        this.toastr.success("Intervenant supprimé avec succès");
        this.getAllIntervenants();
    },
    error:(error)=>{
      console.error('Erreur lors de la suppression :',error);
      this.toastr.error('Echec de la suppression de intervenant','Erreur');
    }
    });
  }
}

}
