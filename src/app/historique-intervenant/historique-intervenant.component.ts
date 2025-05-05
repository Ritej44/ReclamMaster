import { HttpClient, HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup } from '@angular/forms';
import { formatDate } from '@angular/common';
import { catchError, Observable, of, tap } from 'rxjs';

@Component({
  selector: 'app-historique-intervenant',
  templateUrl: './historique-intervenant.component.html',
  styleUrls: ['./historique-intervenant.component.css']
})
export class HistoriqueIntervenantComponent {

    filteredTaches: any =[];
  currentUser: any;
  
    constructor(
      private http: HttpClient,
      private authService: AuthService,
      private router: Router,
      private toastr:ToastrService,
    ) {
  
  
    }
  
    intervenantNoms: string = "";
    showEditPopup:boolean=false;
    reclamationArray:any[]=[];
    currentPage: number = 1;
    itemsPerPage: number = 5;
    currentReclamationID = "";
    nom:string="";
    description: string = "";
    etat: string = "";
    remarque: string = "";
    urgence: string = "";
    dateCreation: string = "";
    clientId: string = "";
    intervenantId:  string ="";
    dateFin : string="";
           
    
    ngOnInit(): void {
      const currentUser = this.authService.getCurrentUser();

      if (!currentUser || !currentUser.name) {
        this.toastr.error("Utilisateur non authentifié");
        return;
      }this.intervenantNoms = currentUser.name.toString().trim();
      console.log('Nom de l\'intervenant:', this.intervenantNoms);
      
      const encodedName = encodeURIComponent(this.intervenantNoms);
      this.http.get(`http://localhost:8084/api/user/${encodedName}/id`, { responseType: 'text' })
        .subscribe({
          next: (response) => {
            this.intervenantId = response.trim(); 
            console.log('ID de l\'intervenant:', this.intervenantId);
            
            if (!this.intervenantId) {
              this.toastr.error("ID de l'intervenant non trouvé");
              return;
            }
            
            this.getAllReclamations();
          },
          error: (error) => {
            console.error('Erreur complète:', {
              status: error.status,
              message: error.message,
              url: error.url,
              error: error.error
            });
            
          }
        });

        console.log('ID de l\'intervenant:', this.intervenantId);
    }




    getAllReclamations() {
      this.http.get(`http://localhost:8084/api/v1/reclamation/intervenant/${this.intervenantId}`)
        .subscribe({
          next: (resultData: any) => {
            console.log('API Response:', resultData);
            this.reclamationArray = resultData;
          },
          error: (error) => {
            console.error('API Error:', error);
            this.toastr.error("Erreur lors de la récupération des réclamations");
          }
        });
    
  }
    
  
    filterByDate( endDate: string) {
      const params = new HttpParams()
        .set('endDate', endDate);
    
      this.http.get<any[]>(`http://localhost:8084/api/v1/reclamation/filter`, { params })
        .subscribe(reclamations => {
          this.reclamationArray = reclamations;
        });
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


  
    openEditPopup(reclamation: any): void {
      this.setUpdate(reclamation);
      this.showEditPopup = true;
    }
  
    closePopup(): void {
      this.showEditPopup = false;
      this.resetForm();
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
      this.dateFin=data.dateFin;
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
        intervenantId: this.intervenantId,
        dateFin:this.dateFin
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
      this.dateFin="";
    }



    
  
    
    exportAsCSV(): void {
      if (this.filteredTaches.length === 0) {
        alert('Aucune donnée à exporter');
        return;
      }
  
      const csvRows = [];
      
      // Ajouter les en-têtes du CSV
      const headers = ['Nom', 'Description', 'État', 'Remarque', 'Intervenant ID', 'Client ID', 'Urgence', 'Date de Création'];
      csvRows.push(headers.join(','));
  
      // Ajouter les données des tâches
      this.filteredTaches.forEach((tache: { nom: any; description: any; etat: any; remarque: any; intervenantId: any; clientId: any; urgence: any; dateCreation: any; }) => {
        const row = [
          `"${tache.nom || ''}"`,
          `"${tache.description || ''}"`,
          `"${tache.etat || ''}"`,
          `"${tache.remarque || ''}"`,
          `"${tache.intervenantId || ''}"`,
          `"${tache.clientId || ''}"`,
          `"${tache.urgence || ''}"`,
          `"${tache.dateCreation || ''}"`
        ];
        csvRows.push(row.join(','));
      });
  
      // Convertir les lignes en une seule chaîne CSV
      const csvString = csvRows.join("\r\n");
  
      // Créer et télécharger le fichier
      const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', 'taches.csv');
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  
    get paginatedTaches(): any[] {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      return this.filteredTaches.slice(startIndex, startIndex + this.itemsPerPage);
    }
  
    get totalPages(): number {
      return Math.ceil(this.filteredTaches.length / this.itemsPerPage);
    }
  
    previousPage(): void {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    }
  
    nextPage(): void {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    }
  
    logout(): void {
      this.authService.logout();
      this.router.navigate(['/login']);
    }
  }
