import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { NavbarComponent } from '../../shared/components/navbar/navbar';

@Component({
  selector: 'app-servicios',
  standalone: true,
  imports: [RouterLink, FooterComponent, NavbarComponent],
  templateUrl: './servicios.html',
  styleUrl: './servicios.css',
})
export class ServiciosComponent {

}
