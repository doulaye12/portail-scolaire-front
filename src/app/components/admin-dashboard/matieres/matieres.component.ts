import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatieresService } from '../../../services/matieres/matieres.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ConfirmDialogComponent } from '../../common/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-matieres',
  standalone: true,
  imports: [NgFor, NgIf, ReactiveFormsModule, ConfirmDialogComponent],
  templateUrl: './matieres.component.html',
  styleUrl: './matieres.component.css',
})
export class MatieresComponent implements OnInit {
  matieres: any[] = [];
  paginatedMatieres: any[] = [];
  currentPage = 1;
  itemsPerPage = 10;
  isAddForm = false;
  successMessage = '';
  errorMessage = '';
  matiereForm!: FormGroup;
  isEditMatiere = false
  editMatiereId!: number

  showConfirm = false;
  selectedMatiere: any;

  constructor(
    private matiereService: MatieresService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.updatePagination();
    this.matiereForm = this.fb.group({
      nom: ['', Validators.required],
      code: ['', Validators.required],
      coefficient: [null, [Validators.required, Validators.min(0)]],
      niveau: ['', Validators.required],
      description: [''],
    });
  }

  onSubmit() {
    if (!this.isEditMatiere) {
      console.log("Creation");
      this.createMatiere()
    }else{
      console.log("Update");
      this.updateMatiere()
    }
  }

  createMatiere() {
    if (this.matiereForm.valid) {
      this.matiereService.createMatiere(this.matiereForm.value).subscribe({
        next: (res) => {
          if (res.success) {
            this.successMessage = res.errorMessage;
            this.matiereForm.reset();
            this.updatePagination()
          }
        },
        error: (error) => {
          if (error) {
            this.errorMessage = error.error.message;
          }
        },
      });
    } else {
      this.errorMessage = 'Formulaire invalide ❌';
      this.matiereForm.markAllAsTouched();
    }
  }

  updateMatiere() {
    if (this.matiereForm.valid) {
      this.matiereService.updateMatiere(this.editMatiereId, this.matiereForm.value).subscribe({
        next: (res) => {
          if (res.success) {
            this.successMessage = res.message;
            this.matiereForm.reset();
            this.updatePagination()
          }
        },
        error: (error) => {
          if (error) {
            this.errorMessage = error.error.message;
          }
        },
      })
    } else {
      this.errorMessage = 'Formulaire invalide ❌';
      this.matiereForm.markAllAsTouched();
    }
  }

  updatePagination() {
    this.matiereService.getAllMatieres().subscribe((data) => {
      this.matieres = data.matieres;
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      this.paginatedMatieres = this.matieres.slice(start, end);
    });
  }

  changePage(delta: number) {
    const maxPage = Math.ceil(this.matieres.length / this.itemsPerPage);
    this.currentPage += delta;
    if (this.currentPage < 1) this.currentPage = 1;
    if (this.currentPage > maxPage) this.currentPage = maxPage;
    this.updatePagination();
  }

  get totalPages(): number {
    return Math.ceil(this.matieres.length / this.itemsPerPage);
  }

  toggleForm() {
    this.isAddForm = !this.isAddForm;
    this.matiereForm.reset();
  }

  editMatiere(index: number) {
    this.isAddForm = true;
    this.isEditMatiere = true
    const editingMatiere = this.paginatedMatieres[index];
    this.editMatiereId = editingMatiere.id;
    this.matiereForm.setValue({
      nom: editingMatiere.nom,
      code: editingMatiere.code,
      coefficient: editingMatiere.coefficient,
      niveau: editingMatiere.niveau,
      description: editingMatiere.description,
    })
  }

  confirmDelete(matiere: any) {
    this.editMatiereId = matiere.id;
    this.selectedMatiere = matiere;
    this.showConfirm = true;
  }

  deleteMatiere() {
    this.matiereService.deleteMatiere(this.editMatiereId).subscribe({
      next: (res) => {
        this.successMessage = res.message
        this.updatePagination()
      },
      error: (error) => {
        this.errorMessage = error.error.message
      }
    })
    this.showConfirm = false;
  }
}
