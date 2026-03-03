import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-admin-usuarios',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="usuarios-container">
      <header class="section-header">
        <h1>Gestión de Usuarios</h1>
        <p>Administra los accesos y roles de los usuarios de la plataforma.</p>
      </header>

      <div class="stats-grid">
        <div class="stat-card">
          <span class="stat-value">0</span>
          <span class="stat-label">Total Usuarios</span>
        </div>
        <div class="stat-card">
          <span class="stat-value">0</span>
          <span class="stat-label">Administradores</span>
        </div>
        <div class="stat-card">
          <span class="stat-value">0</span>
          <span class="stat-label">Médicos</span>
        </div>
      </div>

      <div class="table-container">
        <table class="user-table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Email</th>
              <th>Rol</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colspan="5" class="empty-state">No hay usuarios registrados todavía.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
    styles: [`
    .usuarios-container { padding: 1rem; }
    .section-header { margin-bottom: 2rem; }
    .section-header h1 { color: #1e293b; margin-bottom: 0.5rem; }
    .section-header p { color: #64748b; }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1.5rem;
      margin-bottom: 2rem;
    }

    .stat-card {
      background: white;
      padding: 1.5rem;
      border-radius: 12px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .stat-value { font-size: 2rem; font-weight: 700; color: #1e293b; }
    .stat-label { color: #64748b; font-size: 0.9rem; }

    .table-container {
      background: white;
      border-radius: 12px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
      overflow: hidden;
    }

    .user-table {
      width: 100%;
      border-collapse: collapse;
      text-align: left;
    }

    .user-table th {
      background: #f8fafc;
      padding: 1rem;
      color: #64748b;
      font-weight: 600;
      border-bottom: 1px solid #e2e8f0;
    }

    .user-table td {
      padding: 1rem;
      border-bottom: 1px solid #e2e8f0;
      color: #334155;
    }

    .empty-state {
      text-align: center;
      padding: 3rem !important;
      color: #94a3b8 !important;
      font-style: italic;
    }

    .badge {
      padding: 0.25rem 0.75rem;
      border-radius: 999px;
      font-size: 0.75rem;
      font-weight: 600;
    }

    .badge.active { background: #dcfce7; color: #166534; }

    .edit-btn {
      padding: 0.5rem 1rem;
      background: #f1f5f9;
      color: #64748b;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      font-weight: 500;
    }

    .edit-btn:hover { background: #e2e8f0; }
  `]
})
export class UsuariosComponent { }
