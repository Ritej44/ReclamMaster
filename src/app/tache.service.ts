import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Observable } from 'rxjs/internal/Observable';


export interface Tache {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  status: string;
}

@Injectable({
  providedIn: 'root'
})
export class TacheService {
  
  private taches: Tache[] = [
    { id: 1, title: 'Tâche 1', description: 'Description de la tâche 1', dueDate: '2024-10-01', status: 'En cours' },
    { id: 2, title: 'Tâche 2', description: 'Description de la tâche 2', dueDate: '2025-01-15', status: 'Terminé' },
    { id: 3, title: 'Tâche 3', description: 'Description de la tâche 3', dueDate: '2023-11-20', status: 'En attente' },
    { id: 4, title: 'Tâche 4', description: 'Description de la tâche 4', dueDate: '2024-05-10', status: 'En cours' },
    { id: 5, title: 'Tâche 5', description: 'Description de la tâche 5', dueDate: '2024-08-25', status: 'Terminé' },
    {id: 6, title: 'Tâche 6', description: 'Description de la tâche 1', dueDate: '2024-10-01', status: 'En cours' },
    { id: 7, title: 'Tâche 7', description: 'Description de la tâche 2', dueDate: '2025-01-15', status: 'Terminé' },
    { id: 8, title: 'Tâche 8', description: 'Description de la tâche 3', dueDate: '2023-11-20', status: 'En attente' },
    { id: 9, title: 'Tâche 9', description: 'Description de la tâche 4', dueDate: '2024-05-10', status: 'En cours' },
    { id: 10, title: 'Tâche 10', description: 'Description de la tâche 5', dueDate: '2024-08-25', status: 'Terminé' },
    {id: 11, title: 'Tâche 11', description: 'Description de la tâche 1', dueDate: '2024-10-01', status: 'En cours' },
    { id: 12, title: 'Tâche 12', description: 'Description de la tâche 2', dueDate: '2025-01-15', status: 'Terminé' },
    { id: 13, title: 'Tâche 13', description: 'Description de la tâche 3', dueDate: '2023-11-20', status: 'En attente' },
    { id: 14, title: 'Tâche 14', description: 'Description de la tâche 4', dueDate: '2024-05-10', status: 'En cours' },
    { id: 15, title: 'Tâche 15', description: 'Description de la tâche 5', dueDate: '2024-08-25', status: 'Terminé' }
  ];
  

  private apiUrl = 'http://localhost:8080/api/taches'; // URL de votre backend

  constructor(private http: HttpClient) { }

  // Méthode pour obtenir toutes les tâches
  getTaches(): Observable<Tache[]> {
    return this.http.get<Tache[]>(this.apiUrl);
  }

  // Méthode pour obtenir une tâche par ID
  getTacheById(id: number): Observable<Tache> {
    return this.http.get<Tache>(`${this.apiUrl}/${id}`);
  }

  // Méthode pour ajouter une nouvelle tâche
  addTache(tache: Tache): Observable<Tache> {
    return this.http.post<Tache>(this.apiUrl, tache);
  }

  // Méthode pour mettre à jour une tâche existante
  updateTache(tache: Tache): Observable<Tache> {
    return this.http.put<Tache>(`${this.apiUrl}/${tache.id}`, tache);
  }

  // Méthode pour supprimer une tâche
  deleteTache(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
