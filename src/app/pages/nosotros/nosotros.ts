import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../../shared/components/footer/footer.component';

@Component({
  selector: 'app-nosotros',
  standalone: true,
  imports: [RouterLink, CommonModule, FooterComponent],
  templateUrl: './nosotros.html',
  styleUrl: './nosotros.css',
})
export class NosotrosComponent {

}
