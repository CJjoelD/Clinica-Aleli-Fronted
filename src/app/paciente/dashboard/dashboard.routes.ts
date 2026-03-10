import { Routes } from '@angular/router';

export default [
    {
        path: '',
        loadComponent: () => import('./dashboard').then(m => m.DashboardComponent),
    },
    {
        path: 'perfil',
        loadComponent: () => import('../perfil/perfil').then(m => m.PerfilComponent),
    },
] as Routes;
