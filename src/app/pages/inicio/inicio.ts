import { Component, inject, computed, signal, OnInit, DestroyRef } from '@angular/core';
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
export class InicioComponent implements OnInit {
  public paginaService = inject(PaginaService);
  private destroyRef = inject(DestroyRef);

  pageConfig = computed(() => this.paginaService.getPage('inicio'));

  // Slider Logic
  currentSlide = signal(0);
  heroImages = [
    '/assets/images/Inicio_Banner.png',
    '/assets/images/INICIO-IMAGEN2.png',
    '/assets/images/INICIO-IMAGEN3.png'
  ];

  ngOnInit() {
    this.startSlider();
  }

  startSlider() {
    const interval = setInterval(() => {
      this.nextSlide();
    }, 4000); // 4 seconds

    this.destroyRef.onDestroy(() => clearInterval(interval));
  }

  nextSlide() {
    this.currentSlide.update(idx => (idx + 1) % this.heroImages.length);
  }

  prevSlide() {
    this.currentSlide.update(idx => (idx - 1 + this.heroImages.length) % this.heroImages.length);
  }

  getSection(id: string) {
    return this.pageConfig()?.sections.find(s => s.id === id);
  }
}
