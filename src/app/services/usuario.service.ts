import { Injectable, signal, effect } from '@angular/core';
import { Usuario } from '../models/usuario.model';

@Injectable({
    providedIn: 'root'
})
export class UsuarioService {
    private readonly STORAGE_KEY = 'clinica_aleli_users';

    users = signal<Usuario[]>([]);

    constructor() {
        this.loadUsers();

        // Auto-save
        effect(() => {
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.users()));
        });
    }

    private loadUsers() {
        const saved = localStorage.getItem(this.STORAGE_KEY);
        if (saved) {
            try {
                this.users.set(JSON.parse(saved));
            } catch (e) {
                this.setInitialUsers();
            }
        } else {
            this.setInitialUsers();
        }
    }

    private setInitialUsers() {
        this.users.set([
            { id: 1, nombre: 'Admin Principal', email: 'admin@clinicaaleli.com', tipo: 'ADMIN', rolId: 1 },
            { id: 2, nombre: 'Juan Pérez', email: 'juan@prospecto.com', tipo: 'PACIENTE', rolId: 2 }
        ]);
    }

    addUser(user: Usuario) {
        this.users.update(users => [...users, user]);
    }

    updateUser(updatedUser: Usuario) {
        this.users.update(users => users.map(u => u.id === updatedUser.id ? updatedUser : u));
    }

    deleteUser(id: number) {
        this.users.update(users => users.filter(u => u.id !== id));
    }
}
