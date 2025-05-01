import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UpdatePasswordService {
  private apiUrl = 'http://localhost:8084/api/v1/Clients/name'; // URL de votre API backend

  constructor(private http: HttpClient) {}

  updatePassword(name: string, actuel: string, nouveau: string): Observable<any> {
    const url = `${this.apiUrl}/${name}/password`;
    const params = { actuel, nouveau };
    return this.http.put(url, {}, { params });
  }

  
  updateAvatar(name: string, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);

    const url = `${this.apiUrl}/${name}/update-avatar`;
    return this.http.put(url, formData);
  }
}
