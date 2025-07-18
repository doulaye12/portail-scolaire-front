import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Enseignant } from '../../../models';
import { EnseignantsService } from '../../../services/enseignants/enseignants.service';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-enseignants',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, NgFor],
  templateUrl: './enseignants.component.html',
  styleUrl: './enseignants.component.css'
})
export class EnseignantsComponent {

  enseignants: Enseignant[] = [];
  enseignantForm: FormGroup;
  editingId: number | null = null;
  successMessage = '';
  errorMessage = '';

  constructor(
    private enseignantService: EnseignantsService,
    private fb: FormBuilder
  ) {
    this.enseignantForm = this.fb.group({
      user_id: [null, Validators.required],
      numero_enseignant: ['', Validators.required],
      specialite: ['', Validators.required],
      date_embauche: ['', Validators.required],
      telephone: ['', Validators.required],
      diplomes: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.getAllEnseignants();
  }

  getAllEnseignants(): void {
    this.enseignantService.getAll().subscribe({
      next: (data) => this.enseignants = data,
      error: () => this.errorMessage = 'Erreur lors du chargement des enseignants.'
    });
  }

  onSubmit(): void {
    if (this.enseignantForm.invalid) return;

    const formValue = this.enseignantForm.value;

    if (this.editingId) {
      this.enseignantService.update(this.editingId, formValue).subscribe({
        next: () => {
          this.successMessage = 'Enseignant mis à jour avec succès.';
          this.getAllEnseignants();
          this.resetForm();
        },
        error: () => this.errorMessage = 'Erreur lors de la mise à jour.'
      });
    } else {
      this.enseignantService.create(formValue).subscribe({
        next: () => {
          this.successMessage = 'Enseignant ajouté avec succès.';
          this.getAllEnseignants();
          this.resetForm();
        },
        error: () => this.errorMessage = 'Erreur lors de l\'ajout.'
      });
    }
  }

  edit(enseignant: Enseignant): void {
    this.editingId = enseignant.id!;
    this.enseignantForm.patchValue(enseignant);
  }

  delete(id: number): void {
    if (confirm('Confirmer la suppression ?')) {
      this.enseignantService.delete(id).subscribe({
        next: () => {
          this.successMessage = 'Enseignant supprimé.';
          this.getAllEnseignants();
        },
        error: () => this.errorMessage = 'Erreur lors de la suppression.'
      });
    }
  }

  resetForm(): void {
    this.enseignantForm.reset();
    this.editingId = null;
    this.successMessage = '';
    this.errorMessage = '';
  }
}
