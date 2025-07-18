import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MatieresService {

  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getAllMatieres(): Observable<any> {
    return this.http.get(`${this.apiUrl}/matieres`);
  }

  getMatiereById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/matieres/${id}`);
  }

  createMatiere(matiere: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/matieres`, matiere);
  }

  updateMatiere(id: number, matiere: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/matieres/${id}`, matiere);
  }

  deleteMatiere(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/matieres/${id}`);
  }
  
}
