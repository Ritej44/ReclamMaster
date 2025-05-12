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
        this.http.get(`http://localhost:8084/api/user/search/name/${searchTerm}`, { responseType: 'json' })
          .subscribe({
            next: (resultData: any) => {
              console.log(resultData);
    
              // Vérifiez si la réponse est un tableau
              if (Array.isArray(resultData)) {
                this.intervenantArray = resultData;
              } else {
                // Si la réponse est un objet unique, convertissez-le en tableau
                this.intervenantArray = [resultData];
              }
            },
            error: (error) => {
              console.error('Error searching intervenants:', error);
              this.toastr.error('Erreur lors de la recherche des intervenants');
              // En cas d'erreur, assurez-vous que intervenantArray est un tableau vide
              this.intervenantArray = [];
            }
          });
      }
    }
    
    
    
  logout():void {
    this.authService.logout();

    this.router.navigate(['/login']);  }

  
  getAllIntervenants() {
    this.http.get("http://localhost:8084/api/user/intervenant/getAll")
    .subscribe((resultData: any)=>{
      console.log(resultData);
      this.intervenantArray = resultData;
  }); }


  
  
  emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  validateEmail() {
    if (this.email && !this.emailRegex.test(this.email)) {
      this.toastr.error('Veuillez entrer un email valide.');
    }
  }
 
  validateFields(): boolean {
    if (!this.name) {
      this.toastr.error('Le nom est requis');
      return false;
    }
    if (!this.email) {
      this.toastr.error('L\'email est requis');
      return false;
    }
    if (!this.password) {
      this.toastr.error('Le mot de passe est requis');
      return false;
    }
    if (!this.role) {
      this.toastr.error('Le rôle est requis');
      return false;
    }
    return true;
  }
  register()
  {
    if (!this.validateFields()) {
      return;
    }
  
    let bodyData = {
      "name" : this.name,
      "email" : this.email,
      "password" : this.password,
      "role":this.role
    };
    this.http.post("http://localhost:8084/api/user/create",bodyData,{responseType: 'text'}).subscribe((resultData: any)=>
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
    
    this.http.put("http://localhost:8084/api/user/editIntervenant"+ "/" + this.currentIntervenantID ,
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
      this.http.delete(`http://localhost:8084/api/user/delete/${data.id}`,
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
