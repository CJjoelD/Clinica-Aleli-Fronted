import { Injectable, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../models/usuario.model';
import { tap } from 'rxjs/operators';
import { firstValueFrom } from 'rxjs';

/**
 * Servicio encargado de la gestión de autenticación de usuarios.
 * Maneja el inicio de sesión, registro, cierre de sesión y persistencia del estado.
 */
@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private apiUrl = 'http://localhost:3000/api';
    private http = inject(HttpClient);
    
    /** Señal reactiva que almacena los datos del usuario logueado actualmente */
    currentUser = signal<any | null>(null);

    constructor() {
        // Al iniciar, intentamos recuperar el usuario del localStorage
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
            this.currentUser.set(JSON.parse(savedUser));
        }
    }

    /**
     * Autentica a un usuario y guarda su token en el almacenamiento local.
     * @param email Correo del usuario
     * @param password Contraseña plana
     * @throws Error si las credenciales son inválidas o hay problemas de red
     */
    async login(email: string, password: string): Promise<boolean> {
        try {
            const response: any = await firstValueFrom(
                this.http.post(`${this.apiUrl}/auth/login`, { email, password })
            );

            if (response && response.token) {
                // Guardamos token y usuario
                localStorage.setItem('token', response.token);
                localStorage.setItem('user', JSON.stringify(response.user));
                this.currentUser.set(response.user);
                return true;
            }
            throw new Error('No se recibió el token del servidor.');
        } catch (error: any) {
            console.error('Error en login:', error);
            // Si el backend viene con un mensaje de error específico (ej. error.error.message), lo lanzamos
            const msg = error.error?.message || 'Error de conexión o credenciales inválidas.';
            throw new Error(msg);
        }
    }

    async register(nombre: string, email: string, password: string, rolId: number = 2): Promise<boolean> {
        try {
            await firstValueFrom(
                this.http.post(`${this.apiUrl}/auth/register`, { nombre, email, password, rolId })
            );
            return true;
        } catch (error: any) {
            console.error('Error en registro:', error);
            const msg = error.error?.message || 'El registro no pudo completarse. El correo podría ya estar registrado.';
            throw new Error(msg);
        }
    }

    /**
     * Limpia la sesión del usuario del almacenamiento local y del estado interno.
     */
    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.currentUser.set(null);
    }

    getToken(): string | null {
        return localStorage.getItem('token');
    }

    isLoggedIn(): boolean {
        return !!this.currentUser();
    }

    isAdmin(): boolean {
        return this.currentUser()?.rol === 'Admin';
    }
}
