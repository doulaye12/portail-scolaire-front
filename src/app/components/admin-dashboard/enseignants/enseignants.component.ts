import {Component, EventEmitter, Output} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Classe, Enseignant, Matiere} from '../../../models';
import { EnseignantsService } from '../../../services/enseignants/enseignants.service';
import { DatePipe, NgFor, NgIf } from '@angular/common';
import {ClasseService} from "../../../services/classes/classe.service";
import {MatieresService} from "../../../services/matieres/matieres.service";

@Component({
  selector: 'app-enseignants',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, NgFor, DatePipe],
  templateUrl: './enseignants.component.html',
  styleUrl: './enseignants.component.css'
})
export class EnseignantsComponent {

  enseignants: Enseignant[] = [];
  classes: Classe[] = [];
  allMatieres: Matiere[] = [];
  enseignantForm: FormGroup;
  successMessage = '';
  errorMessage = '';

  showModal = false;


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
        matieres: this.fb.array([])
    });
  }

  ngOnInit(): void {
    this.getAllEnseignants();
    this.getAllMatieres();
    this.getAllClasses();
  }

  getAllEnseignants(): void {
    this.enseignantService.getAll().subscribe((response: any )=> {
      this.enseignants = response.enseignants
    });
  }

  get matieres(): FormArray {
    return this.enseignantForm.get('matieres') as FormArray;
  }

  addMatiere(): void {
    const matiereGroup = this.fb.group({
      matiere_id: [null, Validators.required],
      classe_id: [null, Validators.required]
    });
    this.matieres.push(matiereGroup);
  }

  removeMatiere(index: number): void {
    this.matieres.removeAt(index);
  }

  onSubmit(): void {
    this.enseignantService.create(this.enseignantForm.value).subscribe({
      next: (res) => {
        if (res.success) {
          this.showModal = false;
          this.enseignantForm.reset()
          this.getAllEnseignants()
          this.successMessage = res.message
        }
      },
      error: (error) => {
        this.errorMessage = error.error.message
      }
    })
  }

  getAllClasses() {
    this.classService.getAllClasses().subscribe((data: any) => {
      this.classes = data.classes;
    })
  }

  getAllMatieres() {
    this.matiereService.getAllMatieres().subscribe((data: any) => {
      this.allMatieres = data.matieres;
    })
  }

  addEnseignant() {
    this.showModal = true;
  }

  close() {
    this.showModal = false;
  }
}
