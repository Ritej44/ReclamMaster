import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { UpdatePasswordService } from '../services/update-password.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-parametre',
  templateUrl: './parametre.component.html',
  styleUrls: ['./parametre.component.css']
})
export class ParametreComponent {

  name: string = '';
  actuel: string = '';
  nouveau: string = '';
  message: string = '';

constructor(private toastr :ToastrService,private updatePasswordService :UpdatePasswordService,private authService:AuthService,private router:Router){}

onSubmit() {
  this.updatePasswordService.updatePasswordintervenant(this.name, this.actuel, this.nouveau).subscribe(
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
