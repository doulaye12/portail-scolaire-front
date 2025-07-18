import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClasseService {

  apiUrl = environment.apiUrl
  constructor(private http: HttpClient) { }

  getAllClasses() {
    return this.http.get(`${this.apiUrl}/classes`);
  }

  getClassById(id: number) {
    return this.http.get(`${this.apiUrl}/classes/${id}`);
  }

  createClass(classe: any) {
    return this.http.post(`${this.apiUrl}/classes`, classe);
  }
  updateClass(id: number, classe: any) {
    return this.http.put(`${this.apiUrl}/classes/${id}`, classe);
  }

  deleteClass(id: number) {
    return this.http.delete(`${this.apiUrl}/classes/${id}`);
  }
}
