import { Component, inject, signal, HostListener } from '@angular/core';
import { Router, RouterLink, RouterOutlet, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule],
  template: `
    <div class="admin-container" [class.sidebar-collapsed]="isSidebarCollapsed()">
      <!-- Overlay for mobile/closing dropdowns -->
      <div class="menu-overlay" *ngIf="isProfileMenuOpen()" (click)="toggleProfileMenu()"></div>

      <aside class="sidebar">
        <div class="sidebar-header">
          <img src="assets/images/Logo_ClinicaAleli_-Blanco.png" alt="Logo Clínica Aleli" class="admin-logo" [class.logo-small]="isSidebarCollapsed()">
          <span *ngIf="!isSidebarCollapsed()">Panel Admin</span>
          <button class="toggle-sidebar" (click)="toggleSidebar()">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
          </button>
        </div>
        
        <nav class="admin-nav">
          <a routerLink="./dashboard" routerLinkActive="active" class="nav-item" title="Dashboard">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
            <span *ngIf="!isSidebarCollapsed()">Dashboard</span>
          </a>
          <a routerLink="./paginas" routerLinkActive="active" class="nav-item" title="Editar Páginas">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
            <span *ngIf="!isSidebarCollapsed()">Editar Páginas</span>
          </a>
          <a routerLink="./usuarios" routerLinkActive="active" class="nav-item" title="Usuarios">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
            <span *ngIf="!isSidebarCollapsed()">Usuarios</span>
          </a>
        </nav>

        <div class="sidebar-footer">
          <button (click)="logout()" class="logout-btn-sidebar" [title]="isSidebarCollapsed() ? 'Cerrar Sesión' : ''">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
            <span *ngIf="!isSidebarCollapsed()">Cerrar Sesión</span>
          </button>
        </div>
      </aside>

      <main class="main-content">
        <header class="admin-header">
          <div class="header-breadcrumb">
             <span class="path">Admin</span> / <span class="current">{{getActiveRouteName()}}</span>
          </div>
          
          <div class="user-profile-container">
            <div class="user-info" (click)="toggleProfileMenu($event)" [class.active]="isProfileMenuOpen()">
              <div class="user-avatar">{{currentUser()?.nombre?.charAt(0)}}</div>
              <div class="user-details" *ngIf="!isSmallScreen">
                <span class="user-name">{{currentUser()?.nombre}}</span>
                <span class="user-role">Admin</span>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="chevron-icon" [class.rotated]="isProfileMenuOpen()"><polyline points="6 9 12 15 18 9"></polyline></svg>
            </div>

            <!-- Profile Dropdown Modal-style -->
            <div class="profile-dropdown" *ngIf="isProfileMenuOpen()" (click)="$event.stopPropagation()">
              <div class="dropdown-header">
                <div class="dropdown-user-info">
                  <div class="large-avatar">{{currentUser()?.nombre?.charAt(0)}}</div>
                  <div class="text-info">
                    <span class="full-name">{{currentUser()?.nombre}}</span>
                    <span class="email-address">admin@clinicaaleli.com</span>
                  </div>
                </div>
              </div>
              
              <div class="dropdown-menu">
                <button class="menu-item">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                  Mi Perfil
                </button>
                <button class="menu-item">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                  Configuración
                </button>
                <div class="menu-divider"></div>
                <button class="menu-item logout" (click)="logout()">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                  Cerrar Sesión
                </button>
              </div>
            </div>
          </div>
        </header>
        
        <div class="content-body">
          <router-outlet></router-outlet>
        </div>
      </main>
    </div>
  `,
  styles: [`
    .admin-container {
      display: flex;
      min-height: 100vh;
      background-color: #f1f5f9;
      transition: all 0.3s ease;
    }

    .menu-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      z-index: 950;
      background: rgba(0,0,0,0.02);
    }

    .sidebar {
      width: 260px;
      background: #0f172a;
      color: white;
      display: flex;
      flex-direction: column;
      position: fixed;
      height: 100vh;
      transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      z-index: 1000;
      box-shadow: 4px 0 10px rgba(0,0,0,0.1);
    }

    .sidebar-collapsed .sidebar {
      width: 80px;
    }

    .sidebar-header {
      padding: 1.5rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;
      border-bottom: 1px solid rgba(255,255,255,0.05);
      position: relative;
    }

    .sidebar-collapsed .sidebar-header {
      flex-direction: column;
      padding: 1rem;
    }

    .admin-logo {
      height: 40px;
      width: auto;
      transition: all 0.3s ease;
    }

    .logo-small { height: 30px; }

    .toggle-sidebar {
      background: rgba(255,255,255,0.1);
      border: none;
      color: white;
      width: 32px;
      height: 32px;
      border-radius: 6px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .admin-nav {
      flex: 1;
      padding: 1rem;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .nav-item {
      padding: 0.875rem 1rem;
      color: #94a3b8;
      text-decoration: none;
      border-radius: 10px;
      transition: all 0.2s;
      display: flex;
      align-items: center;
      gap: 1rem;
      white-space: nowrap;
      overflow: hidden;
    }

    .sidebar-collapsed .nav-item { justify-content: center; padding: 0.875rem 0; gap: 0; }

    .nav-item:hover, .nav-item.active { background: rgba(255,255,255,0.05); color: white; }
    .nav-item.active { background: #3b82f6; color: white; box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3); }

    .sidebar-footer { padding: 1rem; border-top: 1px solid rgba(255,255,255,0.05); }

    .logout-btn-sidebar {
      width: 100%;
      padding: 0.75rem;
      background: rgba(239, 68, 68, 0.1);
      color: #ef4444;
      border: none;
      border-radius: 10px;
      cursor: pointer;
      font-weight: 600;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      transition: all 0.2s;
    }

    .logout-btn-sidebar:hover { background: #ef4444; color: white; }

    .main-content {
      flex: 1;
      margin-left: 260px;
      display: flex;
      flex-direction: column;
      transition: margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      width: 100%;
    }

    .sidebar-collapsed .main-content { margin-left: 80px; }

    .admin-header {
      height: 70px;
      background: white;
      box-shadow: 0 1px 3px rgba(0,0,0,0.05);
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 2rem;
      position: sticky;
      top: 0;
      z-index: 900;
    }

    .header-breadcrumb .path { color: #94a3b8; font-size: 0.9rem; }
    .header-breadcrumb .current { color: #1e293b; font-weight: 600; font-size: 0.9rem; }

    .user-profile-container { position: relative; }

    .user-info {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.5rem 0.75rem;
      border-radius: 12px;
      cursor: pointer;
      transition: background 0.2s;
    }
    .user-info:hover, .user-info.active { background: #f1f5f9; }

    .user-avatar {
      width: 38px;
      height: 38px;
      background: linear-gradient(135deg, #3b82f6, #2563eb);
      color: white;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
      font-size: 1rem;
      box-shadow: 0 4px 6px rgba(59, 130, 246, 0.2);
    }

    .user-details { display: flex; flex-direction: column; }
    .user-name { font-weight: 700; color: #1e293b; font-size: 0.875rem; line-height: 1.2; }
    .user-role { font-size: 0.75rem; color: #64748b; font-weight: 500; }

    .chevron-icon { color: #94a3b8; transition: transform 0.3s; }
    .chevron-icon.rotated { transform: rotate(180deg); }

    /* Profile Dropdown Modal */
    .profile-dropdown {
      position: absolute;
      top: calc(100% + 10px);
      right: 0;
      width: 260px;
      background: white;
      border-radius: 16px;
      box-shadow: 0 10px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1);
      border: 1px solid #f1f5f9;
      z-index: 1000;
      overflow: hidden;
      animation: slideDown 0.2s ease-out;
    }

    @keyframes slideDown {
      from { opacity: 0; transform: translateY(-10px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .dropdown-header { padding: 1.5rem; background: #f8fafc; border-bottom: 1px solid #f1f5f9; }
    .dropdown-user-info { display: flex; align-items: center; gap: 1rem; }
    .large-avatar {
      width: 48px; height: 48px; background: #3b82f6; color: white;
      border-radius: 12px; display: flex; align-items: center; justify-content: center;
      font-weight: 700; font-size: 1.25rem;
    }
    .full-name { display: block; font-weight: 700; color: #1e293b; font-size: 0.95rem; }
    .email-address { display: block; font-size: 0.75rem; color: #64748b; }

    .dropdown-menu { padding: 0.5rem; }
    .menu-item {
      width: 100%; display: flex; align-items: center; gap: 0.75rem;
      padding: 0.75rem 1rem; border: none; background: transparent;
      color: #475569; font-size: 0.875rem; font-weight: 500;
      border-radius: 10px; cursor: pointer; transition: all 0.2s;
    }
    .menu-item:hover { background: #f1f5f9; color: #1e293b; }
    .menu-item.logout { color: #ef4444; }
    .menu-item.logout:hover { background: #fef2f2; }

    .menu-divider { height: 1px; background: #f1f5f9; margin: 0.5rem; }

    .content-body { padding: 2rem; background: #f8fafc; min-height: calc(100vh - 70px); }
  `]
})
export class AdminLayoutComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  currentUser = this.authService.currentUser;
  isSidebarCollapsed = signal(false);
  isProfileMenuOpen = signal(false);
  isSmallScreen = false;

  toggleSidebar() {
    this.isSidebarCollapsed.update(v => !v);
  }

  toggleProfileMenu(event?: Event) {
    if (event) event.stopPropagation();
    this.isProfileMenuOpen.update(v => !v);
  }

  @HostListener('window:resize')
  onResize() {
    this.isSmallScreen = window.innerWidth < 768;
  }

  getActiveRouteName(): string {
    const url = this.router.url;
    if (url.includes('dashboard')) return 'Dashboard';
    if (url.includes('paginas')) return 'Gestión de Contenido';
    if (url.includes('usuarios')) return 'Usuarios';
    return 'Panel';
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/inicio']);
  }
}
