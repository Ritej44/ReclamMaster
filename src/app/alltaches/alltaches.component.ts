import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-alltaches',
  templateUrl: './alltaches.component.html',
  styleUrls: ['./alltaches.component.css']
})
export class AlltachesComponent {

  
  selectedIntervenant: string = '';
  selectedReclamation: string = '';
  reclamationArray: any[] = [];
  clientNom:  {[id: string]: string} = {};
  showEditPopup: boolean =false;
  showAddPopup: boolean = false;
  currentReclamationID = "";
  nom:string="";
  description: string = "";
  etat: string = "";
  remarque: string = "";
  urgence: string = "";
  dateCreation: string = "";
  clientId: string = "";
  intervenantId: string = "";
  intervenantNoms: {[id: string]: string} = {};
  nameClient:string="";
  dateFin:string="";

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router,
    public dialog: MatDialog,
    private toastr :ToastrService
  ) {
    this.getAllReclamations();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
 

  searchReclamations(event: Event) {
    const searchTerm = (event.target as HTMLInputElement).value;

    if (searchTerm.trim() === '') {
      this.getAllReclamations();
    } else {
      this.http.get(`http://localhost:8084/api/v1/reclamation/search/name/${searchTerm}`, { responseType: 'json' })
        .subscribe({
          next: (resultData: any) => {
            console.log(resultData);
            this.reclamationArray = resultData; 
          },
          error: (error) => {
            console.error('Error searching intervenants:', error);
            this.toastr.error('Erreur lors de la recherche du reclamation');
          }
        });
    }
  }

  
  getClientNom(clientId: string) {
    if (!clientId) return; 
    
    this.http.get(`http://localhost:8084/api/user/${clientId}/name`, { 
      responseType: 'text' 
    }).subscribe({
      next: (name) => {
        this.clientNom[clientId] = name;
      },
      error: (err) => {
        console.error('Erreur lors de la récupération du nom:', err);
        this.clientNom[clientId] = 'Inconnu'; 
      }
    });
  }
  getIntervenantNom(intervenantId: string) {
    if (!intervenantId) return; 
    
    this.http.get(`http://localhost:8084/api/user/${intervenantId}/name`, { 
      responseType: 'text' 
    }).subscribe({
      next: (name) => {
        this.intervenantNoms[intervenantId] = name;
      },
      error: (err) => {
        console.error('Erreur lors de la récupération du nom:', err);
        this.intervenantNoms[intervenantId] = 'Inconnu'; 
      }
    });
  }
  getAllReclamations() {
    this.http.get("http://localhost:8084/api/v1/reclamation/getAll")
      .subscribe((resultData: any) => {
        console.log(resultData);
        this.reclamationArray = resultData;
        
        this.reclamationArray.forEach(reclamation => {
          if (reclamation.intervenantId) {
            this.getIntervenantNom(reclamation.intervenantId);
          }
        });
      });
  }
  

  validateFields(): boolean {
    if (!this.nom) {
      this.toastr.error('Le nom est requis');
      return false;
    }
    if(!this.nameClient) {
      this.toastr.error('Le nom du client est requis');
      return false;
    }
    
    if (!this.description) {
      this.toastr.error('La description est requis');
      return false;
    }
    if (!this.etat) {
      this.toastr.error('L\'etat est requis');
      return false;
    }
    if (!this.urgence) {
      this.toastr.error('L\'urgence est requis');
      return false;
    }
    if (!this.dateCreation) {
      this.toastr.error('La date de création est requise');
      return false;
    }
    
    if (!this.remarque) {
      this.toastr.error('La remarque est requis');
      return false;
    }
    
    return true;
  }  
  
  register(){
    if (!this.validateFields()){
      return;
    }
    let bodyData={
      nom:this.nom,
      nameClient:this.nameClient,
      description: this.description,
      etat: this.etat,
      remarque: this.remarque,
      urgence: this.urgence,
      dateCreation: this.dateCreation,
      clientId: this.clientId,
      intervenantId: this.intervenantId
    };
    this.http.post("http://localhost:8084/api/v1/reclamations/create",bodyData,{responseType: 'text'}).subscribe((resultData: any)=>
      {
          console.log(resultData);
          this.toastr.success("reclamation crée avec succès");
      });
  }

  setUpdate(data: any) {
    this.nameClient=this.nameClient;
    this.currentReclamationID = data.id;
    this.nom=data.nom
    this.description = data.description;
    this.etat = data.etat;
    this.remarque = data.remarque;
    this.urgence = data.urgence;
    this.dateCreation = data.dateCreation;
    this.clientId = data.clientId;
    this.intervenantId = data.intervenantId;
  }

  UpdateRecords() {
    if (!this.validateFields()) {
      return;
    }
    let bodyData = {
      nameClient:this.nameClient,
      nom:this.nom,
      description: this.description,
      etat: this.etat,
      remarque: this.remarque,
      urgence: this.urgence,
      dateCreation: this.dateCreation,
      clientId: this.clientId,
      intervenantId: this.intervenantId
    };
    
    this.http.put(`http://localhost:8084/api/v1/reclamation/edit/${this.currentReclamationID}`, 
      bodyData, { responseType: 'text' }).subscribe((resultData: any) => {
        console.log(resultData);
        this.toastr.success("Réclamation mise à jour");
        this.getAllReclamations();
        this.resetForm();
      });
  }
  
  setDelete(data: any) { 
    if (confirm('Êtes-vous sûr de vouloir supprimer cette réclamation ?')) { 
    this.http.delete(`http://localhost:8084/api/v1/reclamation/delete/${data.id}`, 
      { responseType: 'text' }).subscribe((resultData: any) => {
        console.log(resultData);
        this.toastr.warning("Réclamation supprimée avec succès");
         
        this.getAllReclamations(); 
      
      
      });
    }   
  }

   resetForm() {
    this.currentReclamationID = "";
    this.nameClient="";
    this.nom="";
    this.description = "";
    this.etat = "";
    this.remarque = "";
    this.urgence = "";
    this.dateCreation = "";
    this.clientId = "";
    this.intervenantId = "";
  }
  openAjoutPopup(){
    this.resetForm();
    this.showAddPopup=true;
  }
  openEditPopup(reclamation: any): void {
    this.setUpdate(reclamation);
    this.showEditPopup = true;
  }

  closePopup(): void {
    this.showEditPopup = false;
    this.showAddPopup=false;
    this.resetForm();
  }
}
