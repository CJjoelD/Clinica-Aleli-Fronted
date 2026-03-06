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
          <span *ngIf="!isSidebarCollapsed()" class="admin-title">Panel Control</span>
          <button class="toggle-sidebar" (click)="toggleSidebar()">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
          </button>
        </div>
        
        <nav class="admin-nav">
          <a routerLink="./dashboard" routerLinkActive="active" class="nav-item" title="Inicio">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
            <span *ngIf="!isSidebarCollapsed()">Inicio</span>
          </a>
          <a routerLink="./paginas/servicios" routerLinkActive="active" class="nav-item" title="Servicios">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"></path></svg>
            <span *ngIf="!isSidebarCollapsed()">Servicios</span>
          </a>
          <a routerLink="./paginas/especialidades" routerLinkActive="active" class="nav-item" title="Especialidades">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
            <span *ngIf="!isSidebarCollapsed()">Especialidades</span>
          </a>
          <a routerLink="./paginas/nosotros" routerLinkActive="active" class="nav-item" title="Instalaciones">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg>
            <span *ngIf="!isSidebarCollapsed()">Instalaciones</span>
          </a>
          <a routerLink="./paginas/contacto" routerLinkActive="active" class="nav-item" title="Contacto">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
            <span *ngIf="!isSidebarCollapsed()">Contacto</span>
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
                <span class="user-role">Administrador</span>
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
      background-color: #f8fafc;
      transition: all 0.3s ease;
      font-family: 'Outfit', sans-serif;
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
      background: #6a1b9a; /* Clíncia Alelí Purple */
      color: white;
      display: flex;
      flex-direction: column;
      position: fixed;
      height: 100vh;
      transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      z-index: 1000;
      box-shadow: 4px 0 20px rgba(106, 27, 154, 0.15);
    }

    .sidebar-collapsed .sidebar {
      width: 80px;
    }

    .sidebar-header {
      padding: 2rem 1.5rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;
      border-bottom: 1px solid rgba(255,255,255,0.1);
      position: relative;
    }

    .sidebar-collapsed .sidebar-header {
      flex-direction: column;
      padding: 1.5rem 1rem;
    }

    .admin-logo {
      height: 35px;
      width: auto;
      transition: all 0.3s ease;
    }

    .logo-small { height: 25px; }

    .admin-title {
      font-weight: 800;
      font-size: 0.9rem;
      letter-spacing: 0.5px;
      text-transform: uppercase;
      opacity: 0.9;
    }

    .toggle-sidebar {
      background: rgba(255,255,255,0.15);
      border: none;
      color: white;
      width: 32px;
      height: 32px;
      border-radius: 8px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s;
    }
    .toggle-sidebar:hover { background: rgba(255,255,255,0.25); }

    .admin-nav {
      flex: 1;
      padding: 1.5rem 1rem;
      display: flex;
      flex-direction: column;
      gap: 0.6rem;
    }

    .nav-item {
      padding: 1rem 1.25rem;
      color: rgba(255,255,255,0.7);
      text-decoration: none;
      border-radius: 14px;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      display: flex;
      align-items: center;
      gap: 1.2rem;
      white-space: nowrap;
      overflow: hidden;
      font-weight: 600;
      font-size: 0.95rem;
    }

    .sidebar-collapsed .nav-item { justify-content: center; padding: 1rem 0; gap: 0; }

    .nav-item:hover { background: rgba(255,255,255,0.1); color: white; transform: translateX(5px); }
    .sidebar-collapsed .nav-item:hover { transform: none; }
    
    .nav-item.active { 
      background: white; 
      color: #6a1b9a; 
      box-shadow: 0 10px 20px rgba(0,0,0,0.1);
    }

    .sidebar-footer { padding: 1.5rem; border-top: 1px solid rgba(255,255,255,0.1); }

    .logout-btn-sidebar {
      width: 100%;
      padding: 0.9rem;
      background: rgba(255, 255, 255, 0.1);
      color: white;
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 14px;
      cursor: pointer;
      font-weight: 700;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.75rem;
      transition: all 0.2s;
    }

    .logout-btn-sidebar:hover { background: #ef4444; border-color: #ef4444; color: white; }

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
      height: 80px;
      background: rgba(255, 255, 255, 0.8);
      backdrop-filter: blur(10px);
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 2.5rem;
      position: sticky;
      top: 0;
      z-index: 900;
      border-bottom: 1px solid #f1f5f9;
    }

    .header-breadcrumb .path { color: #94a3b8; font-size: 0.9rem; font-weight: 500; }
    .header-breadcrumb .current { color: #6a1b9a; font-weight: 700; font-size: 0.9rem; letter-spacing: 0.5px; }

    .user-profile-container { position: relative; }

    .user-info {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 0.6rem 1rem;
      border-radius: 16px;
      cursor: pointer;
      transition: all 0.2s;
      background: #f8fafc;
      border: 1px solid #f1f5f9;
    }
    .user-info:hover, .user-info.active { background: #f1f5f9; border-color: #e2e8f0; }

    .user-avatar {
      width: 40px;
      height: 40px;
      background: linear-gradient(135deg, #6a1b9a, #8e24aa);
      color: white;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 800;
      font-size: 1.1rem;
      box-shadow: 0 4px 10px rgba(106, 27, 154, 0.3);
    }

    .user-details { display: flex; flex-direction: column; }
    .user-name { font-weight: 800; color: #1e293b; font-size: 0.9rem; line-height: 1.2; }
    .user-role { font-size: 0.75rem; color: #64748b; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; }

    .chevron-icon { color: #94a3b8; transition: transform 0.3s; }
    .chevron-icon.rotated { transform: rotate(180deg); color: #6a1b9a; }

    /* Profile Dropdown Modal */
    .profile-dropdown {
      position: absolute;
      top: calc(100% + 12px);
      right: 0;
      width: 280px;
      background: white;
      border-radius: 20px;
      box-shadow: 0 20px 40px rgba(0,0,0,0.1);
      border: 1px solid #f1f5f9;
      z-index: 1000;
      overflow: hidden;
      animation: slideDown 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }

    @keyframes slideDown {
      from { opacity: 0; transform: translateY(-15px) scale(0.95); }
      to { opacity: 1; transform: translateY(0) scale(1); }
    }

    .dropdown-header { padding: 1.8rem; background: #fafafa; border-bottom: 1px solid #f1f5f9; }
    .dropdown-user-info { display: flex; align-items: center; gap: 1.2rem; }
    .large-avatar {
      width: 54px; height: 54px; background: #6a1b9a; color: white;
      border-radius: 16px; display: flex; align-items: center; justify-content: center;
      font-weight: 800; font-size: 1.4rem;
      box-shadow: 0 8px 16px rgba(106, 27, 154, 0.2);
    }
    .full-name { display: block; font-weight: 800; color: #1e293b; font-size: 1rem; }
    .email-address { display: block; font-size: 0.8rem; color: #94a3b8; }

    .dropdown-menu { padding: 0.75rem; }
    .menu-item {
      width: 100%; display: flex; align-items: center; gap: 1rem;
      padding: 0.9rem 1.2rem; border: none; background: transparent;
      color: #475569; font-size: 0.9rem; font-weight: 600;
      border-radius: 14px; cursor: pointer; transition: all 0.2s;
    }
    .menu-item:hover { background: #f8fafc; color: #6a1b9a; }
    .menu-item.logout { color: #ef4444; }
    .menu-item.logout:hover { background: #fef2f2; }

    .menu-divider { height: 1px; background: #f1f5f9; margin: 0.6rem; }

    .content-body { padding: 2.5rem; background: #f8fafc; min-height: calc(100vh - 80px); }
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
