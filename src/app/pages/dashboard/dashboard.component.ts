import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { SideBarComponent } from "../../components/common/side-bar/side-bar.component";
import { HeaderComponent } from '../../components/common/header/header.component';
import { User } from '../../models';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterOutlet, SideBarComponent, HeaderComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{

 user!: any;

  constructor(private authService: AuthService) {
  }
  
  ngOnInit(): void {
    this.authService.getUserInfos().subscribe((res:any) => {
      if (res.success) {
        this.user = res.user
      }
    })
  }

  
}
