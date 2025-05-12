import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class UpdatePasswordService  {
  

  private apiUrl = 'http://localhost:8084/api/user/'; 

  constructor(private http: HttpClient,private authservice :AuthService) {}

   
  updatePassword(Nameuser: string, actuel: string, nouveau: string): Observable<any> {
    const url = `${this.apiUrl}/name/${Nameuser}/password`;
    const params = { actuel, nouveau };
    return this.http.put(url, {}, { params });
  }

  
  updateEmailAndName(Nameuser: string, nouveauemail: string,nouveauName:string): Observable<any> {
    const url = `${this.apiUrl}${Nameuser}/email-name`;
    const params = { nouveauemail ,nouveauName};
    console.log(`Updating user: ${Nameuser} with email: ${nouveauemail} and name: ${nouveauName}`);
    return this.http.put(url, {}, { params });
  }
  


  
  updateAvatar(name: string, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);

    const url = `${this.apiUrl}/${name}/update-avatar`;
    return this.http.put(url, formData);
  }
}
