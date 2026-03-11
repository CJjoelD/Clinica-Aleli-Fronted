import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-forbidden',
    standalone: true,
    imports: [RouterLink],
    template: `
    <div class="forbidden-container">
      <div class="forbidden-card">
        <div class="icon-wrapper">
          <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
          </svg>
        </div>
        <h1>Acceso Denegado</h1>
        <p>Lo sentimos, no tienes los permisos necesarios para acceder a este apartado de administración.</p>
        <div class="actions">
          <a routerLink="/inicio" class="btn-home">Volver al Inicio</a>
          <a routerLink="/paciente" class="btn-dashboard">Ir a mi Perfil</a>
        </div>
      </div>
    </div>
  `,
    styles: [`
    .forbidden-container {
      height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #f8fafc;
      padding: 2rem;
      font-family: 'Outfit', sans-serif;
    }
    .forbidden-card {
      background: white;
      padding: 4rem 3rem;
      border-radius: 40px;
      box-shadow: 0 40px 100px rgba(0,0,0,0.08);
      text-align: center;
      max-width: 500px;
      width: 100%;
    }
    .icon-wrapper {
      width: 120px;
      height: 120px;
      background: #fef2f2;
      color: #ef4444;
      border-radius: 35px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 2.5rem;
    }
    h1 {
      color: #1e293b;
      font-size: 2.2rem;
      font-weight: 850;
      margin-bottom: 1rem;
    }
    p {
      color: #64748b;
      font-size: 1.1rem;
      line-height: 1.6;
      margin-bottom: 3rem;
    }
    .actions {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    .btn-home {
      background: #6a1b9a;
      color: white;
      padding: 1.2rem;
      border-radius: 16px;
      font-weight: 800;
      text-decoration: none;
      transition: all 0.3s;
    }
    .btn-home:hover {
      background: #4a148c;
      transform: translateY(-3px);
      box-shadow: 0 15px 30px rgba(106, 27, 154, 0.2);
    }
    .btn-dashboard {
      background: #f1f5f9;
      color: #475569;
      padding: 1.2rem;
      border-radius: 16px;
      font-weight: 800;
      text-decoration: none;
      transition: all 0.2s;
    }
    .btn-dashboard:hover {
      background: #e2e8f0;
    }
  `]
})
export class ForbiddenComponent { }
