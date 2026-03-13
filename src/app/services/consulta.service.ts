import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Consulta } from '../models/consulta.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConsultaService {
  private apiUrl = `${environment.apiUrl}/consultas`;
  private http = inject(HttpClient);

  constructor() {}

  // Obtener todas las consultas (admin)
  getConsultas(): Observable<Consulta[]> {
    return this.http.get<Consulta[]>(this.apiUrl);
  }

  // Obtener consultas del paciente
  getConsultasPorUsuario(usuarioId: number): Observable<Consulta[]> {
    return this.http.get<Consulta[]>(`${this.apiUrl}/usuario/${usuarioId}`);
  }

  // Obtener una consulta por id
  getConsultaById(id: number): Observable<Consulta> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // Crear nueva consulta
  crearConsulta(consulta: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, consulta);
  }
}
