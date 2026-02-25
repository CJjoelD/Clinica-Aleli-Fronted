import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsultaService } from '../../services/consulta.service';
import { Consulta } from '../../models/consulta.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html'
})
export class DashboardComponent implements OnInit {

  consultas: Consulta[] = [];
  usuarioId = 1; // luego viene del auth

  constructor(private consultaService: ConsultaService) { }

  ngOnInit(): void {
    this.consultaService
      .getConsultasPorUsuario(this.usuarioId)
      .subscribe(data => {
        this.consultas = data;
      });
  }
}
