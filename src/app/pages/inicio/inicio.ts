import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FooterComponent } from '../../shared/components/footer/footer.component';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [RouterLink, FooterComponent],
  templateUrl: './inicio.html',
  styleUrl: './inicio.css',
})
export class InicioComponent {

}
