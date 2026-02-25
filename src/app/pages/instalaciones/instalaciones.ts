import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../../shared/components/footer/footer.component';

@Component({
  selector: 'app-instalaciones',
  standalone: true,
  imports: [RouterLink, CommonModule, FooterComponent],
  templateUrl: './instalaciones.html',
  styleUrl: './instalaciones.css',
})
export class Instalaciones {

}
