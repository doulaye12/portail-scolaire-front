import { Component, OnInit } from '@angular/core';
import {
  KpiData,
  KpiCardComponent,
} from '../../common/kpi-card/kpi-card.component';
import { DashboardService } from '../../../services/dashboard/dashboard.service';
import { UserDashboard } from '../../../models';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [KpiCardComponent],
  templateUrl: './home-dashboard.component.html',
  styleUrl: './home-dashboard.component.css',
})
export class HomeDashboardComponent implements OnInit {

  dasboard: UserDashboard | null = null;

  classesKpi: KpiData = {
    title: 'Nombre de classes',
    kpi: 0,
    illustration:
      'https://img.freepik.com/vecteurs-premium/etudiants-mignons-classe-ecole_679557-2025.jpg',
    detailsRoute: '/dashboard/admin/classes',
  };

  elevesKpi: KpiData = {
    title: "Nombre d'élèves",
    kpi: 0,
    illustration:
      'https://thumb.ac-illust.com/0b/0b9205126c8910cbb8eeb0fde5ac67d8_t.jpeg',
      detailsRoute: '/dashboard/admin/eleves',
  };

  enseignantsKpi: KpiData = {
    title: "Nombre d'enseignants",
    kpi: 0,
    illustration:
      'https://img.freepik.com/vecteurs-premium/enseignante-classe-enseignante-souriante-debout-pres-tableau-noir-tableau-noir-dans-salle-classe-concept-ecole-apprentissage-journee-enseignant_505557-3425.jpg?w=360',
      detailsRoute: '/dashboard/admin/enseignants',
  };

  constructor(
    private dashboardService: DashboardService,
  ) {}

  ngOnInit(): void {
    this.getAdminDashboardData();
  }

  getAdminDashboardData(): void {
    this.dashboardService
      .getAdminDashboardData()
      .subscribe((data: UserDashboard) => {
        this.classesKpi.kpi = data.statistiques_generales.nombre_classes;
        this.elevesKpi.kpi = data.statistiques_generales.nombre_eleves;
        this.enseignantsKpi.kpi = data.statistiques_generales.nombre_enseignants;
        this.dasboard = data;
      });
  }
}
