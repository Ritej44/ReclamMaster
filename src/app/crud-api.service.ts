import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CrudApiService {
  private apiUrl = 'http://your-api-url.com/api'; // Remplacez par l'URL de votre API

  constructor(private http: HttpClient) {}

  // Méthode pour créer une réclamation
  createReclamation(reclamation: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/reclamations`, reclamation);
  }

  // Méthode pour lire toutes les réclamations
  getReclamations(): Observable<any> {
    return this.http.get(`${this.apiUrl}/reclamations`);
  }

  // Méthode pour lire une réclamation spécifique par ID
  getReclamationById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/reclamations/${id}`);
  }

  // Méthode pour mettre à jour une réclamation
  updateReclamation(id: string, reclamation: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/reclamations/${id}`, reclamation);
  }

  // Méthode pour supprimer une réclamation
  deleteReclamation(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/reclamations/${id}`);
  }

  // Méthode pour affecter une réclamation à un intervenant
  assignReclamation(reclamationId: string, intervenantId: string): Observable<any> {
    return this.http.patch(`${this.apiUrl}/reclamations/${reclamationId}/assign`, { intervenantId });
  }

  // Méthode pour obtenir les réclamations affectées à un intervenant
  getAssignedReclamations(intervenantId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/reclamations/assigned/${intervenantId}`);
  }
}
