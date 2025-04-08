import { Component, OnInit } from '@angular/core';
import { ReclamationService } from '../Reclamation.service';
import { Tache } from '../models/tache.model';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-intervenant',
  templateUrl: './intervenant.component.html',
  styleUrls: ['./intervenant.component.css']
})
export class IntervenantComponent {
  reclamations: Tache[] = [];
  selectedReclamation: Tache | null = null;

  constructor(private reclamationService: ReclamationService, private authService:AuthService ,private router:Router) {}

  ngOnInit(): void {
    this.loadReclamations();
  }

  loadReclamations(): void {
    const intervenantId = this.authService.getIntervenantId(); 
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

  
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}