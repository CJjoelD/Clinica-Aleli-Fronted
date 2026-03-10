export interface Usuario {
  id?: number;
  nombre: string;
  email: string;
  password?: string;
  tipo: 'ADMIN' | 'PACIENTE';
  rolId?: number;
  cedula?: string;
}
