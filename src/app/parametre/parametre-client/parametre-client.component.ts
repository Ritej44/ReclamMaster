import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth.service';
import { UpdatePasswordService } from 'src/app/services/update-password.service';

@Component({
  selector: 'app-parametre-client',
  templateUrl: './parametre-client.component.html',
  styleUrls: ['./parametre-client.component.css']
})
export class ParametreClientComponent {

  name: string = '';
  actuel: string = '';
  nouveau: string = '';
  message: string = '';

constructor(private toastr :ToastrService,private updatePasswordService :UpdatePasswordService,private authService:AuthService,private router:Router){}

onSubmit() {
  this.updatePasswordService.updatePasswordclient(this.name, this.actuel, this.nouveau).subscribe(
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
