import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Classe } from '../../models';

@Injectable({
  providedIn: 'root'
})
export class ClasseService {

  apiUrl = environment.apiUrl
  constructor(private http: HttpClient) { }

  getAllClasses():Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/classes`);
  }

  getClassById(id: number):Observable<Classe> {
    return this.http.get<Classe>(`${this.apiUrl}/classes/${id}`);
  }

  createClass(classe: any): Observable<Classe> {
    return this.http.post<Classe>(`${this.apiUrl}/classes`, classe);
  }

  updateClass(id: number, classe: any): Observable<Classe> {
    return this.http.put<Classe>(`${this.apiUrl}/classes/${id}`, classe);
  }

  deleteClass(id: number) {
    return this.http.delete(`${this.apiUrl}/classes/${id}`);
  }
}
