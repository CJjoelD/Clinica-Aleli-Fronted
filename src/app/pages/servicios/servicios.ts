import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FooterComponent } from '../../shared/components/footer/footer.component';

@Component({
  selector: 'app-servicios',
  standalone: true,
  imports: [RouterLink, FooterComponent],
  templateUrl: './servicios.html',
  styleUrl: './servicios.css',
})
export class ServiciosComponent {

}
