import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { TacheService, Tache } from '../tache.service';
import { CrudApiService } from '../crud-api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-taches',
  templateUrl: './taches.component.html',
  styleUrls: ['./taches.component.css']
})
export class TachesComponent implements OnInit {

  constructor(private tacheService: TacheService, private crudApi :CrudApiService,
    private fb: FormBuilder, private authService: AuthService, private router: Router ,)
     {this.reclamationForm = this.fb.group({
      description: [''],
      category: [''],
      urgency: [''],
      file: ['']
    }); }
  reclamationForm: FormGroup;
  reclamations: any[] = []; // Assurez-vous que cette propriété est initialisée
  isEditing = false;
  currentReclamationId: string = "null";


  ngOnInit() {
    
    this.initForm();
    this.loadReclamations();
  }

  initForm() {
    this.reclamationForm = this.fb.group({
      description: ['', Validators.required],
      category: ['', Validators.required],
      urgency: ['', Validators.required],
      file: ['',Validators.required],
      Remarque:['',Validators.required]
    });
  }
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }


  // Exemple d'utilisation pour créer une réclamation
  createReclamation() {
    if (this.reclamationForm.valid) {
      this.crudApi.createReclamation(this.reclamationForm.value).subscribe(response => {
        console.log('Réclamation créée avec succès', response);
        // Vous pouvez également mettre à jour la liste des réclamations ou rediriger l'utilisateur
      });
    }
  }

  // Exemple d'utilisation pour charger les réclamations
  loadReclamations() {
    this.crudApi.getReclamations().subscribe(response => {
      this.reclamations = response;
    });
  }

  // Exemple d'utilisation pour mettre à jour une réclamation
  updateReclamation(id: string, data: any) {
    this.crudApi.updateReclamation(id, data).subscribe(response => {
      console.log('Réclamation mise à jour avec succès', response);
    });
  }

  // Exemple d'utilisation pour supprimer une réclamation
  deleteReclamation(id: string) {
    this.crudApi.deleteReclamation(id).subscribe(response => {
      console.log('Réclamation supprimée avec succès', response);
    });
  }
 
}
