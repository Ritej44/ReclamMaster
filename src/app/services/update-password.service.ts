import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UpdatePasswordService  {
  private apiUrlclient = 'http://localhost:8084/api/user/name'; 

  private apiUrlinter = 'http://localhost:8084/api/v1/intervenant/name'; 

  private apiUrl = 'http://localhost:8084/api/user/password'; 

  constructor(private http: HttpClient) {}

  updatePasswordclient(name: string, actuel: string, nouveau: string): Observable<any> {
    const url = `${this.apiUrlclient}/${name}/password`;
    const params = { actuel, nouveau };
    return this.http.put(url, {}, { params });
  }
  updatePassword(actuel: string, nouveau: string): Observable<any> {
    const url = `${this.apiUrlinter}/password`;
    const params = { actuel, nouveau };
    return this.http.put(url, {}, { params });
  }
   
  updatePasswordadmin(name: string, actuel: string, nouveau: string): Observable<any> {
    const url = `${this.apiUrl}/${name}/password`;
    const params = { actuel, nouveau };
    return this.http.put(url, {}, { params });
  }

  
  updateAvatar(name: string, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);

    const url = `${this.apiUrlclient}/${name}/update-avatar`;
    return this.http.put(url, formData);
  }
}
