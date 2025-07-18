import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { SideBarComponent } from "../../components/common/side-bar/side-bar.component";
import { HeaderComponent } from '../../components/common/header/header.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterOutlet, SideBarComponent, HeaderComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

 user: any | null;

  constructor(private authService: AuthService) {
    this.user = this.authService.getCurrentUser();
  }

  

}
