import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';
import { UserDashboard } from '../../models';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getAdminDashboardData(): Observable<UserDashboard> {
    return this.http.get<UserDashboard>(`${this.apiUrl}/dashboard/administrateur`);
  }
}
