import { Component, signal, inject, AfterViewInit } from '@angular/core';
import { RouterOutlet, ChildrenOutletContexts } from '@angular/router';
import { slideInAnimation } from './route-animations';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
  animations: [slideInAnimation]
})
export class App implements AfterViewInit {
  protected readonly title = signal('clinica-aleli-fronted');
  contexts = inject(ChildrenOutletContexts);

  ngAfterViewInit() {
    this.initScrollReveal();
  }

  private initScrollReveal() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.1 });

    // Observar elementos con la clase .reveal
    const elements = document.querySelectorAll('.reveal');
    elements.forEach(el => observer.observe(el));

    // Re-observar cuando la ruta cambie (como es una SPA, necesitamos esto)
    const observerConfig = { childList: true, subtree: true };
    const mutationObserver = new MutationObserver(() => {
        const newElements = document.querySelectorAll('.reveal:not(.active)');
        newElements.forEach(el => observer.observe(el));
    });
    mutationObserver.observe(document.body, observerConfig);
  }

  getRouteAnimationData() {
    return this.contexts.getContext('primary')?.route?.snapshot?.data?.['animation'];
  }
}
