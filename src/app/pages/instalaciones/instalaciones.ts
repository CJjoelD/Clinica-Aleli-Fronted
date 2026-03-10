import { Component, inject, computed } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { NavbarComponent } from '../../shared/components/navbar/navbar';
import { PaginaService } from '../../services/pagina.service';

@Component({
  selector: 'app-instalaciones',
  standalone: true,
  imports: [CommonModule, FooterComponent, NavbarComponent],
  templateUrl: './instalaciones.html',
  styleUrl: './instalaciones.css',
})
export class Instalaciones {
  private paginaService = inject(PaginaService);
  // Usar la configuración específica de 'instalaciones'
  pageConfig = computed(() => this.paginaService.getPage('instalaciones'));

  getSection(id: string) {
    return this.pageConfig()?.sections.find(s => s.id === id);
  }
}
