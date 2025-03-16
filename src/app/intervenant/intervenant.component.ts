import { Component, OnInit } from '@angular/core';

import { ReclamationService } from '../Reclamation.service';
import { Tache } from '../models/tache.model';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-intervenant',
  templateUrl: './intervenant.component.html',
  styleUrls: ['./intervenant.component.css']
})
export class IntervenantComponent implements OnInit {
  reclamations: Tache[] = [];
  selectedReclamation: Tache | null = null;

  constructor(private reclamationService: ReclamationService, private authService:AuthService) {}

  ngOnInit(): void {
    this.loadReclamations();
  }

  loadReclamations(): void {
    const intervenantId = this.authService.getIntervenantId(); // Récupérez l'ID de l'intervenant connecté
    if (intervenantId) {
      this.reclamationService.getReclamationsByIntervenant(intervenantId).subscribe(
        (data: Tache[]) => {
          this.reclamations = data;
        },
        (error) => {
          console.error('Erreur lors du chargement des réclamations', error);
        }
      );
    } else {
      console.error('ID de l\'intervenant non trouvé');
    }
  }

  updateReclamation(reclamation: Tache): void {
    this.selectedReclamation = { ...reclamation };
  }

  onSubmit(): void {
    if (this.selectedReclamation) {
      const id = this.selectedReclamation.id; 
      this.reclamationService.updateReclamation(id,this.selectedReclamation).subscribe(
        (data: Tache) => {
          this.loadReclamations();
          this.selectedReclamation = null;
        },
        (error) => {
          console.error('Erreur lors de la mise à jour de la réclamation', error);
        }
      );
    }
  }
}