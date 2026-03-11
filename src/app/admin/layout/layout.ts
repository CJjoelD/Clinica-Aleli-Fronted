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
          <a routerLink="/inicio" class="nav-item web-link" title="Ver Sitio Web">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
            <span *ngIf="!isSidebarCollapsed()">Ir al Sitio Web</span>
          </a>
          <div class="nav-divider"></div>
          <a routerLink="./dashboard" routerLinkActive="active" class="nav-item" title="Inicio">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
            <span *ngIf="!isSidebarCollapsed()">Inicio</span>
          </a>
          <a routerLink="./cms" routerLinkActive="active" class="nav-item" title="Contenido Web">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
            <span *ngIf="!isSidebarCollapsed()">Servicios y Textos</span>
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
                <a class="menu-item" [routerLink]="['/paciente']">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                  Mi Portal Paciente
                </a>
                <div class="menu-divider"></div>
                <button class="menu-item logout" (click)="logout()">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                  Cerrar Sesión Real
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
      background-color: #050810;
      transition: all 0.3s ease;
      font-family: 'Outfit', sans-serif;
      color: #f8fafc;
    }

    .menu-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      z-index: 950;
      background: rgba(0,0,0,0.5);
      backdrop-filter: blur(4px);
    }

    .sidebar {
      width: 260px;
      background: #0a0f1d; 
      color: white;
      display: flex;
      flex-direction: column;
      position: fixed;
      height: 100vh;
      transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      z-index: 1000;
      border-right: 1px solid rgba(255,255,255,0.05);
      box-shadow: 10px 0 30px rgba(0,0,0,0.3);
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
      border-bottom: 1px solid rgba(255,255,255,0.05);
      position: relative;
    }

    .admin-logo {
      height: 40px;
      width: auto;
      transition: all 0.3s ease;
    }

    .logo-small { height: 30px; }

    .nav-divider {
      height: 1px;
      background: rgba(255,255,255,0.05);
      margin: 1rem 1.2rem;
    }

    .web-link {
        margin-bottom: 0.5rem;
        background: rgba(99, 102, 241, 0.1);
        border: 1px solid rgba(99, 102, 241, 0.2);
        color: #818cf8 !important;
    }

    .admin-title {
      font-weight: 800;
      font-size: 0.8rem;
      letter-spacing: 1px;
      text-transform: uppercase;
      color: #94a3b8;
    }

    .toggle-sidebar {
      background: rgba(255,255,255,0.05);
      border: 1px solid rgba(255,255,255,0.1);
      color: #64748b;
      width: 32px;
      height: 32px;
      border-radius: 8px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s;
    }
    .toggle-sidebar:hover { background: rgba(99, 102, 241, 0.1); color: #818cf8; }

    .admin-nav {
      flex: 1;
      padding: 1.5rem 1rem;
      display: flex;
      flex-direction: column;
      gap: 0.4rem;
    }

    .nav-item {
      padding: 0.85rem 1.1rem;
      color: #94a3b8;
      text-decoration: none;
      border-radius: 12px;
      transition: all 0.2s ease;
      display: flex;
      align-items: center;
      gap: 1rem;
      font-weight: 600;
      font-size: 0.9rem;
    }

    .nav-item:hover { background: rgba(255,255,255,0.03); color: #fff; }
    
    .nav-item.active { 
      background: rgba(139, 92, 246, 0.15); 
      color: #a78bfa; 
      border: 1px solid rgba(139, 92, 246, 0.2);
    }

    .sidebar-footer { padding: 1.5rem; border-top: 1px solid rgba(255,255,255,0.05); }

    .logout-btn-sidebar {
      width: 100%;
      padding: 0.8rem;
      background: rgba(239, 68, 68, 0.05);
      color: #ef4444;
      border: 1px solid rgba(239, 68, 68, 0.1);
      border-radius: 12px;
      cursor: pointer;
      font-weight: 700;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.75rem;
      transition: 0.2s;
    }

    .logout-btn-sidebar:hover { background: #ef4444; color: white; }

    .main-content {
      flex: 1;
      margin-left: 260px;
      display: flex;
      flex-direction: column;
      transition: margin-left 0.3s ease;
      width: calc(100% - 260px);
    }

    .sidebar-collapsed .main-content { margin-left: 80px; width: calc(100% - 80px); }

    .admin-header {
      height: 70px;
      background: rgba(10, 15, 29, 0.8);
      backdrop-filter: blur(12px);
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 2.5rem;
      position: sticky;
      top: 0;
      z-index: 900;
      border-bottom: 1px solid rgba(255,255,255,0.05);
    }

    .header-breadcrumb .path { color: #475569; font-size: 0.85rem; }
    .header-breadcrumb .current { color: #f8fafc; font-weight: 700; font-size: 0.85rem; letter-spacing: 0.5px; }

    .user-info {
      display: flex;
      align-items: center;
      gap: 0.8rem;
      padding: 0.5rem 0.8rem;
      border-radius: 12px;
      cursor: pointer;
      transition: 0.2s;
      background: rgba(255,255,255,0.02);
      border: 1px solid rgba(255,255,255,0.05);
    }
    .user-info:hover { background: rgba(255,255,255,0.05); }

    .user-avatar {
      width: 32px; height: 32px;
      background: linear-gradient(135deg, #7c3aed, #4f46e5);
      color: white; border-radius: 8px;
      display: flex; align-items: center; justify-content: center;
      font-weight: 800; font-size: 0.9rem;
    }

    .user-name { font-weight: 700; color: #fff; font-size: 0.85rem; }
    .user-role { font-size: 0.7rem; color: #64748b; font-weight: 600; }

    .chevron-icon { color: #475569; transition: 0.3s; }

    .profile-dropdown {
      position: absolute;
      top: calc(100% + 10px);
      right: 0;
      width: 260px;
      background: #0a0f1d;
      border-radius: 16px;
      box-shadow: 0 20px 50px rgba(0,0,0,0.5);
      border: 1px solid rgba(255,255,255,0.1);
      z-index: 1000;
      overflow: hidden;
    }

    .dropdown-header { padding: 1.5rem; background: rgba(255,255,255,0.02); border-bottom: 1px solid rgba(255,255,255,0.05); }
    .dropdown-user-info { display: flex; align-items: center; gap: 1rem; }
    .large-avatar {
      width: 44px; height: 44px; background: #6366f1; color: white;
      border-radius: 12px; display: flex; align-items: center; justify-content: center;
      font-weight: 800; font-size: 1.2rem;
    }
    .full-name { display: block; font-weight: 800; color: #fff; font-size: 0.95rem; }
    .email-address { display: block; font-size: 0.75rem; color: #64748b; }

    .dropdown-menu { padding: 0.5rem; }
    .menu-item {
      width: 100%; display: flex; align-items: center; gap: 0.8rem;
      padding: 0.8rem 1rem; border: none; background: transparent;
      color: #94a3b8; font-size: 0.85rem; font-weight: 600;
      border-radius: 10px; cursor: pointer; transition: 0.2s;
    }
    .menu-item:hover { background: rgba(255,255,255,0.05); color: #fff; }
    .menu-item.logout { color: #f87171; }
    .menu-item.logout:hover { background: rgba(248, 113, 113, 0.1); }

    .menu-divider { height: 1px; background: rgba(255,255,255,0.05); margin: 0.5rem; }

    .content-body { flex: 1; padding: 0; background: #050810; overflow-y: auto; }
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
    // Forzamos una recarga completa al inicio para limpiar cualquier residuo de estado
    window.location.href = '/inicio';
  }
}
