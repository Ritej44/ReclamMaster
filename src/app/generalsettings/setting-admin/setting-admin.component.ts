import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth.service';
import { UpdatePasswordService } from 'src/app/services/update-password.service';

@Component({
  selector: 'app-setting-admin',
  templateUrl: './setting-admin.component.html',
  styleUrls: ['./setting-admin.component.css']
})
export class SettingAdminComponent  implements OnInit {
  ClientItem: any;
  showEditPopup: boolean = false;
  ClientsArray: any[] = [];
  name: string = "";
  email: string = "";
  password: string = "";
  role: string = "";
  currentAdmin: any;
  avatar: string = 'assets/isra.jpg';
  message: string = '';
  file: File | null = null;
  nouveauemail: string = '';
  nouveauName: string = '';
  notifications = [2, 1];

  constructor(
    private updatePasswordService: UpdatePasswordService,
    private toastr: ToastrService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getCurrentAdmin();
  }

  getCurrentAdmin() {
    this.currentAdmin = this.authService.getCurrentUser();
    this.name = this.currentAdmin.name;
    this.email = this.currentAdmin.email;
  }

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

  updateEmail() {
    if (this.nouveauemail && this.nouveauName) {
      this.updatePasswordService.updateEmailAndName(this.name, this.nouveauemail,this.nouveauName).subscribe(
        () => {
          this.toastr.success('L\'opération a été mise à jour avec succès', 'Succès');
          this.email = this.nouveauemail;
          this.name=this.nouveauName; 
          this.currentAdmin.name = this.nouveauName;
          this.currentAdmin.email = this.nouveauemail;
          this.authService.setCurrentUser(this.currentAdmin);
          console.log(this.currentAdmin);
      
        },
        (error) => {
          this.toastr.error('Erreur lors de la mise à jour de l\'email', 'Erreur');
        }
      );
    } else {
      this.toastr.warning('Veuillez entrer un nouvel nom ou email', 'Attention');
    }
  }

  openEditPopup(ClientItem: any): void {
    this.showEditPopup = true;
  }

  closePopups() {
    this.showEditPopup = false;
  }

  resetForm() {
    this.name = "";
    this.email = "";
    console.log('Resetting form...');
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }


}
