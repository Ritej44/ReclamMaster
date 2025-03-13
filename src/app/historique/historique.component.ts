import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { Tache, TacheService } from '../tache.service';
import { HttpClient } from '@angular/common/http';
import { CrudApiService } from '../crud-api.service';

@Component({
  selector: 'app-historique',
  templateUrl: './historique.component.html',
  styleUrls: ['./historique.component.css']
})

export class HistoriqueComponent implements OnInit {

  constructor(private http :HttpClient,private tacheService: TacheService,private authService:AuthService,private router:Router){}


  filteredTaches: Tache[] = [];
  Taches: Tache[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 5;

ngOnInit(): void {
  this.tacheService.getTaches().subscribe(data => {
    this.Taches = data;
  });
    this.filteredTaches = this.Taches;
  this.currentPage = 1;
}
filterByDate(date: string): void {
  if (date) {
    this.filteredTaches = this.Taches.filter(tache => tache.dueDate === date);
  } else {
    this.filteredTaches = this.Taches; // Réinitialiser le filtre si aucune date n'est sélectionnée
  }
  this.currentPage = 1; // Réinitialiser la page actuelle après le filtrage
}
exportAsCSV(): void {
  const csvRows = [];

  // Ajouter les en-têtes du CSV
  csvRows.push("Title,Description,Due Date,Status");

  // Ajouter les données des tâches
  this.filteredTaches.forEach(tache => {
    const row = `${tache.title},${tache.description},${tache.dueDate},${tache.status}`;
    csvRows.push(row);
  });

  // Convertir les lignes en une seule chaîne CSV
  const csvString = csvRows.join("\r\n");

  // Créer un blob à partir de la chaîne CSV
  const blob = new Blob([csvString], { type: 'text/csv' });

  // Créer un lien pour télécharger le fichier CSV
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.setAttribute('hidden', '');
  a.setAttribute('href', url);
  a.setAttribute('download', 'taches.csv');
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

addTache() {
  const newTache: Tache = { id: 0, title: 'Nouvelle Tâche', description: 'Description', dueDate: '2023-10-10', status: 'En attente' };
  this.tacheService.addTache(newTache).subscribe(response => {
    this.Taches.push(response);
  });
}
searchTaches(event: Event): void {
  const target = event.target as HTMLInputElement;
  const query = target.value;
  if (query) {
    this.filteredTaches = this.Taches.filter(tache =>
      tache.title.toLowerCase().includes(query.toLowerCase()) ||
      tache.description.toLowerCase().includes(query.toLowerCase())
    );
  } else {
    this.filteredTaches = this.Taches; // Réinitialiser le filtre si aucun texte n'est saisi
  }
}
get paginatedTaches(): Tache[] {
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
    logout():void {
      this.authService.logout();
  
      this.router.navigate(['/login']);  }
    




}