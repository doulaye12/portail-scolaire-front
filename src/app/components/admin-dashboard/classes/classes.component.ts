import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Classe } from '../../../models';
import { ClasseService } from '../../../services/classes/classe.service';
import { NgFor, NgIf } from '@angular/common';
import { ConfirmDialogComponent } from '../../common/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-classes',
  standalone: true,
  imports: [ReactiveFormsModule, ConfirmDialogComponent, NgIf, NgFor],
  templateUrl: './classes.component.html',
  styleUrl: './classes.component.css',
})
export class ClassesComponent {
  classeForm!: FormGroup;
  editing: any;
  showConfirm: any;
  selectedClasse: any;
  classes: Classe[] = [];
  paginatedClasses: Classe[] = [];
  currentPage = 1;
  itemsPerPage = 10;
  editMode = false;
  isAddForm: any;
  currentEditingId?: number;

  constructor(private fb: FormBuilder, private classeService: ClasseService) {
    this.classeForm = this.fb.group({
      nom: [''],
      niveau: [''],
      effectif_max: [0],
      description: [''],
    });
  }

  ngOnInit() {
    this.loadClasses();
  }

  loadClasses() {
    this.classeService.getAllClasses().subscribe((data: any) => {
      this.classes = data.classes;
      this.updatePaginated();
    });
  }

  updatePaginated() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    this.paginatedClasses = this.classes.slice(
      start,
      start + this.itemsPerPage
    );
  }

  submit() {
    const value = this.classeForm.value;
    if (this.editMode && this.currentEditingId != null) {
      this.classeService
        .updateClass(this.currentEditingId, value)
        .subscribe(() => {
          this.reset();
          this.loadClasses();
        });
    } else {
      this.classeService.createClass(value).subscribe(() => {
        this.reset();
        this.loadClasses();
      });
    }
  }

  edit(classe: Classe) {
    this.classeForm.patchValue(classe);
    this.currentEditingId = classe.id;
    this.editMode = true;
  }

  delete(id: number) {
    if (confirm('Confirmer la suppression ?')) {
      this.classeService.deleteClass(id).subscribe(() => {
        this.loadClasses();
      });
    }
  }

  reset() {
    this.classeForm.reset();
    this.editMode = false;
    this.currentEditingId = undefined;
  }

  changePage(page: number) {
    this.currentPage = page;
    this.updatePaginated();
  }

  get totalPages() {
    return Math.ceil(this.classes.length / this.itemsPerPage);
  }

  confirmDelete(_t17: Classe) {
    throw new Error('Method not implemented.');
  }
  editClasse(_t17: Classe) {
    
  }
  
  toggleForm() {
    this.isAddForm = !this.isAddForm;
    this.editing = false
  }
}
