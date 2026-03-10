import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResultadoMedicoService {
  private apiUrl = 'http://localhost:3000/api/resultados';
  private http = inject(HttpClient);

  constructor() { }

  // Obtener todos los resultados (para admin o si el backend filtra por usuario)
  getResultados(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Obtener resultados de un usuario específico
  getResultadosPorUsuario(usuarioId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/usuario/${usuarioId}`);
  }

  // Obtener un resultado por ID
  getResultadoById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // Buscar resultado por cédula y número de orden
  buscarResultado(cedula: string, numeroOrden: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/buscar`, {
      params: { cedula, numeroOrden }
    });
  }
}
