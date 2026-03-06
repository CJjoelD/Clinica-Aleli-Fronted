import { Component, inject, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { NavbarComponent } from '../../shared/components/navbar/navbar';
import { PaginaService } from '../../services/pagina.service';

@Component({
  selector: 'app-servicios',
  standalone: true,
  imports: [RouterLink, FooterComponent, NavbarComponent, CommonModule],
  templateUrl: './servicios.html',
  styleUrl: './servicios.css',
})
export class ServiciosComponent {
  private paginaService = inject(PaginaService);
  pageConfig = computed(() => this.paginaService.getPage('servicios'));

  getSection(id: string) {
    return this.pageConfig()?.sections.find(s => s.id === id);
  }
}
