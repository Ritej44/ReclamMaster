import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-historique',
  templateUrl: './historique.component.html',
  styleUrls: ['./historique.component.css']
})
export class HistoriqueComponent implements OnInit {
  filteredTaches: any =[];

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router,private toastr :ToastrService
  ) {
    this.getAllReclamations();


  }

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
  nameClient:string="";
  
  ngOnInit(): void {
    const currentUser = this.authService.getCurrentUser();
    
    if (!currentUser || !currentUser.name) {
      this.toastr.error("Utilisateur non authentifié");
      return;
    }
    
    this.nameClient = currentUser.name;
    console.log('NameClient set to:', this.nameClient);
    this.getAllReclamations();
  }
   

  getAllReclamations() {
    if (!this.nameClient) {
      console.error('nameClient is empty!');
      return;
    }

    const encodedName = encodeURIComponent(this.nameClient);
    this.http.get(`http://localhost:8084/api/v1/reclamation/client/${encodedName}`)
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
  /*
  getAllReclamations() {
    const currentUser = this.authService.getCurrentUser();
  if (!currentUser || !currentUser.id) {
    console.error('Utilisateur non connecté ou ID manquant');
    return;
  }

    this.http.get(`http://localhost:8084/api/v1/reclamation/client/${this.currentUser.id}`)
      .subscribe((resultData: any) => {
        console.log(resultData);
        this.reclamationArray = resultData;
        this.Taches = resultData; // Initialise aussi Taches pour les filtres
        this.filteredTaches = [...this.Taches]; // Copie pour les filtres
      }, error => {
        console.error('Erreur lors de la récupération des réclamations', error);
      });
  }*/
  
  filterByDate(date: string): void {
    if (date) {
      this.filteredTaches = this.reclamationArray.filter(tache => tache.dateCreation === date);
    } else {
      this.filteredTaches = this.reclamationArray; 
    }
    this.currentPage = 1;
  }

  addTache():void{
    this.router.navigate(['/taches']);
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