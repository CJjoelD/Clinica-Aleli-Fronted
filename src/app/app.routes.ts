import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'inicio',
        loadComponent: () => import('./pages/inicio/inicio').then(m => m.InicioComponent),
        data: { animation: 'InicioPage' }
    },
    {
        path: 'servicios',
        loadComponent: () => import('./pages/servicios/servicios').then(m => m.ServiciosComponent),
        data: { animation: 'ServiciosPage' }
    },
    {
        path: 'especialidades',
        loadComponent: () => import('./pages/especialidades/especialidades').then(m => m.EspecialidadesComponent),
        data: { animation: 'EspecialidadesPage' }
    },
    {
        path: 'auth',
        loadChildren: () => import('./auth/login/login.routes').then((m) => m.default),
        data: { animation: 'AuthPage' }
    },
    {
        path: 'admin',
        loadChildren: () => import('./admin/dashboard/dashboard.routes').then((m) => m.default),
        data: { animation: 'AdminPage' }
    },
    {
        path: 'nosotros',
        loadComponent: () => import('./pages/nosotros/nosotros').then(m => m.NosotrosComponent),
        data: { animation: 'NosotrosPage' }
    },
    {
        path: 'instalaciones',
        loadComponent: () => import('./pages/instalaciones/instalaciones').then(m => m.Instalaciones),
        data: { animation: 'InstalacionesPage' }
    },
    {
        path: 'paciente',
        loadChildren: () => import('./paciente/dashboard/dashboard.routes').then((m) => m.default),
    },
    {
        path: 'contacto',
        loadComponent: () => import('./pages/contacto/contacto').then(m => m.ContactoComponent),
        data: { animation: 'ContactoPage' }
    },
    {
        path: 'blog',
        loadComponent: () => import('./pages/blog/blog').then(m => m.Blog),
        data: { animation: 'BlogPage' }
    },
    {
        path: 'blog/:id',
        loadComponent: () => import('./pages/blog-detail/blog-detail').then(m => m.BlogDetailComponent),
        data: { animation: 'BlogDetailPage' }
    },
    {
        path: 'servicio/:id',
        loadComponent: () => import('./pages/servicio-detail/servicio-detail').then(m => m.ServicioDetailComponent),
        data: { animation: 'ServicioDetailPage' }
    },
    {
        path: 'medico/:id',
        loadComponent: () => import('./pages/medico-detail/medico-detail').then(m => m.MedicoDetailComponent),
        data: { animation: 'MedicoDetailPage' }
    },
    {
        path: 'resultados',
        loadComponent: () => import('./pages/resultados/resultados').then(m => m.ResultadosComponent),
        data: { animation: 'ResultadosPage' }
    },
    { path: '', redirectTo: 'inicio', pathMatch: 'full' },
];
