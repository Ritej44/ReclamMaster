import { Component, OnInit } from '@angular/core';
import { Tache } from '../models/tache.model';
import { Intervenant } from '../models/intervenant.model';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import * as SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import { WebsocketService } from '../websocket.service';

@Component({
  selector: 'app-affectation-intervenant',
  templateUrl: './affectation-intervenant.component.html',
  styleUrls: ['./affectation-intervenant.component.css']
})
export class AffectationIntervenantComponent implements OnInit {
  intervenants: Intervenant[] = [];
  reclamations: Tache[] = [];
  selectedIntervenant: string = '';
  selectedReclamation: string = '';
  socketClient: any = null;
  private notificationSubscription: any;

  constructor(private http: HttpClient,private toastr :ToastrService,private websocketService :WebsocketService,private authService :AuthService ,private router:Router) {
    this.getAllIntervenants();
    this.getAllReclamations();
  }
      intervenantArray : any[] = [];
      reclamationArray: any[] = [];
      name :string="";
      email:string="";
      currentIntervenantID = "";
  

      ngOnInit(): void {
        this.navigationHandler();
        this.initWebSocket();
      }
    
  private initWebSocket() {
    this.websocketService.connect(this.currentIntervenantID);
  }
    
  ngOnDestroy(): void {
    this.websocketService.disconnect();
  }
    
      private navigationHandler() {
        const LinkColor = document.querySelectorAll('.nav-link');
        LinkColor.forEach((link) => {
          if (window.location.href.endsWith(link.getAttribute('href')!)) {
            link.classList.add('active');
          }
          link.addEventListener('click', () => {
            LinkColor.forEach((l) => { l.classList.remove('active'); });
            link.classList.add('active');
          });
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
            this.currentIntervenantID=this.selectedIntervenant;
            console.log("ID de l'intervenant:", this.currentIntervenantID);
            this.initWebSocket();
            console.log(" remarque" ,this.initWebSocket() )
            // Réinitialiser les sélections
            this.selectedIntervenant = '';
            this.selectedReclamation = '';
          },
          error: (error) => {
        if (error.status === 409) { // Conflit (réclamation déjà en cours)
          this.toastr.warning(error.error); // Affiche le message du backend
        } else {
          this.toastr.error("Erreur lors de l'affectation");
          console.error("Erreur détaillée:", error);
        }
      }
    });
    }

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

    logout():void {
      this.authService.logout();
  
      this.router.navigate(['/login']);  }
  
    
}