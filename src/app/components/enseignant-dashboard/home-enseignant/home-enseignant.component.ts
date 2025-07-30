import { Component } from '@angular/core';
import { EnseignantsService } from '../../../services/enseignants/enseignants.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';
import { DatePipe, NgIf, TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-home-enseignant',
  standalone: true,
  imports: [TitleCasePipe, DatePipe, NgIf, RouterModule],
  templateUrl: './home-enseignant.component.html',
  styleUrl: './home-enseignant.component.css'
})
export class HomeEnseignantComponent {
  enseignant: any;
  isLoading = true;
  user: any;

  constructor(
    private enseignantService: EnseignantsService,
    private authService: AuthService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const ens = JSON.parse(localStorage.getItem('auth_user')!);
    console.log(ens);
    
    const id = ens.id;
    this.authService.getUserInfos().subscribe((response: any) => {
      if (response.success) {
        this.user = response.user;
        this.enseignant = response.user.enseignant;
      }
      this.isLoading = false;
    });
  }
}
