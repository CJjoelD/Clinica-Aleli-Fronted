import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FooterComponent } from '../../shared/components/footer/footer.component';

@Component({
  selector: 'app-blog',
  imports: [RouterLink, FooterComponent],
  templateUrl: './blog.html',
  styleUrl: './blog.css',
})
export class Blog {

}
