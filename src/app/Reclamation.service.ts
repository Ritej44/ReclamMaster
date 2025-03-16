import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Observable } from 'rxjs/internal/Observable';
import { Tache } from './models/tache.model';


@Injectable({
  providedIn: 'root'
})
export class ReclamationService {

  private apiUrl = 'http://localhost:8080/api/reclamations';

  constructor(private http: HttpClient) { }

  getReclamations(): Observable<Tache[]> {
    return this.http.get<Tache[]>(this.apiUrl);
  }

  getReclamationById(id: string): Observable<Tache> {
    return this.http.get<Tache>(`${this.apiUrl}/${id}`);
  }

  createReclamation(reclamation: Tache): Observable<Tache> {
    return this.http.post<Tache>(this.apiUrl, reclamation);
  }

  updateReclamation(id: string, reclamation: Tache): Observable<Tache> {
    return this.http.put<Tache>(`${this.apiUrl}/${id}`, reclamation);
  }

  deleteReclamation(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getReclamationsByIntervenant(intervenantId: string): Observable<Tache[]> {
    return this.http.get<Tache[]>(`${this.apiUrl}/intervenant/${intervenantId}`);
  }

  getReclamationsByClient(clientId: string): Observable<Tache[]> {
    return this.http.get<Tache[]>(`${this.apiUrl}/client/${clientId}`);
  }

  getReclamationsByEtat(etat: string): Observable<Tache[]> {
    return this.http.get<Tache[]>(`${this.apiUrl}/etat/${etat}`);
  }

}
