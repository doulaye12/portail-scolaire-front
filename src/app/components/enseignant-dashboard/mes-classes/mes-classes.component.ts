import { Component, OnInit } from '@angular/core';
import { EnseignantsService } from '../../../services/enseignants/enseignants.service';
import { Router } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-mes-classes',
  standalone: true,
  imports: [NgIf, NgFor],
  templateUrl: './mes-classes.component.html',
  styleUrl: './mes-classes.component.css'
})
export class MesClassesComponent implements OnInit{

  myClasses: any
  classes: any[] = [];
  isLoading = true;

  constructor(private enseignantService: EnseignantsService, private router: Router){}

  ngOnInit(): void {
    this.enseignantService.getAllMyClasses().subscribe((res: any) => {
      if (res.success) {
        this.classes = res.classes;
      }
      this.isLoading = false;
    });
  }

  voirDetailsClasse(classeId: number) {
    this.router.navigateByUrl('/dashboard/enseignant/classes/' + classeId);
  }

}
