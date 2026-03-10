import { Component, inject, computed, signal, OnInit, DestroyRef } from '@angular/core';
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
export class NosotrosComponent implements OnInit {
  private paginaService = inject(PaginaService);
  private destroyRef = inject(DestroyRef);

  pageConfig = computed(() => this.paginaService.getPage('nosotros'));
  activeSlide = signal(0);

  ngOnInit() {
    this.startSlider();
  }

  startSlider() {
    const section = this.getSection('instalaciones_primer_nivel');
    const max = section?.content.items.length || 0;
    if (max > 0) {
      const interval = setInterval(() => {
        this.nextSlide(max);
      }, 5000);
      this.destroyRef.onDestroy(() => clearInterval(interval));
    }
  }

  getSection(id: string) {
    return this.pageConfig()?.sections.find(s => s.id === id);
  }

  nextSlide(max: number) {
    this.activeSlide.update(v => (v + 1) % max);
  }

  prevSlide(max: number) {
    this.activeSlide.update(v => (v - 1 + max) % max);
  }
}
