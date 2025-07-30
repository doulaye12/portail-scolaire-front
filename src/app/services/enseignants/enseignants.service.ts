import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Enseignant } from '../../models';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EnseignantsService {

  apiUrl = environment.apiUrl;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    })
  };

  constructor(private http: HttpClient) {}

  // ✔️ GET : Liste de tous les enseignants
  getAll(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/enseignants`, this.httpOptions);
  }

  // ✔️ GET : Enseignant par ID
  getById(id: number): Observable<Enseignant> {
    return this.http.get<Enseignant>(`${this.apiUrl}/enseignants/${id}`, this.httpOptions);
  }

  // ✔️ POST : Créer un enseignant
  create(enseignant: Enseignant): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/enseignants`, enseignant, this.httpOptions);
  }


  // ✔️ PUT : Mettre à jour un enseignant
  update(id: number, enseignant: Enseignant): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/enseignants/${id}`, enseignant);
  }

  // ✔️ DELETE : Supprimer un enseignant
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/enseignants/${id}`, this.httpOptions);
  }

  getAllMyClasses() {
     return this.http.get<Enseignant>(`${this.apiUrl}/enseignant/mes-classes`, this.httpOptions);
  }

  getAllStudentOfMyClasse(classe_id: number) {
    return this.http.get<Enseignant>(`${this.apiUrl}/enseignant/classe/${classe_id}/eleves`, this.httpOptions);
  }

}
