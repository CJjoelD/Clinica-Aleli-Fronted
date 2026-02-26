import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { NavbarComponent } from '../../shared/components/navbar/navbar';

@Component({
  selector: 'app-instalaciones',
  standalone: true,
  imports: [CommonModule, FooterComponent, NavbarComponent],
  templateUrl: './instalaciones.html',
  styleUrl: './instalaciones.css',
})
export class Instalaciones {

}
