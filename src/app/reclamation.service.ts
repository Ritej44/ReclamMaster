import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Tache } from './models/tache.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReclamationService {
  constructor(private http: HttpClient) {}

  getArticles(searchValue: string): Observable<Tache[]> {
    return this.http.get<Tache[]>(
      `http://localhost:8084/api/v1/reclamation/?nom_like=${searchValue}`
    );
  }
}
