import { Routes } from '@angular/router';

export default [
    {
        path: '',
        loadComponent: () => import('./login').then(m => m.LoginComponent),
    },
] as Routes;
