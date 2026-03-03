import { Component, inject, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { NavbarComponent } from '../../shared/components/navbar/navbar';
import { PaginaService } from '../../services/pagina.service';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule, RouterLink, FooterComponent, NavbarComponent],
  templateUrl: './blog.html',
  styleUrl: './blog.css',
})
export class Blog {
  private paginaService = inject(PaginaService);

  pageConfig = computed(() => this.paginaService.getPage('blog'));

  getSection(id: string) {
    return this.pageConfig()?.sections.find(s => s.id === id);
  }
}
