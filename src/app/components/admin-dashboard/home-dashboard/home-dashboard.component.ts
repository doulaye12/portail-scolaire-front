import { Component, Input, OnInit } from '@angular/core';
import { ClasseService } from '../../../services/classes/classe.service';
import { ElevesService } from '../../../services/eleves/eleves.service';
import { EnseignantsService } from '../../../services/enseignants/enseignants.service';
import { MatieresService } from '../../../services/matieres/matieres.service';
import {
  KpiData,
  KpiCardComponent,
} from '../../common/kpi-card/kpi-card.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [KpiCardComponent],
  templateUrl: './home-dashboard.component.html',
  styleUrl: './home-dashboard.component.css',
})
export class HomeDashboardComponent implements OnInit {
  eleves: any;
  enseignants: any;
  matieres: any;

  classesKpi: KpiData = {
    title: 'Nombre de classes',
    kpi: 0,
    illustration:
      'https://img.freepik.com/vecteurs-premium/etudiants-mignons-classe-ecole_679557-2025.jpg',
      detailsRoute: '/dashboard/admin/classes',
  };

  elevesKpi: KpiData = {
    title: "Nombre d'élèves",
    kpi: 120867,
    illustration:
      'https://thumb.ac-illust.com/0b/0b9205126c8910cbb8eeb0fde5ac67d8_t.jpeg',
  };

  enseignantsKpi: KpiData = {
    title: "Nombre d'enseignants",
    kpi: 300,
    illustration: 'https://img.freepik.com/vecteurs-premium/enseignante-classe-enseignante-souriante-debout-pres-tableau-noir-tableau-noir-dans-salle-classe-concept-ecole-apprentissage-journee-enseignant_505557-3425.jpg?w=360',
  };

  constructor(
    private clsasseService: ClasseService,
    private elevesService: ElevesService,
    private enseignantsService: EnseignantsService,
    private matieresService: MatieresService
  ) {}

  ngOnInit(): void {
    this.clsasseService.getAllClasses().subscribe((data: any) => {
      this.classesKpi.kpi = data.classes.length;
    });

    this.matieresService.getAllMatieres().subscribe((data: any) => {
      console.log({ matieres: data });
      this.matieres = data.matieres;
    });
  }
}
