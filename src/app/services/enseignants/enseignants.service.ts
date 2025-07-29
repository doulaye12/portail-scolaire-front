import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Enseignant } from '../../models';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EnseignantsService {

  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // ✔️ GET : Liste de tous les enseignants
  getAll(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/enseignants`);
  }

  // ✔️ GET : Enseignant par ID
  getById(id: number): Observable<Enseignant> {
    return this.http.get<Enseignant>(`${this.apiUrl}/${id}`);
  }

  // ✔️ POST : Créer un enseignant
  create(enseignant: Enseignant): Observable<Enseignant> {
    return this.http.post<Enseignant>(this.apiUrl, enseignant);
  }

  // ✔️ PUT : Mettre à jour un enseignant
  update(id: number, enseignant: Enseignant): Observable<Enseignant> {
    return this.http.put<Enseignant>(`${this.apiUrl}/${id}`, enseignant);
  }

  // ✔️ DELETE : Supprimer un enseignant
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

}
