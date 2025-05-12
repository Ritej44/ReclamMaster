import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth.service';
import { UpdatePasswordService } from 'src/app/services/update-password.service';

@Component({
  selector: 'app-parametre-admin',
  templateUrl: './parametre-admin.component.html',
  styleUrls: ['./parametre-admin.component.css']
})
export class ParametreAdminComponent implements OnInit {
  
  
  

  
  ngOnInit(): void {
    this.currentUser=this.authService.getCurrentUser();
    this.name=this.currentUser.name;
  
  }

  name: string = '';
  actuel: string = '';
  nouveau: string = '';
  message: string = '';
  currentUser: any;


constructor(private toastr :ToastrService,private updatePasswordService :UpdatePasswordService,private authService:AuthService,private router:Router){}

onSubmit() {
  this.updatePasswordService.updatePassword(this.name, this.actuel, this.nouveau).subscribe(
    () => {
      this.toastr.success( 'Mot de passe mis à jour avec succès', 'Succès');
    },
    (error) => {
      this.toastr.error( 'Erreur lors de la mise à jour du mot de passe', 'Erreur');
    }
  );
}

  logout():void {
    this.authService.logout();

    this.router.navigate(['/login']);  }
}

