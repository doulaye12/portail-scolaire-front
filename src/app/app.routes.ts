import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { ElevesComponent } from './components/admin-dashboard/eleves/eleves.component';
import { EnseignantsComponent } from './components/admin-dashboard/enseignants/enseignants.component';
import { ClassesComponent } from './components/admin-dashboard/classes/classes.component';
import { MatieresComponent } from './components/admin-dashboard/matieres/matieres.component';
import { BulletinsComponent } from './components/admin-dashboard/bulletins/bulletins.component';
import { HomeComponent } from './pages/home/home.component';
import { HomeDashboardComponent } from './components/admin-dashboard/home-dashboard/home-dashboard.component';
import { EnseignantDashboardComponent } from './components/enseignant-dashboard/enseignant-dashboard.component';
import { EleveDashboardComponent } from './components/eleve-dashboard/eleve-dashboard.component';
import { NoteComponent } from './components/enseignant-dashboard/note/note.component';
import { HomeEnseignantComponent } from './components/enseignant-dashboard/home-enseignant/home-enseignant.component';
import { MesClassesComponent } from './components/enseignant-dashboard/mes-classes/mes-classes.component';
import { SingleClasseComponent } from './components/enseignant-dashboard/mes-classes/single-classe/single-classe.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      {
        path: 'admin',
        component: AdminDashboardComponent,
        children: [
          { path: '', component: HomeDashboardComponent },
          { path: 'eleves', component: ElevesComponent },
          { path: 'enseignants', component: EnseignantsComponent },
          { path: 'classes', component: ClassesComponent },
          { path: 'matieres', component: MatieresComponent },
          { path: '**', pathMatch: 'full', redirectTo: '' },
        ],
      },
      { path: 'bulletins', component: BulletinsComponent },
      {
        path: 'enseignant',
        component: EnseignantDashboardComponent,
        children: [
          {path: '', component: HomeEnseignantComponent},
          { path: 'classes', component: MesClassesComponent },
          { path: 'classes/:id', component: SingleClasseComponent },
        ],
      },
      { path: 'eleve', component: EleveDashboardComponent },
      { path: '**', pathMatch: 'full', redirectTo: '' },
    ],
  },
  { path: '**', pathMatch: 'full', redirectTo: 'home' },
];
