import { Component, signal, inject } from '@angular/core';
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
export class App {
  protected readonly title = signal('clinica-aleli-fronted');
  contexts = inject(ChildrenOutletContexts);

  getRouteAnimationData() {
    return this.contexts.getContext('primary')?.route?.snapshot?.data?.['animation'];
  }
}
