import { Component, OnInit } from '@angular/core';
import { Tache } from '../models/tache.model';
import { Intervenant } from '../models/intervenant.model';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-affectation-intervenant',
  templateUrl: './affectation-intervenant.component.html',
  styleUrls: ['./affectation-intervenant.component.css']
})
export class AffectationIntervenantComponent  {
  intervenants: Intervenant[] = [];
  reclamations: Tache[] = [];
  selectedIntervenant: string = '';
  selectedReclamation: string = '';

  constructor(private http: HttpClient,private toastr :ToastrService,private authService :AuthService ,private router:Router) {
    this.getAllIntervenants();
    this.getAllReclamations();
  }
      intervenantArray : any[] = [];
      reclamationArray: any[] = [];
      name :string="";
      email:string="";
      currentIntervenantID = "";
  
      logout():void {
        this.authService.logout();
    
        this.router.navigate(['/login']);  }
    
      
      getAllIntervenants() {
        this.http.get("http://localhost:8084/api/user/intervenant/getAll")
        .subscribe((resultData: any)=>{
          console.log(resultData);
          this.intervenantArray = resultData;
      }); }

      getAllReclamations() {
        this.http.get("http://localhost:8084/api/v1/reclamation/getAll")
          .subscribe((resultData: any) => {
            console.log(resultData);
            this.reclamationArray = resultData;
          });
      }

      affecterIntervenant() {
        if (!this.selectedIntervenant || !this.selectedReclamation) {
          this.toastr.warning("Veuillez sélectionner un intervenant et une réclamation");
          return;
        }
        console.log("ID Intervenant:", this.selectedIntervenant); // <-- Vérifiez ceci
        console.log("ID Réclamation:", this.selectedReclamation);
    
        const bodyData = {
          intervenantId: this.selectedIntervenant,
          reclamationId: this.selectedReclamation
        };
    
        this.http.post("http://localhost:8084/api/v1/affectation/create", bodyData)
          .subscribe({
            next: (resultData: any) => {
              console.log(resultData);
              this.toastr.success("Intervenant affecté avec succès");
              // Réinitialiser les sélections
              this.selectedIntervenant = '';
              this.selectedReclamation = '';
            },
            error: (error) => {
              this.toastr.error("Erreur lors de l'affectation");
                console.error("Erreur détaillée:", error); // Afficher l'erreur complète
              
            }
          });
      }
      
      
/*
  loadIntervenants(): void {
    this.affectationService.getIntervenants().subscribe(data => {
      this.intervenants = data;
    });
  }

  loadReclamations(): void {
    this.affectationService.getReclamations().subscribe(data => {
      this.reclamations = data;
    });
  }

  affecterIntervenant(reclamation: Tache, intervenant: Intervenant): void {
    this.affectationService.affecterIntervenant(reclamation.id, intervenant.id).subscribe(updatedReclamation => {
      // Mettre à jour la réclamation dans la liste
      const index = this.reclamations.findIndex(r => r.id === updatedReclamation.id);
      if (index !== -1) {
        this.reclamations[index] = updatedReclamation;
      }
    });
  }*/

}