import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Consulta } from '../models/consulta.model';

@Injectable({
  providedIn: 'root'
})
export class ConsultaService {

  private apiUrl = 'http://localhost:3000/consultas'; // backend

  constructor(private http: HttpClient) {}

  // Obtener consultas del paciente
  getConsultasPorUsuario(usuarioId: number): Observable<Consulta[]> {
    return this.http.get<Consulta[]>(`${this.apiUrl}/usuario/${usuarioId}`);
  }

  // Obtener una consulta por id
  getConsultaById(id: number): Observable<Consulta> {
    return this.http.get<Consulta>(`${this.apiUrl}/${id}`);
  }

  // Crear nueva consulta
  crearConsulta(consulta: Consulta): Observable<Consulta> {
    return this.http.post<Consulta>(this.apiUrl, consulta);
  }
}
