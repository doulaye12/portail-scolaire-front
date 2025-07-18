import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-eleves',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgClass, NgFor, NgIf],
  templateUrl: './eleves.component.html',
  styleUrl: './eleves.component.css',
})
export class ElevesComponent {
  students = [
    {
      matricule: 'MAT001',
      nom: 'Diop',
      prenom: 'Awa',
      sexe: 'F',
      classe: '6ème A',
      statut: 'actif',
    },
    {
      matricule: 'MAT002',
      nom: 'Ndoye',
      prenom: 'Mamadou',
      sexe: 'M',
      classe: '5ème B',
      statut: 'inactif',
    },
  ];

  classes = ['6ème A', '6ème B', '5ème A', '5ème B'];

  searchTerm = '';
  selectedClass = '';
  selectedStatus = '';

  showModal = false;
  studentForm!: FormGroup;
  editMode: boolean = false;
  editingIndex: number | null = null;
  currentPage: number = 1;
  itemsPerPage: number = 10;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.studentForm = this.fb.group({
      matricule: ['', Validators.required],
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      sexe: ['', Validators.required],
      classe: ['', Validators.required],
      statut: ['actif', Validators.required],
    });
  }

  openModal() {
    this.editMode = false;
    this.editingIndex = null;
    this.studentForm.reset({ statut: 'actif' });
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.studentForm.reset();
  }

  submitForm() {
    if (this.studentForm.valid) {
      const formValue = this.studentForm.value;

      if (this.editMode && this.editingIndex !== null) {
        // Modifier l’élève existant
        this.students[this.editingIndex] = { ...formValue };
      } else {
        // Ajouter un nouvel élève
        this.students.push({ ...formValue });
      }

      this.closeModal();
    } else {
      this.studentForm.markAllAsTouched();
    }
  }

  get paginatedStudents() {
    const filtered = this.students.filter((student) => {
      const matchesSearch =
        this.searchTerm === '' ||
        student.nom.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        student.matricule.toLowerCase().includes(this.searchTerm.toLowerCase());

      const matchesClass =
        this.selectedClass === '' || student.classe === this.selectedClass;
      const matchesStatus =
        this.selectedStatus === '' || student.statut === this.selectedStatus;

      return matchesSearch && matchesClass && matchesStatus;
    });

    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return filtered.slice(start, end);
  }

  get totalPages() {
    const filteredCount = this.students.filter((student) => {
      const matchesSearch =
        this.searchTerm === '' ||
        student.nom.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        student.matricule.toLowerCase().includes(this.searchTerm.toLowerCase());

      const matchesClass =
        this.selectedClass === '' || student.classe === this.selectedClass;
      const matchesStatus =
        this.selectedStatus === '' || student.statut === this.selectedStatus;

      return matchesSearch && matchesClass && matchesStatus;
    }).length;

    return Math.ceil(filteredCount / this.itemsPerPage);
  }

  editStudent(student: any, index: number) {
    this.editMode = true;
    this.editingIndex = index;

    this.studentForm.setValue({
      matricule: student.matricule,
      nom: student.nom,
      prenom: student.prenom,
      sexe: student.sexe,
      classe: student.classe,
      statut: student.statut,
    });

    this.showModal = true;
  }

  deleteStudent(student: any) {
    console.log('Supprimer :', student);
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }
}
