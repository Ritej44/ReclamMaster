import { Component, OnInit } from '@angular/core';
import { AffectationService } from '../affectation.service';
import { Tache } from '../models/tache.model';
import { Intervenant } from '../models/intervenant.model';
import { ClientService } from '../client.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

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

  constructor(private affectationService: AffectationService, private http: HttpClient ,private clientService: ClientService ,private authService :AuthService ,private router:Router) {
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
        this.http.get("http://localhost:8084/api/v1/intervenant/getAll")
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
          alert("Veuillez sélectionner un intervenant et une réclamation");
          return;
        }
    
        const bodyData = {
          intervenantId: this.selectedIntervenant,
          reclamationId: this.selectedReclamation
        };
    
        this.http.post("http://localhost:8084/api/v1/affectation/create", bodyData)
          .subscribe({
            next: (resultData: any) => {
              console.log(resultData);
              alert("Intervenant affecté avec succès");
              // Réinitialiser les sélections
              this.selectedIntervenant = '';
              this.selectedReclamation = '';
            },
            error: (error) => {
              alert("Erreur lors de l'affectation");
            }
          });
      }
      
      
    setUpdate(data: any)
    {
     this.name = data.name;
     this.email=data.email;
     this.currentIntervenantID = data._id;
     
    }
    UpdateRecords()
    {
      let bodyData = {
       
        "name" : this.name,
        "email":this.email,
      };
      
      this.http.put("http://localhost:8084/api/v1/intervenant/edit"+ "/" + this.currentIntervenantID ,
         bodyData,{responseType: 'text'}).subscribe((resultData: any)=>
      {
          console.log(resultData);
          alert("Intervenant Registered Updateddd")
          this.getAllIntervenants();
   
          this.name = "";
          this.email=""
      });
    }
   
    
    setDelete(data: any)
    {  
      this.http.delete("http://localhost:8084/api/v1/intervenant/delete"+ "/"+ data._id,{responseType: 'text'}).subscribe((resultData: any)=>
      {
          console.log(resultData);
          alert("Intervenant Deleted")
          this.getAllIntervenants();
   
          this.name = "";
          this.email="";
      });
    }


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

  /*affecterIntervenant(reclamation: Tache, intervenant: Intervenant): void {
    this.affectationService.affecterIntervenant(reclamation.id, intervenant.id).subscribe(updatedReclamation => {
      // Mettre à jour la réclamation dans la liste
      const index = this.reclamations.findIndex(r => r.id === updatedReclamation.id);
      if (index !== -1) {
        this.reclamations[index] = updatedReclamation;
      }
    });
  }*/

}