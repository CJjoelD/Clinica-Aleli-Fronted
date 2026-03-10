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
  isMobileMenuOpen = signal(false);

  isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  toggleProfileMenu(event?: Event) {
    if (event) event.stopPropagation();
    this.isProfileMenuOpen.update(v => !v);
  }

  toggleMobileMenu(event?: Event) {
    if (event) event.stopPropagation();
    this.isMobileMenuOpen.update(v => !v);
  }

  closeMenus() {
    this.isProfileMenuOpen.set(false);
    this.isMobileMenuOpen.set(false);
  }

  logout() {
    this.authService.logout();
    this.closeMenus();
    window.location.href = '/inicio';
  }
}
