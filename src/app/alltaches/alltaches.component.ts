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


  searchResults:any[]=[];
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
      this.http.get(`http://localhost:8084/api/v1/reclamations/search/name/${searchTerm}`, { responseType: 'json' })
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
 
  getAllReclamations() {
    this.http.get("http://localhost:8084/api/v1/reclamation/getAll")
      .subscribe((resultData: any) => {
        console.log(resultData);
        this.reclamationArray = resultData;
      });
  }
  register(){
    let bodyData={
      nom:this.nom,
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
    let bodyData = {
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
