import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class NavbarComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  currentUser = this.authService.currentUser;
  isProfileMenuOpen = signal(false);

  toggleProfileMenu(event?: Event) {
    if (event) event.stopPropagation();
    this.isProfileMenuOpen.update(v => !v);
  }

  logout() {
    this.authService.logout();
    this.isProfileMenuOpen.set(false);
    this.router.navigate(['/inicio']);
  }
}
