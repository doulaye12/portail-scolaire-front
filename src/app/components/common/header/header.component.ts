import { Component, Input,  } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  @Input() user: any;
  dropdownOpen = false;

  constructor(private authService: AuthService) {}

  logout() {
    this.authService.logout();
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }
  
}
