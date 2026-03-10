import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';

/**
 * Guard para proteger rutas administrativas.
 * Solo permite el acceso si el usuario está logueado y tiene el rol de 'Admin'.
 */
export const adminGuard: CanActivateFn = () => {
    const authService = inject(AuthService);
    const router = inject(Router);

    if (authService.isLoggedIn()) {
        if (authService.isAdmin()) {
            return true;
        }
        // Logueado pero no es admin
        console.warn('Acceso denegado: Se requiere rol de Administrador.');
        router.navigate(['/forbidden']);
        return false;
    }

    // No está logueado
    router.navigate(['/auth/login']);
    return false;
};
