import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ElevesService } from '../../../services/eleves/eleves.service';
import {Classe, Document, Eleve} from '../../../models';
import { ClasseService } from '../../../services/classes/classe.service';
import {CustomToastComponent} from "../../common/custom-toast/custom-toast.component";

@Component({
  selector: 'app-eleves',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgFor, NgIf, CustomToastComponent],
  templateUrl: './eleves.component.html',
  styleUrl: './eleves.component.css',
})
export class ElevesComponent {
  students: Eleve[] = [];
  classes: Classe[] = [];
  matricules: string[] = [];

  searchTerm = '';
  selectedClass = '';
  selectedStatus = '';

  showModal = false;
  showToast = false;
  typeToast!: 'success' | 'fail';

  studentForm!: FormGroup;
  editMode: boolean = false;
  editingIndex: number | null = null;
  currentPage: number = 1;
  itemsPerPage: number = 10;
  selectedFile!: any;
  documentJustificatif!: Document;
  toastMessage: string = ""

  constructor(
    private fb: FormBuilder,
    private eleveService: ElevesService,
    private classesService: ClasseService
  ) {}

  ngOnInit() {
    this.initForm();
    this.getAllStudents();
    this.getAllClasses();
  }

  getAllStudents() {
    this.eleveService.getAllEleves().subscribe((data: any) => {
      this.students = data.eleves.data;
      this.students.forEach((student) => {
        this.matricules.push(student.numero_etudiant);
      });
    });
  }

  getAllClasses() {
    this.classesService.getAllClasses().subscribe((data: any) => {
      this.classes = data.classes;
      this.studentForm.patchValue({ sexe: 'default' });
      this.studentForm.patchValue({ classe_id: 'default' });
    });
  }

  private initForm() {
    this.studentForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      date_naissance: ['', Validators.required],
      lieu_naissance: ['', Validators.required],
      sexe: ['default', Validators.required],
      classe_id: ['default', Validators.required],
      adresse: ['', Validators.required],
      telephone: ['', Validators.required],
      nom_tuteur: ['', Validators.required],
      telephone_tuteur: ['', Validators.required],
      email_tuteur: ['', [Validators.required, Validators.email]],
      document_justificatif: [null, Validators.required],
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

  private getBase64FromFile(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onloadend = () => {
        if (reader.result) {
          const base64DataUrl = reader.result as string;
          const base64String = base64DataUrl.split(',')[1]; // Extract only the Base64 part
          resolve(base64String);
        } else {
          reject(new Error('Failed to read file.'));
        }
      };

      reader.onerror = (error) => {
        reject(error);
      };

      reader.readAsDataURL(file);
    });
  }

  async onFileSelected(event: any) {
    const file = event.target;
    if (file) {
      this.selectedFile = file.files?.[0];
      try {
        const base64EncodedData = await this.getBase64FromFile(this.selectedFile);
        const fileExtension = this.selectedFile.type.split('/')[1];
        this.documentJustificatif = {
          name: this.selectedFile.name,
          type: fileExtension,
          data: base64EncodedData,
        }
      }catch (err) {
        console.error(err);
      }
    }
  }

  submitForm() {
    if (!this.studentForm.valid) {
      return;
    }

    const payload = {
      ...this.studentForm.value,
      document_justificatif: this.documentJustificatif
    }

    if (!this.editMode) {
      this.eleveService.createEleve(payload).subscribe(res => {
        if (res.success) {
          this.studentForm.reset()
          this.closeModal();
          this.toastMessage = res.message;
          this.showToast = true;
          this.typeToast = "success";
          setTimeout(() => {
            this.showToast = false
            this.toastMessage = ""
          }, 6000);
          this.getAllStudents();
        }
      });
    }else {
      this.eleveService.updateEleve(this.editingIndex!, payload).subscribe(res => {
        if (res.success) {
          this.studentForm.reset()
          this.closeModal();
          this.toastMessage = res.message;
          this.showToast = true;
          this.typeToast = "success";
          setTimeout(() => {
            this.showToast = false
            this.toastMessage = ""
          }, 6000);
          this.getAllStudents();
        }
      })
    }
  }

  get paginatedStudents() {
    const filtered = this.students.filter((student) => {
      const matchesSearch =
        this.searchTerm === '' ||
        student.user.nom
          .toLowerCase()
          .includes(this.searchTerm.toLowerCase()) ||
        student.numero_etudiant
          .toLowerCase()
          .includes(this.searchTerm.toLowerCase());

      const matchesClass =
        this.selectedClass === '' ||
        student?.classe?.nom === this.selectedClass;

      const matchesMatricule =
        this.matricules.length === 0 ||
        this.matricules.includes(student.numero_etudiant);

      return matchesSearch && matchesClass && matchesMatricule;
    });

    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return filtered.slice(start, end);
  }

  get totalPages() {
    const filteredCount = this.students.filter((student) => {
      const matchesSearch =
        this.searchTerm === '' ||
        student.user.nom
          .toLowerCase()
          .includes(this.searchTerm.toLowerCase()) ||
        student.numero_etudiant
          .toLowerCase()
          .includes(this.searchTerm.toLowerCase());

      const matchesClass =
        this.selectedClass === '' || student.classe?.nom === this.selectedClass;

      return matchesSearch && matchesClass;
    }).length;

    return Math.ceil(filteredCount / this.itemsPerPage);
  }

  editStudent(student: any, index: number) {
    this.editMode = true;
    this.editingIndex = index;
    const date = new Date(student.date_naissance);
    const formatedDate = date.toLocaleDateString('fr-FR');

    console.log(formatedDate);

    this.studentForm.setValue({
      nom: student.user.nom,
      prenom: student.user.prenom,
      sexe: student.sexe,
      email: student.user.email,
      date_naissance: `${formatedDate}`,
      lieu_naissance: student.lieu_naissance,
      classe_id: student.classe.id,
      adresse: student.adresse,
      telephone: student.telephone,
      nom_tuteur: student.nom_tuteur,
      telephone_tuteur: student.telephone_tuteur,
      email_tuteur: student.email_tuteur,
      document_justificatif: null,
    });

    this.showModal = true;
  }

  deleteStudent(id: number) {
    this.eleveService.deleteEleve(id).subscribe(res => {
      console.log(res)
    })
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }
}
