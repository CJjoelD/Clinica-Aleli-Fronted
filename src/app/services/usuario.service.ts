import { Injectable, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../models/usuario.model';
import { firstValueFrom } from 'rxjs';

/**
 * Servicio para la gestión administrativa de usuarios (CRUD).
 */
@Injectable({
    providedIn: 'root'
})
export class UsuarioService {
    private apiUrl = 'http://localhost:3000/api/usuarios';
    private http = inject(HttpClient);
    
    /** Almacena la lista de usuarios recuperada de la API */
    users = signal<Usuario[]>([]);

    constructor() {
        this.loadUsersFromApi();
    }

    async loadUsersFromApi() {
        try {
            const data = await firstValueFrom(this.http.get<Usuario[]>(this.apiUrl));
            this.users.set(data);
        } catch (error: any) {
            console.error('Error al cargar usuarios:', error);
            throw new Error(error.error?.message || 'No se pudieron cargar los usuarios.');
        }
    }

    async addUser(user: Usuario) {
        try {
            const { id, ...userData } = user;
            const newUser = await firstValueFrom(this.http.post<Usuario>(this.apiUrl, userData));
            this.users.update(users => [...users, newUser]);
            return true;
        } catch (error: any) {
            console.error('Error al crear usuario:', error);
            throw new Error(error.error?.message || 'Error al crear el usuario. Verifique los datos.');
        }
    }

    async updateUser(updatedUser: Usuario) {
        try {
            const data = await firstValueFrom(this.http.put<Usuario>(`${this.apiUrl}/${updatedUser.id}`, updatedUser));
            this.users.update(users => users.map(u => u.id === data.id ? data : u));
            return true;
        } catch (error: any) {
            console.error('Error al actualizar usuario:', error);
            throw new Error(error.error?.message || 'Error al actualizar el usuario.');
        }
    }

    async deleteUser(id: number) {
        try {
            await firstValueFrom(this.http.delete(`${this.apiUrl}/${id}`));
            this.users.update(users => users.filter(u => u.id !== id));
            return true;
        } catch (error: any) {
            console.error('Error al eliminar usuario:', error);
            throw new Error(error.error?.message || 'Error al eliminar el usuario.');
        }
    }
}
