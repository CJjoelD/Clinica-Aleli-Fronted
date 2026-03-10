import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { AuthService } from '../../services/auth.service';
import { Usuario } from '../../models/usuario.model';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';

/**
 * Componente administrativo para la gestión de usuarios del sistema.
 * Permite visualizar, crear, editar y eliminar usuarios con retroalimentación visual.
 * Ahora incluye campo de cédula y búsqueda mejorada.
 */
@Component({
  selector: 'app-admin-usuarios',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="user-management-container">
      <header class="page-header shadow-premium">
        <div class="header-content">
          <h1>Gestión de Usuarios</h1>
          <p>Administra los accesos al panel y gestiona los pacientes del sistema.</p>
        </div>
        <div class="header-actions">
           <div class="search-box">
             <input type="text" [(ngModel)]="searchTerm" (ngModelChange)="onFilterChange()" placeholder="Buscar por nombre, email o cédula..." class="form-control">
           </div>
           <button class="btn-primary" (click)="openAddModal()">
             <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><line x1="19" y1="8" x2="19" y2="14"></line><line x1="16" y1="11" x2="22" y2="11"></line></svg>
             Nuevo Usuario
           </button>
        </div>
      </header>

      <div class="users-grid">
        <div class="user-card shadow-premium" *ngFor="let user of filteredUsers(); trackBy: trackById" [id]="'user-' + user.id">
          <div class="user-avatar" [class.admin]="user.tipo === 'ADMIN'">
            {{ user.nombre.charAt(0) || 'U' }}
          </div>
          <div class="user-details">
            <h3 [class.admin-text]="user.tipo === 'ADMIN'">{{ user.nombre }}</h3>
            <p class="email">{{ user.email }}</p>
            <div class="cedula-badge" *ngIf="user.cedula">
               <small>C.I.:</small> {{ user.cedula }}
            </div>
            <span class="role-badge" [class.admin]="user.tipo === 'ADMIN'">
              {{ user.tipo }}
            </span>
          </div>
          <div class="user-actions">
            <button class="btn-icon edit" (click)="editUser(user)" title="Editar">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
            </button>
            <button class="btn-icon delete" (click)="deleteUser(user.id!)" title="Eliminar" *ngIf="user.id !== 1">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Modal para Agregar/Editar -->
      <div class="modal-overlay" *ngIf="showModal()">
        <div class="modal-card">
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
              <label>Cédula de Identidad (Opcional)</label>
              <input type="text" [(ngModel)]="currentUser.cedula" class="form-control" placeholder="Ej: 1712345678">
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
            <button class="btn-save" (click)="saveUser()">
              {{ isEditing() ? 'Actualizar' : 'Crear Usuario' }}
            </button>
          </div>
        </div>
      </div>

      <!-- Toast Notification System -->
      <div class="toast-nav shadow-premium" *ngIf="showToast()" [class.error]="toastType() === 'error'" [class.success]="toastType() === 'success'">
          <div class="toast-icon">
              <svg *ngIf="toastType() === 'error'" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
              <svg *ngIf="toastType() === 'success'" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
          </div>
          <p>{{ toastMsg() }}</p>
      </div>
    </div>
  `,
  styles: [`
    .user-management-container { padding: 1.5rem; background: #f8fafc; min-height: 100vh; }
    
    .page-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2.5rem;
      background: white;
      padding: 1.5rem 2rem;
      border-radius: 20px;
    }

    .header-actions { display: flex; gap: 1rem; align-items: center; }
    .search-box { min-width: 300px; }
    .search-box input { width: 100%; border-radius: 12px; }

    .page-header h1 { color: #1e293b; font-size: 1.8rem; font-weight: 800; margin: 0; }
    .page-header p { color: #64748b; font-size: 0.95rem; margin: 0.25rem 0 0 0; }

    .users-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
      gap: 1.5rem;
    }

    .user-card {
      background: white;
      border-radius: 24px;
      padding: 2rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      transition: all 0.3s ease;
      position: relative;
      border: 1px solid #f1f5f9;
    }

    .user-card:hover { transform: translateY(-5px); border-color: #6a1b9a; box-shadow: 0 20px 40px rgba(106, 27, 154, 0.1); }

    .user-avatar {
      width: 70px; height: 70px;
      border-radius: 22px;
      display: flex; align-items: center; justify-content: center;
      font-size: 1.8rem; font-weight: 800; color: #7c4dff; background: #f3e5f5;
      margin-bottom: 1.2rem;
    }

    .user-avatar.admin { color: white; background: #6a1b9a; }

    .user-details h3 { margin: 0; font-size: 1.2rem; color: #1e293b; font-weight: 800; }
    .user-details h3.admin-text { color: #6a1b9a; }
    .user-details .email { margin: 4px 0 10px; font-size: 0.9rem; color: #64748b; }

    .cedula-badge {
      background: #f1f5f9;
      color: #334155;
      padding: 0.3rem 0.8rem;
      border-radius: 8px;
      font-size: 0.8rem;
      font-weight: 700;
      margin-bottom: 0.8rem;
    }

    .role-badge {
      font-size: 0.75rem; font-weight: 800; padding: 5px 12px; border-radius: 20px;
      background: #f1f5f9; color: #64748b; text-transform: uppercase;
    }

    .role-badge.admin { background: #f5edfa; color: #6a1b9a; }

    .user-actions { position: absolute; top: 1rem; right: 1rem; display: flex; gap: 0.5rem; }

    .btn-icon {
      width: 36px; height: 36px; border-radius: 10px; border: none;
      background: #f8fafc; color: #64748b; cursor: pointer;
      display: flex; align-items: center; justify-content: center; transition: all 0.2s;
    }

    .btn-icon.edit:hover { background: #f5edfa; color: #6a1b9a; }
    .btn-icon.delete:hover { background: #fee2e2; color: #ef4444; }

    .btn-primary {
      background: #6a1b9a; color: white; border: none; padding: 12px 24px;
      border-radius: 12px; font-weight: 800; display: flex; align-items: center;
      gap: 0.75rem; cursor: pointer; transition: 0.3s;
    }

    .btn-primary:hover { background: #4a148c; transform: translateY(-2px); }

    /* Modal Styles */
    .modal-overlay {
      position: fixed; inset: 0; background: rgba(15, 23, 42, 0.4);
      backdrop-filter: blur(8px); display: flex; align-items: center;
      justify-content: center; z-index: 1000;
    }

    .modal-card {
      background: white; border-radius: 30px; width: 90%; max-width: 500px;
      padding: 0; overflow: hidden; box-shadow: 0 40px 100px rgba(0,0,0,0.25);
      max-height: 90vh; display: flex; flex-direction: column;
    }

    .modal-header { padding: 2rem; background: #6a1b9a; color: white; display: flex; justify-content: space-between; align-items: center; flex-shrink: 0; }
    .modal-header h2 { margin: 0; font-size: 1.5rem; font-weight: 850; }
    .close-btn { background: none; border: none; font-size: 2rem; color: white; cursor: pointer; opacity: 0.7; }
    .close-btn:hover { opacity: 1; }

    .modal-body { 
      padding: 2.5rem; 
      overflow-y: auto; 
      flex: 1;
      scrollbar-width: thin;
      scrollbar-color: #6a1b9a #f1f5f9;
    }
    .modal-body::-webkit-scrollbar { width: 6px; }
    .modal-body::-webkit-scrollbar-thumb { background: #6a1b9a; border-radius: 10px; }

    .form-group { margin-bottom: 1.5rem; display: flex; flex-direction: column; gap: 0.5rem; }
    .form-group label { font-size: 0.85rem; font-weight: 800; color: #64748b; text-transform: uppercase; }
    .form-control { padding: 1rem; border: 2px solid #f1f5f9; border-radius: 12px; font-size: 1rem; font-weight: 600; }
    .form-control:focus { outline: none; border-color: #6a1b9a; background: #fdfbff; }

    .modal-footer { padding: 2rem 2.5rem; display: flex; justify-content: flex-end; gap: 1rem; background: #f8fafc; flex-shrink: 0; }
    .btn-save { padding: 1rem 2.5rem; background: #6a1b9a; color: white; border: none; border-radius: 12px; font-weight: 800; cursor: pointer; }
    .btn-secondary { background: #cbd5e1; color: #1e293b; border: none; padding: 1rem 2rem; border-radius: 12px; font-weight: 800; cursor: pointer; }

    .shadow-premium { box-shadow: 0 10px 30px -5px rgba(0, 0, 0, 0.05), 0 4px 12px -5px rgba(0, 0, 0, 0.1); }

    /* Toast */
    .toast-nav {
      position: fixed; bottom: 30px; right: 30px; padding: 1.2rem 2rem; border-radius: 20px; background: white;
      display: flex; align-items: center; gap: 1.2rem; z-index: 9999;
      animation: slideInRight 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      border-left: 6px solid #6a1b9a;
    }
    .toast-nav.error { border-left-color: #ef4444; }
    .toast-nav.success { border-left-color: #10b981; }
    @keyframes slideInRight { from { opacity: 0; transform: translateX(50px); } to { opacity: 1; transform: translateX(0); } }
  `]
})
export class UsuariosComponent implements OnInit {
  private usuarioService = inject(UsuarioService);
  private authService = inject(AuthService);

  users = this.usuarioService.users;
  searchTerm = '';
  private filterSubject = new Subject<string>();

  filteredUsers = computed(() => {
    const term = this.searchTerm.toLowerCase();
    const allUsers = this.users();
    if (!term) return allUsers;
    return allUsers.filter(u =>
      (u.nombre?.toLowerCase() || '').includes(term) ||
      (u.email?.toLowerCase() || '').includes(term) ||
      (u.cedula && u.cedula.includes(term))
    );
  });

  showModal = signal(false);
  isEditing = signal(false);

  showToast = signal(false);
  toastType = signal<'success' | 'error'>('success');
  toastMsg = signal('');

  currentUser: Usuario = this.emptyUser();

  emptyUser(): Usuario {
    return { nombre: '', email: '', tipo: 'PACIENTE', password: '', cedula: '' };
  }

  ngOnInit() {
    this.filterSubject.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(term => {
      // Just for logging or manual trigger if needed, computed handles it
    });
  }

  onFilterChange() {
    this.filterSubject.next(this.searchTerm);
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

  private triggerToast(msg: string, type: 'success' | 'error' = 'success') {
    this.toastMsg.set(msg);
    this.toastType.set(type);
    this.showToast.set(true);
    setTimeout(() => this.showToast.set(false), 4000);
  }

  async saveUser() {
    if (!this.currentUser.nombre || !this.currentUser.email) {
      this.triggerToast('Por favor, completa todos los campos obligatorios (Nombre y Correo).', 'error');
      return;
    }

    try {
      if (this.isEditing() && this.currentUser.id) {
        await this.usuarioService.updateUser(this.currentUser);

        // Si el admin se está editando a sí mismo, actualizar su sesión local
        if (this.authService.currentUser()?.id === this.currentUser.id) {
          const updatedLocalUser = { ...this.authService.currentUser(), ...this.currentUser };
          // Nota: El backend en el update no devuelve el nombre del rol expandido, 
          // así que mapeamos el tipo 'ADMIN' -> 'Admin' para que coincida con isAdmin()
          if (this.currentUser.tipo === 'ADMIN') {
            updatedLocalUser.rol = 'Admin';
          } else {
            updatedLocalUser.rol = 'Paciente';
          }

          localStorage.setItem('user', JSON.stringify(updatedLocalUser));
          this.authService.currentUser.set(updatedLocalUser);
        }

        this.triggerToast('Usuario actualizado correctamente');
      } else {
        await this.usuarioService.addUser(this.currentUser);
        this.triggerToast('Usuario creado correctamente');
      }
      this.closeModal();
    } catch (error: any) {
      this.triggerToast(error.error?.message || error.message || 'Error al procesar la solicitud', 'error');
    }
  }

  async deleteUser(id: number) {
    if (confirm('¿Estás seguro de eliminar a este usuario?')) {
      try {
        await this.usuarioService.deleteUser(id);
        this.triggerToast('Usuario eliminado');
      } catch (error: any) {
        this.triggerToast(error.error?.message || error.message || 'Error al eliminar', 'error');
      }
    }
  }

  trackById(index: number, item: Usuario) {
    return item.id;
  }
}
