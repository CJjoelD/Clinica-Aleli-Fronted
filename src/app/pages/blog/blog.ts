import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { NavbarComponent } from '../../shared/components/navbar/navbar';

@Component({
  selector: 'app-blog',
  imports: [RouterLink, FooterComponent, NavbarComponent],
  templateUrl: './blog.html',
  styleUrl: './blog.css',
})
export class Blog {

}
