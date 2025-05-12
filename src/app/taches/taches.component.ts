import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-taches',
  templateUrl: './taches.component.html',
  styleUrls: ['./taches.component.css']
})
export class TachesComponent  {
  nameClient:string="";
  description:string="";
  remarque:string="";
  nom:string="";
  etat:string="";
  urgence:string="";
  creation: string = new Date().toISOString().split('T')[0];
  clientId:string="";
  reclamationsArray: any[] = [];
  currentReclamationId: string = "";


     constructor(private http :HttpClient,private toastr :ToastrService,private authService: AuthService,private router: Router)
   { }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
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
    if (!this.creation) {
      this.toastr.error('La date de création est requise');
      return false;
    }
    
    if (!this.remarque) {
      this.toastr.error('La remarque est requis');
      return false;
    }
    
    return true;
  }  
  createReclamation() {
    if (!this.validateFields()){
      return;
    }
    const creation = new Date(this.creation).toISOString();

    let bodyData={
      "nameClient":this.nameClient,
      "nom":this.nom,
      "description":this.description,
      "etat":this.etat,
      "remarque":this.remarque,
      "urgence":this.urgence,
      "dateCreation": this.creation,
        };
      this.http.post("http://localhost:8084/api/v1/reclamation/create", bodyData).subscribe({
        next: (resultData: any) => {
          console.log(resultData);
          this.toastr.success("Réclamation créée avec succès");
          this.resetForm();
        },
        error: (error) => {
          console.error('Error:', error);
          this.toastr.error("Erreur lors de la création de la réclamation");
        }
      });
  }

  resetForm() {
    this.nameClient="";
    this.description = "";
    this.remarque = "";
    this.nom = "";
    this.etat = "";
    this.urgence = "";
    this.creation = new Date().toISOString().split('T')[0];
  }
}
