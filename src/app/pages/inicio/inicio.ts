import { Component, inject, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { NavbarComponent } from '../../shared/components/navbar/navbar';
import { PaginaService } from '../../services/pagina.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [RouterLink, FooterComponent, NavbarComponent, CommonModule],
  templateUrl: './inicio.html',
  styleUrl: './inicio.css',
})
export class InicioComponent {
  public paginaService = inject(PaginaService);

  pageConfig = computed(() => this.paginaService.getPage('inicio'));

  getSection(id: string) {
    return this.pageConfig()?.sections.find(s => s.id === id);
  }
}
