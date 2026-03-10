import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-paciente-perfil',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="perfil-container">
      <nav class="simple-nav">
        <a [routerLink]="['/paciente']" class="btn-back">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"></polyline></svg>
          Volver al Portal
        </a>
      </nav>

      <main class="perfil-content">
        <header class="perfil-header shadow-soft">
          <div class="avatar-large">{{ user()?.nombre?.charAt(0) }}</div>
          <div class="header-info">
             <h1>Configuración de Perfil</h1>
             <p>Gestiona tu información personal en Clínica Alelí.</p>
          </div>
        </header>

        <section class="perfil-card shadow-premium">
           <div class="form-grid">
              <div class="info-group">
                 <label>Nombre Completo</label>
                 <div class="read-only-field">{{ user()?.nombre }}</div>
              </div>
              <div class="info-group">
                 <label>Correo Electrónico</label>
                 <div class="read-only-field">{{ user()?.email }}</div>
              </div>
              <div class="info-group">
                 <label>ID de Paciente</label>
                 <div class="read-only-field">#{{ user()?.id }}</div>
              </div>
              <div class="info-group">
                 <label>Rol de Usuario</label>
                 <div class="read-only-field">PACIENTE</div>
              </div>
           </div>
           
           <div class="alert-info">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
              <span>Para cambiar tu correo o nombre, por favor contacta con soporte administrativo en la clínica.</span>
           </div>
        </section>
      </main>
    </div>
  `,
  styles: [`
    .perfil-container { min-height: 100vh; background: #f8fafc; padding: 2rem; font-family: 'Inter', sans-serif; }
    .simple-nav { max-width: 900px; margin: 0 auto 2rem; }
    .btn-back { display: flex; align-items: center; gap: 0.5rem; text-decoration: none; color: #64748b; font-weight: 700; transition: color 0.2s; }
    .btn-back:hover { color: #6a1b9a; }

    .perfil-content { max-width: 900px; margin: 0 auto; }
    .perfil-header { background: white; padding: 3rem; border-radius: 30px; display: flex; align-items: center; gap: 2rem; margin-bottom: 2rem; border: 1px solid #f1f5f9; }
    .avatar-large { width: 100px; height: 100px; background: #6a1b9a; color: white; border-radius: 30px; display: flex; align-items: center; justify-content: center; font-size: 3rem; font-weight: 900; box-shadow: 0 15px 30px rgba(106, 27, 154, 0.2); }
    .header-info h1 { margin: 0; color: #1e293b; font-size: 2rem; font-weight: 900; }
    .header-info p { margin: 0.5rem 0 0; color: #64748b; font-size: 1.1rem; }

    .perfil-card { background: white; padding: 3rem; border-radius: 35px; border: 1px solid #f1f5f9; }
    .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; }
    .info-group label { display: block; font-size: 0.8rem; font-weight: 800; color: #94a3b8; text-transform: uppercase; margin-bottom: 0.8rem; letter-spacing: 0.05em; }
    .read-only-field { background: #f8fafc; padding: 1.2rem; border-radius: 15px; color: #1e293b; font-weight: 700; border: 1px solid #f1f5f9; }

    .alert-info { margin-top: 3rem; display: flex; gap: 1rem; background: #eff6ff; color: #1d4ed8; padding: 1.5rem; border-radius: 20px; font-weight: 600; font-size: 0.95rem; align-items: center; }
    .shadow-premium { box-shadow: 0 20px 50px rgba(0,0,0,0.04); }
    .shadow-soft { box-shadow: 0 5px 25px rgba(0,0,0,0.02); }
  `]
})
export class PerfilComponent {
  private authService = inject(AuthService);
  user = this.authService.currentUser;
}
