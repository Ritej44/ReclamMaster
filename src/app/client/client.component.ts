import { Component, OnInit } from '@angular/core';
import { ClientService } from '../client.service';
import { Client } from '../models/Client.model';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent  {

    ClientsArray : any[] = [];
    
    name :string="";
    email:string="";
    password:string="";
    role:string="";
    currentClientID = "";

    logout():void {
      this.authService.logout();
  
      this.router.navigate(['/login']);  }
  
    
    constructor(private http: HttpClient ,private clientService: ClientService ,private authService :AuthService ,private router:Router){
         this.getAllClients();
    }
    
    getAllClients() {
      this.http.get("http://localhost:8084/api/v1/Clients/getAll")
      .subscribe((resultData: any)=>{
        console.log(resultData);
        this.ClientsArray = resultData;
    });
      
  
    }
  
    register()
    {
    
      let bodyData = {
        "name" : this.name,
        "email" : this.email,
        "password" : this.password,
        "role":this.role
      };
   
      this.http.post("http://localhost:8084/api/v1/Clients/create",bodyData,{responseType: 'text'}).subscribe((resultData: any)=>
      {
          console.log(resultData);
          alert("Client Registered Successfully");
          this.getAllClients();
   
          this.name = "";
          this.email = "";
          this.password  ="";
          this.role="";
      });
    }
  
  
  
  
    setUpdate(data: any)
    {
     this.name = data.name;
     this.email=data.email;
     this.password = data.password;
     this.role = data.role;
     this.currentClientID = data._id;
     
    }
  
  
   
    UpdateRecords()
    {
      let bodyData = {
       
        "name" : this.name,
        "email":this.email,
        "password" : this.password,
        "role" : this.role
      };
      
      this.http.put("http://localhost:8084/api/v1/Clients/edit"+ "/" + this.currentClientID ,
         bodyData,{responseType: 'text'}).subscribe((resultData: any)=>
      {
          console.log(resultData);
          alert("Client Registered Updateddd")
          this.getAllClients();
   
          this.name = "";
          this.email=""
          this.password = "";
          this.role  = "";
      });
    }
   
    create()
    {
      if(this.currentClientID == '')
      {
          this.register();
      }
        else
        {
         this.UpdateRecords();
        }      
   
    }
   
    setDelete(data: any)
    {  
      this.http.delete("http://localhost:8084/api/v1/Clients/delete"+ "/"+ data._id,{responseType: 'text'}).subscribe((resultData: any)=>
      {
          console.log(resultData);
          alert("Clients Deletedddd")
          this.getAllClients();
   
          this.name = "";
          this.email="";
          this.password = "";
          this.role  = "";
      });
  
  

}
}
