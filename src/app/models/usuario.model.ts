export interface Usuario {
  id: number;
  nombre: string;
  email: string;
  password?: string; // Opcional en el frontend por seguridad
  tipo: 'ADMIN' | 'PACIENTE';
  rolId: number;
}
