import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-historique-intervenant',
  templateUrl: './historique-intervenant.component.html',
  styleUrls: ['./historique-intervenant.component.css']
})
export class HistoriqueIntervenantComponent {
    filteredTaches: any =[];
  
    constructor(
      private http: HttpClient,
      private authService: AuthService,
      private router: Router,
      private toastr:ToastrService
    ) {
      this.getAllReclamations();
  
  
    }
  
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
    intervenantId: string = "";
    
    ngOnInit(): void {
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
    getAllReclamations() {
      this.http.get("http://localhost:8084/api/v1/reclamation/getAll")
        .subscribe((resultData: any) => {
          console.log(resultData);
          this.reclamationArray = resultData;
        });
    }
    
    
    filterByDate(date: string): void {
      if (date) {
        this.filteredTaches = this.reclamationArray.filter(tache => tache.dateCreation === date);
      } else {
        this.filteredTaches = this.reclamationArray; 
      }
      this.currentPage = 1;
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
  
  
    searchTaches(event: Event): void {
      const target = event.target as HTMLInputElement;
      const query = target.value;
      if (query) {
        this.filteredTaches = this.reclamationArray.filter(tache =>
          tache.nom.toLowerCase().includes(query.toLowerCase()) ||
          tache.description.toLowerCase().includes(query.toLowerCase())
        );
      } else {
        this.filteredTaches = this.reclamationArray; // Réinitialiser le filtre si aucun texte n'est saisi
      }
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
