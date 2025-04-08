import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tache } from './models/tache.model'
import { Intervenant } from './models/intervenant.model';

@Injectable({
  providedIn: 'root'
})
export class AffectationService {
  private apiUrl = 'http://localhost:8080/api'; // Assurez-vous que l'URL est correcte

  constructor(private http: HttpClient) {}

  getIntervenants(): Observable<Intervenant[]> {
    return this.http.get<Intervenant[]>(`${this.apiUrl}/intervenants`);
  }

  getReclamations(): Observable<Tache[]> {
    return this.http.get<Tache[]>(`${this.apiUrl}/reclamations`);
  }

  affecterIntervenant(reclamationId: string, intervenantId: string): Observable<Tache> {
    const url = `${this.apiUrl}/reclamations/${reclamationId}/affecter?intervenantId=${intervenantId}`;
    return this.http.put<Tache>(url, {});
  }

}