import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Classe, Enseignant, Matiere } from '../../../models';
import { EnseignantsService } from '../../../services/enseignants/enseignants.service';
import { DatePipe, NgFor, NgIf } from '@angular/common';
import { ClasseService } from '../../../services/classes/classe.service';
import { MatieresService } from '../../../services/matieres/matieres.service';
import { ConfirmDialogComponent } from '../../common/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-enseignants',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, NgFor, DatePipe, ConfirmDialogComponent],
  templateUrl: './enseignants.component.html',
  styleUrl: './enseignants.component.css',
})
export class EnseignantsComponent {
  enseignants: Enseignant[] = [];
  classes: Classe[] = [];
  allMatieres: Matiere[] = [];
  enseignantForm: FormGroup;
  successMessage = '';
  errorMessage = '';
  selectedLineId!: number;
  showModal = false;
  pageSize = 5;
  currentPage = 1;
  isEdit = false;
  editingEnseignant: any;
  isDelete = false;

  constructor(
    private enseignantService: EnseignantsService,
    private classService: ClasseService,
    private matiereService: MatieresService,
    private fb: FormBuilder
  ) {
    this.enseignantForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      specialite: ['', Validators.required],
      date_embauche: ['', Validators.required],
      telephone: [''],
      diplomes: [''],
      matieres: this.fb.array([]),
    });
  }

  ngOnInit(): void {
    this.getAllEnseignants();
    this.getAllMatieres();
    this.getAllClasses();
  }

  getAllEnseignants(): void {
    this.enseignantService.getAll().subscribe((response: any) => {
      this.enseignants = response.enseignants;
    });
  }

  get matieres(): FormArray {
    return this.enseignantForm.get('matieres') as FormArray;
  }

  addMatiere(): void {
    const matiereGroup = this.fb.group({
      matiere_id: [null, Validators.required],
      classe_id: [null, Validators.required],
    });
    this.matieres.push(matiereGroup);
  }

  removeMatiere(index: number): void {
    this.matieres.removeAt(index);
  }

  onSubmit(): void {
    if (!this.isEdit) {
      this.createEnseignant();
    } else {
      this.updateEnseignant();
    }
  }

  createEnseignant() {
    this.enseignantService.create(this.enseignantForm.value).subscribe({
      next: (res) => {
        if (res.success) {
          this.showModal = false;
          this.enseignantForm.reset();
          this.getAllEnseignants();
          this.successMessage = res.message;
        }
      },
      error: (error) => {
        this.errorMessage = error.error.message;
      },
    });
  }

  updateEnseignant() {
    const newMatieres: { matiere_id: number | undefined; classe_id: number | undefined; }[] = [];
    this.editingEnseignant.classes.forEach((classe: any, i: number) => {
      this.editingEnseignant.matieres.forEach((mat: any, j: number) => {
        if (i === j) {
          newMatieres.push({
            matiere_id: mat.id,
            classe_id: classe.id
          })
        }
      })
    })
    
    const payload = {
      ...this.enseignantForm.value,
      ...(this.enseignantForm.get('matieres') ? null : {matieres: this.editingEnseignant.matieres}),
    };
    this.enseignantService.update(this.selectedLineId, payload).subscribe({
      next: (res: any) => {
        if (res.success) {
          this.showModal = false;
          this.enseignantForm.reset();
          this.getAllEnseignants();
          this.successMessage = res.message;
        }
      },
      error: (error) => {
        this.errorMessage = error.error.message;
      },
    });
  }

  getAllClasses() {
    this.classService.getAllClasses().subscribe((data: any) => {
      this.classes = data.classes;
    });
  }

  getAllMatieres() {
    this.matiereService.getAllMatieres().subscribe((data: any) => {
      this.allMatieres = data.matieres;
    });
  }

  addEnseignant() {
    this.showModal = true;
  }

  close() {
    this.showModal = false;
  }

  editEnseignant(enseignant: Enseignant) {
    this.editingEnseignant = enseignant;
    this.selectedLineId = enseignant.id!;
    this.showModal = true;
    this.isEdit = true;
    this.enseignantForm.setValue({
      nom: enseignant.user?.nom,
      prenom: enseignant.user?.prenom,
      email: enseignant.user?.email,
      specialite: enseignant.specialite,
      date_embauche: enseignant.date_embauche,
      telephone: enseignant.telephone,
      diplomes: enseignant.diplomes,
      matieres: null,
    });
  }

  get paginatedEnseignants(): any[] {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    return this.enseignants.slice(start, end);
  }

  get totalPages(): number {
    return Math.ceil(this.enseignants.length / this.pageSize);
  }

  hideMessage() {
    setTimeout(() => {
      this.errorMessage = '';
      this.successMessage = '';
    }, 5000);
  }

  deleteEnseignant(ens: Enseignant) {
    this.selectedLineId = ens.id!;
    this.isDelete = true;
  }

  confirmDelete() {
    this.enseignantService.delete(this.selectedLineId).subscribe({
      next: (res: any) => {
        if (res.success) {
          this.getAllEnseignants();
          this.successMessage = res.message;
        }
      },
      error: (error) => {
        this.errorMessage = error.error.message;
      },
    });
    this.isDelete = false;
    this.hideMessage();
  }
}
