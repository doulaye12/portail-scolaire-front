import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Eleve } from '../../models';

@Injectable({
  providedIn: 'root'
})
export class ElevesService {
  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getAllEleves():Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/eleves`);
  }

  getEleveById(id: number):Observable<Eleve> {
    return this.http.get<Eleve>(`${this.apiUrl}/eleves/${id}`);
  }

  createEleve(eleve: FormData):Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/eleves`, eleve);
  }

  updateEleve(id: number, eleve: Eleve):Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/eleves/${id}`, eleve);
  }

  deleteEleve(id: number):Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/eleves/${id}`);
  }


}
