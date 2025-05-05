import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth.service';
import { UpdatePasswordService } from 'src/app/services/update-password.service';

@Component({
  selector: 'app-parametre-client',
  templateUrl: './parametre-client.component.html',
  styleUrls: ['./parametre-client.component.css']
})
export class ParametreClientComponent implements OnInit {

  name: string = '';
  actuel: string = '';
  nouveau: string = '';
  message: string = '';
  currentUser: any;

constructor(private toastr :ToastrService,private updatePasswordService :UpdatePasswordService,private authService:AuthService,private router:Router){}

getCurrentUser() {
  const currentUser = localStorage.getItem('currentUser');
  return currentUser ? JSON.parse(currentUser) : null;
}

ngOnInit(): void {
  this.currentUser = this.getCurrentUser();
}

onSubmit() {
  this.updatePasswordService.updatePasswordclient(this.currentUser.name, this.actuel, this.nouveau).subscribe(
    () => {
      console.log(this.currentUser.name);
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
