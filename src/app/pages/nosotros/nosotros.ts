import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { NavbarComponent } from '../../shared/components/navbar/navbar';
import { PaginaService } from '../../services/pagina.service';

@Component({
  selector: 'app-nosotros',
  standalone: true,
  imports: [CommonModule, FooterComponent, NavbarComponent],
  templateUrl: './nosotros.html',
  styleUrl: './nosotros.css',
})
export class NosotrosComponent {
  private paginaService = inject(PaginaService);

  pageConfig = computed(() => this.paginaService.getPage('nosotros'));

  getSection(id: string) {
    return this.pageConfig()?.sections.find(s => s.id === id);
  }
}
