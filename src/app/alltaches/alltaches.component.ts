import { Component } from '@angular/core';
import { ClientService } from '../client.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { Inject } from '@angular/core';


@Component({
  selector: 'app-alltaches',
  templateUrl: './alltaches.component.html',
  styleUrls: ['./alltaches.component.css']
})
export class AlltachesComponent {
  selectedIntervenant: string = '';
  selectedReclamation: string = '';
  reclamationArray: any[] = [];
  showPopup = false;


  // Pour l'édition
  currentReclamationID = "";
  nom:string="";
  description: string = "";
  etat: string = "";
  remarque: string = "";
  categorie: string = "";
  urgence: string = "";
  dateCreation: string = "";
  clientId: string = "";
  intervenantId: string = "";

  constructor(
    private http: HttpClient,
    private clientService: ClientService,
    private authService: AuthService,
    private router: Router,
    public dialog: MatDialog
  ) {
    this.getAllReclamations();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  getAllReclamations() {
    this.http.get("http://localhost:8084/api/v1/reclamation/getAll")
      .subscribe((resultData: any) => {
        console.log(resultData);
        this.reclamationArray = resultData;
      });
  }

  setUpdate(data: any) {
    this.currentReclamationID = data.id;
    this.description = data.description;
    this.etat = data.etat;
    this.remarque = data.remarque;
    this.categorie = data.categorie;
    this.urgence = data.urgence;
    this.dateCreation = data.dateCreation;
    this.clientId = data.clientId;
    this.intervenantId = data.intervenantId;
  }

  UpdateRecords() {
    let bodyData = {
      description: this.description,
      etat: this.etat,
      remarque: this.remarque,
      categorie: this.categorie,
      urgence: this.urgence,
      dateCreation: this.dateCreation,
      clientId: this.clientId,
      intervenantId: this.intervenantId
    };
    
    this.http.put(`http://localhost:8084/api/v1/reclamation/edit/${this.currentReclamationID}`, 
      bodyData, { responseType: 'text' }).subscribe((resultData: any) => {
        console.log(resultData);
        alert("Réclamation mise à jour");
        this.getAllReclamations();
        this.resetForm();
      });
  }
  
  setDelete(data: any) {  
    this.http.delete(`http://localhost:8084/api/v1/reclamation/delete/${data.id}`, 
      { responseType: 'text' }).subscribe((resultData: any) => {
        console.log(resultData);
        alert("Réclamation supprimée");
      });
  }

   resetForm() {
    this.currentReclamationID = "";
    this.description = "";
    this.etat = "";
    this.remarque = "";
    this.categorie = "";
    this.urgence = "";
    this.dateCreation = "";
    this.clientId = "";
    this.intervenantId = "";
  }
  openEditPopup(reclamation: any): void {
    this.setUpdate(reclamation);
    this.showPopup = true;
  }

  closePopup(): void {
    this.showPopup = false;
    this.resetForm();
  }
}
