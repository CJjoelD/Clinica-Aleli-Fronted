import { Injectable, signal } from '@angular/core';
import { Usuario } from '../models/usuario.model';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    // Usamos signals para un manejo de estado moderno en Angular
    currentUser = signal<Usuario | null>(null);

    constructor() { }

    login(email: string, pass: string): boolean {
        // Aquí iría la llamada a la API. Por ahora simulamos un login exitoso.
        if (email && pass) {
            const mockUser: Usuario = {
                id: 1,
                nombre: 'Usuario Prueba',
                email: email,
                tipo: 'ADMIN',
                rolId: 1
            };
            this.currentUser.set(mockUser);
            return true;
        }
        return false;
    }

    logout() {
        this.currentUser.set(null);
    }

    isAdmin(): boolean {
        return this.currentUser()?.tipo === 'ADMIN';
    }

    register(name: string, email: string, pass: string): boolean {
        // Simulación de registro exitoso
        if (name && email && pass) {
            const newUser: Usuario = {
                id: Math.floor(Math.random() * 1000),
                nombre: name,
                email: email,
                tipo: 'PACIENTE', // Por defecto los nuevos registros son pacientes
                rolId: 2
            };
            this.currentUser.set(newUser);
            return true;
        }
        return false;
    }
}

