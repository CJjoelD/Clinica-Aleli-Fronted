import { Routes } from '@angular/router';

export default [
    {
        path: '',
        loadComponent: () => import('./dashboard').then(m => m.DashboardComponent),
    },
] as Routes;
