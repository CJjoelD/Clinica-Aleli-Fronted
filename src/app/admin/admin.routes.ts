import { Routes } from '@angular/router';
import { AdminLayoutComponent } from './layout/layout';

export const ADMIN_ROUTES: Routes = [
    {
        path: '',
        component: AdminLayoutComponent,
        children: [
            {
                path: 'dashboard',
                loadComponent: () => import('./dashboard/dashboard').then(m => m.DashboardComponent)
            },
            {
                path: 'paginas',
                loadComponent: () => import('./paginas/paginas').then(m => m.PaginaEditorComponent)
            },
            {
                path: 'paginas/:id',
                loadComponent: () => import('./paginas/paginas').then(m => m.PaginaEditorComponent)
            },
            {
                path: 'usuarios',
                loadComponent: () => import('./usuarios/usuarios').then(m => m.UsuariosComponent)
            },
            {
                path: '',
                redirectTo: 'dashboard',
                pathMatch: 'full'
            }
        ]
    }
];

export default ADMIN_ROUTES;
