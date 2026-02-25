import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BLOG_DATA, Article } from '../blog/blog-data';
import { FooterComponent } from '../../shared/components/footer/footer.component';

@Component({
  selector: 'app-blog-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, FooterComponent],
  templateUrl: './blog-detail.html',
  styleUrl: './blog-detail.css'
})
export class BlogDetailComponent implements OnInit {
  article: Article | undefined;
  previousArticle: Article | undefined;
  nextArticle: Article | undefined;
  isFirst: boolean = false;
  isLast: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.loadArticle(id);
      window.scrollTo(0, 0);
    });
  }

  loadArticle(id: string): void {
    const currentIndex = BLOG_DATA.findIndex(a => a.id === id);
    if (currentIndex !== -1) {
      this.article = BLOG_DATA[currentIndex];

      // Calculate navigation items
      this.isFirst = currentIndex === 0;
      this.isLast = currentIndex === BLOG_DATA.length - 1;

      this.previousArticle = !this.isFirst ? BLOG_DATA[currentIndex - 1] : undefined;
      this.nextArticle = !this.isLast ? BLOG_DATA[currentIndex + 1] : undefined;

    } else {
      // If article not found, go back to blog list
      this.router.navigate(['/blog']);
    }
  }
}
