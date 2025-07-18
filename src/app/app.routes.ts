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

export const routes: Routes = [ 
    {path:"home",component: HomeComponent},
    {path:"login",component: LoginComponent},
    {
        path:"dashboard",
        component: DashboardComponent,
        children:[
            {
                path: "admin", 
                component: AdminDashboardComponent,
                children: [
                    {path: "", component: HomeDashboardComponent},
                    {path: "eleves", component: ElevesComponent},
                    {path: "enseignants", component: EnseignantsComponent},
                    {path: "classes", component: ClassesComponent},
                    {path: "matieres", component: MatieresComponent},
                    {path: "bulletins", component: BulletinsComponent},
                    {path: "**", pathMatch: "full", redirectTo: ""}
                ]
            },
            {path: "**", pathMatch: "full", redirectTo: "admin"}
        ]
    },
    {path:"**",pathMatch:"full",redirectTo:"home"},
    
];
