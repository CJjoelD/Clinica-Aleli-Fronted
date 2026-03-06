import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-admin-usuarios',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="user-management-container">
      <header class="page-header">
        <div class="header-content">
          <h1>Gestión de Usuarios</h1>
          <p>Administra los accesos al panel y gestiona los pacientes del sistema.</p>
        </div>
        <button class="btn-primary" (click)="openAddModal()">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><line x1="19" y1="8" x2="19" y2="14"></line><line x1="16" y1="11" x2="22" y2="11"></line></svg>
          Nuevo Usuario
        </button>
      </header>

      <div class="users-grid">
        <div class="user-card" *ngFor="let user of users()">
          <div class="user-avatar" [class.admin]="user.tipo === 'ADMIN'">
            {{ user.nombre.charAt(0) }}
          </div>
          <div class="user-details">
            <h3>{{ user.nombre }}</h3>
            <p class="email">{{ user.email }}</p>
            <span class="role-badge" [class.admin]="user.tipo === 'ADMIN'">
              {{ user.tipo }}
            </span>
          </div>
          <div class="user-actions">
            <button class="btn-icon edit" (click)="editUser(user)" title="Editar">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
            </button>
            <button class="btn-icon delete" (click)="deleteUser(user.id)" title="Eliminar" *ngIf="user.id !== 1">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Modal para Agregar/Editar -->
      <div class="modal-overlay" *ngIf="showModal()">
        <div class="modal-content">
          <div class="modal-header">
            <h2>{{ isEditing() ? 'Editar Usuario' : 'Nuevo Usuario' }}</h2>
            <button class="close-btn" (click)="closeModal()">×</button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label>Nombre Completo</label>
              <input type="text" [(ngModel)]="currentUser.nombre" class="form-control" placeholder="Ej: Dr. Mario Casas">
            </div>
            <div class="form-group">
              <label>Correo Electrónico</label>
              <input type="email" [(ngModel)]="currentUser.email" class="form-control" placeholder="nombre@ejemplo.com">
            </div>
            <div class="form-group">
              <label>Tipo de Usuario</label>
              <select [(ngModel)]="currentUser.tipo" class="form-control">
                <option value="ADMIN">Administrador (Acceso total)</option>
                <option value="PACIENTE">Paciente / Doctor (Solo consulta)</option>
              </select>
            </div>
            <div class="form-group" *ngIf="!isEditing()">
              <label>Contraseña Temporal</label>
              <input type="password" [(ngModel)]="currentUser.password" class="form-control" placeholder="********">
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn-secondary" (click)="closeModal()">Cancelar</button>
            <button class="btn-primary" (click)="saveUser()">
              {{ isEditing() ? 'Actualizar' : 'Crear Usuario' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .user-management-container { padding: 1rem; }
    
    .page-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2.5rem;
      background: white;
      padding: 1.5rem 2rem;
      border-radius: 20px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.03);
    }

    .page-header h1 { color: #1e293b; font-size: 1.8rem; font-weight: 800; margin: 0; }
    .page-header p { color: #64748b; font-size: 0.95rem; margin: 0.25rem 0 0 0; }

    .users-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 1.5rem;
    }

    .user-card {
      background: white;
      border-radius: 20px;
      padding: 1.5rem;
      display: flex;
      align-items: center;
      gap: 1.2rem;
      border: 1px solid #f1f5f9;
      transition: all 0.3s ease;
      position: relative;
    }

    .user-card:hover { transform: translateY(-5px); box-shadow: 0 15px 30px rgba(0,0,0,0.06); border-color: #6a1b9a; }

    .user-avatar {
      width: 60px; height: 60px;
      border-radius: 18px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.5rem;
      font-weight: 800;
      color: #7c4dff;
      background: #f3e5f5;
    }

    .user-avatar.admin { color: white; background: #6a1b9a; }

    .user-details h3 { margin: 0; font-size: 1.1rem; color: #1e293b; }
    .user-details .email { margin: 4px 0 8px; font-size: 0.85rem; color: #64748b; }

    .role-badge {
      font-size: 0.7rem;
      font-weight: 800;
      padding: 4px 10px;
      border-radius: 20px;
      background: #f1f5f9;
      color: #64748b;
      text-transform: uppercase;
    }

    .role-badge.admin { background: #f5edfa; color: #6a1b9a; }

    .user-actions {
      position: absolute;
      top: 1rem;
      right: 1rem;
      display: flex;
      gap: 0.5rem;
    }

    .btn-icon {
      width: 32px; height: 32px;
      border-radius: 8px;
      border: none;
      background: #f8fafc;
      color: #64748b;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s;
    }

    .btn-icon.edit:hover { background: #f5edfa; color: #6a1b9a; }
    .btn-icon.delete:hover { background: #fee2e2; color: #ef4444; }

    .btn-primary {
      background: #6a1b9a;
      color: white;
      border: none;
      padding: 12px 24px;
      border-radius: 12px;
      font-weight: 800;
      display: flex;
      align-items: center;
      gap: 0.75rem;
      cursor: pointer;
      box-shadow: 0 4px 12px rgba(106, 27, 154, 0.2);
    }

    .btn-primary:hover { background: #4a148c; transform: translateY(-2px); }

    /* Modal Styles */
    .modal-overlay {
      position: fixed; top: 0; left: 0; width: 100%; height: 100%;
      background: rgba(0,0,0,0.5); display: flex; align-items: center;
      justify-content: center; z-index: 1000; backdrop-filter: blur(4px);
    }

    .modal-content {
      background: white; border-radius: 24px; width: 90%; max-width: 500px;
      padding: 2.5rem; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.25);
    }

    .modal-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; }
    .close-btn { background: none; border: none; font-size: 2rem; color: #94a3b8; cursor: pointer; }

    .form-group { margin-bottom: 1.5rem; display: flex; flex-direction: column; gap: 0.5rem; }
    .form-group label { font-size: 0.9rem; font-weight: 800; color: #475569; }
    .form-control {
      padding: 0.8rem 1.2rem; border: 1px solid #e2e8f0;
      border-radius: 12px; font-size: 1rem;
    }

    .modal-footer { display: flex; justify-content: flex-end; gap: 1rem; margin-top: 2rem; }
    .btn-secondary { background: #f1f5f9; color: #475569; border: none; padding: 12px 20px; border-radius: 12px; font-weight: 800; cursor: pointer; }
  `]
})
export class UsuariosComponent {
  private usuarioService = inject(UsuarioService);
  users = this.usuarioService.users;

  showModal = signal(false);
  isEditing = signal(false);

  currentUser: Usuario = this.emptyUser();

  emptyUser(): Usuario {
    return { id: 0, nombre: '', email: '', tipo: 'PACIENTE', rolId: 2, password: '' };
  }

  openAddModal() {
    this.currentUser = this.emptyUser();
    this.isEditing.set(false);
    this.showModal.set(true);
  }

  editUser(user: Usuario) {
    this.currentUser = { ...user };
    this.isEditing.set(true);
    this.showModal.set(true);
  }

  closeModal() {
    this.showModal.set(false);
  }

  saveUser() {
    if (this.isEditing()) {
      this.usuarioService.updateUser(this.currentUser);
    } else {
      this.currentUser.id = Date.now();
      this.usuarioService.addUser(this.currentUser);
    }
    this.closeModal();
  }

  deleteUser(id: number) {
    if (confirm('¿Estás seguro de eliminar a este usuario?')) {
      this.usuarioService.deleteUser(id);
    }
  }
}
