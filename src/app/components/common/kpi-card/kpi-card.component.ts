import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

export interface KpiData {
  title: string;
  kpi: number;
  illustration: string;
  detailsRoute?: string;
}

@Component({
  selector: 'app-kpi-card',
  standalone: true,
  imports: [],
  templateUrl: './kpi-card.component.html',
  styleUrl: './kpi-card.component.css'
})
export class KpiCardComponent {

  @Input() data!: KpiData;

   constructor(private router: Router) {}


  formatKpi(value: number): string {
    if (value >= 1000000) {
      return (value / 1000000).toFixed(1) + 'M';
    } else if (value >= 1000) {
      return (value / 1000).toFixed(1) + 'K';
    }
    return value.toString();
  }

  navigateToDetails(): void {
    if (this.data.detailsRoute) {
      this.router.navigate([this.data.detailsRoute]);
    }
  }

}
