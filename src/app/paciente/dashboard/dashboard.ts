import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsultaService } from '../../services/consulta.service';
import { AuthService } from '../../services/auth.service';
import { firstValueFrom } from 'rxjs';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class DashboardComponent implements OnInit {
  private consultaService = inject(ConsultaService);
  private authService = inject(AuthService);
  private router = inject(Router);

  user = this.authService.currentUser;
  consultas = signal<any[]>([]);
  isLoading = signal(true);

  async ngOnInit(): Promise<void> {
    const currentUser = this.user();
    if (currentUser && currentUser.id) {
      try {
        const data = await firstValueFrom(this.consultaService.getConsultasPorUsuario(currentUser.id));
        this.consultas.set(data);
      } catch (error) {
        console.error('Error al cargar consultas:', error);
      } finally {
        this.isLoading.set(false);
      }
    } else {
      this.isLoading.set(false);
    }
  }

  logout() {
    this.authService.logout();
    window.location.href = '/inicio';
  }
}
