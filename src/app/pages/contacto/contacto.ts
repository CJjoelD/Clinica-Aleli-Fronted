import { Component, inject, computed, signal, OnInit, DestroyRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { NavbarComponent } from '../../shared/components/navbar/navbar';
import { PaginaService } from '../../services/pagina.service';
import { FormsModule } from '@angular/forms';
import { ContactoService } from '../../services/contacto.service';

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [CommonModule, FooterComponent, NavbarComponent, FormsModule],
  templateUrl: './contacto.html',
  styleUrl: './contacto.css',
})
export class ContactoComponent implements OnInit {
  private paginaService = inject(PaginaService);
  private contactoService = inject(ContactoService);
  private destroyRef = inject(DestroyRef);

  pageConfig = computed(() => this.paginaService.getPage('contacto'));

  contactoImages = [
    '/assets/images/INSTALACIONES/ESPACIODETRABAJO.png',
    '/assets/images/INSTALACIONES/ACENSOR.png',
    '/assets/images/INSTALACIONES/CAMILLAMORADA.png',
    '/assets/images/INSTALACIONES/CONSULTA.png'
  ];

  activeSlide = signal(0);
  
  contactoData = {
    nombre: '',
    apellido: '',
    email: '',
    mensaje: ''
  };

  successMessage = signal('');
  errorMessage = signal('');

  ngOnInit() {
    this.startSlider();
  }

  startSlider() {
    const interval = setInterval(() => {
      this.nextSlide();
    }, 5000);
    this.destroyRef.onDestroy(() => clearInterval(interval));
  }

  nextSlide() {
    this.activeSlide.update(v => (v + 1) % this.contactoImages.length);
  }

  getSection(id: string) {
    return this.pageConfig()?.sections.find(s => s.id === id);
  }

  onSubmit() {
    this.contactoService.enviarMensaje(this.contactoData).subscribe({
      next: (res) => {
        this.successMessage.set(res.message);
        this.contactoData = { nombre: '', apellido: '', email: '', mensaje: '' };
        setTimeout(() => this.successMessage.set(''), 5000);
      },
      error: (err) => {
        this.errorMessage.set('Error al enviar el mensaje. Por favor intente más tarde.');
        setTimeout(() => this.errorMessage.set(''), 5000);
      }
    });
  }
}
