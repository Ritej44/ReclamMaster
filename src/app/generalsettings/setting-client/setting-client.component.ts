import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { UpdatePasswordService } from 'src/app/services/update-password.service';

@Component({
  selector: 'app-setting-client',
  templateUrl: './setting-client.component.html',
  styleUrls: ['./setting-client.component.css']
})
export class SettingClientComponent {
  phone: any;
  ClientItem: any;
  
  
    constructor(private updatePasswordService:UpdatePasswordService,private authService:AuthService,private router:Router){}
    
      logout():void {
        this.authService.logout();
    
     this.router.navigate(['/login']);  }
     
  showEditPopup: boolean = false;
      ClientsArray : any[] = [];
      name :string="";
      email:string="";
      password:string="";
      role:string="";
      currentClientID = "";
  
      avatar: string = 'assets/isra.jpg'; 
      message: string = '';
      file: File | null = null;
  
    notifications = [2,1];
    
  
    onFileSelected(event: any) {
      const fileInput = event.target as HTMLInputElement;
      if (fileInput.files && fileInput.files.length > 0) {
        this.file = fileInput.files[0];
      }
    }
  
    onSubmit() {
      if (this.file) {
        this.updatePasswordService.updateAvatar(this.name, this.file).subscribe(
          () => {
            this.message = 'Avatar mis à jour avec succès';
          },
          (error: any) => {
            this.message = 'Erreur lors de la mise à jour de l\'avatar';
          }
        );
      } else {
        this.message = 'Veuillez sélectionner un fichier';
      }
    }
    
     
  
    
    setUpdate(data: any)
    {
     this.name = data.name;
     this.email=data.email;
     this.password = data.password;
     this.role = data.role;
     this.currentClientID = data.id;
     
    }
  
      UpdateRecords(){
      let bodyData = {
        "name" : this.name,
        "email":this.email,
        "role" : this.role
      };}
  
      openEditPopup(ClientItem: any): void {
        this.setUpdate(ClientItem);
        this.showEditPopup = true;
      }
    
      closePopups() {
        this.showEditPopup = false;
      
      }
    
  saveChanges() {
      // Implement save logic
      console.log('Saving changes...');
    }
  
    
    resetForm() {
      // Implement reset logic
      console.log('Resetting form...');
    }
  
  
}
