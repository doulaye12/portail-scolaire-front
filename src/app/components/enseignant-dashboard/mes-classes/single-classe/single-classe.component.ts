import { Component, OnInit } from '@angular/core';
import { EnseignantsService } from '../../../../services/enseignants/enseignants.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-single-classe',
  standalone: true,
  imports: [],
  templateUrl: './single-classe.component.html',
  styleUrl: './single-classe.component.css'
})
export class SingleClasseComponent implements OnInit{

  eleves: any

  constructor(private enseignantService: EnseignantsService, private route: ActivatedRoute){}

  ngOnInit(): void {
    const classe_id = +this.route.snapshot.params['id'];
    this.enseignantService.getAllStudentOfMyClasse(classe_id).subscribe({
      next: (res) => {
        console.log(res);
      }
    })
  }

}
