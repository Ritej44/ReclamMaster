import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Client } from './models/Client.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientService {


  private apiUrl = 'http://localhost:8080/api/clients'; // Remplacez par l'URL de votre API

  constructor(private http: HttpClient) { }

  // Récupérer tous les membres
  getMembers(): Observable<Client[]> {
    return this.http.get<Client[]>(this.apiUrl);
  }

  // Récupérer un membre par son ID
  getMemberById(id: number): Observable<Client> {
    return this.http.get<Client>(`${this.apiUrl}/${id}`);
  }

  // Ajouter un nouveau membre
  addMember(client: Client): Observable<Client> {
    return this.http.post<Client>(this.apiUrl, client);
  }

  // Mettre à jour un membre
  updateMember(id: number, client: Client): Observable<Client> {
    return this.http.put<Client>(`${this.apiUrl}/${id}`, client);
  }

  // Supprimer un membre
  deleteMember(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }}
