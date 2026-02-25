import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../../shared/components/footer/footer.component';

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [RouterLink, CommonModule, FooterComponent],
  templateUrl: './contacto.html',
  styleUrl: './contacto.css',
})
export class ContactoComponent {

}
