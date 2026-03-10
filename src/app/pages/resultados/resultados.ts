import { Component, inject, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../../shared/components/navbar/navbar';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { PaginaService } from '../../services/pagina.service';
import { ResultadoMedicoService } from '../../services/resultado-medico.service';
import { AuthService } from '../../services/auth.service';
import { firstValueFrom } from 'rxjs';

/**
 * Componente para la consulta de resultados médicos.
 * Implementa la lógica de búsqueda por cédula y número de orden.
 */
@Component({
    selector: 'app-resultados',
    standalone: true,
    imports: [CommonModule, FormsModule, NavbarComponent, FooterComponent],
    templateUrl: './resultados.html',
    styleUrl: './resultados.css'
})
export class ResultadosComponent {
    private paginaService = inject(PaginaService);
    private resultadoService = inject(ResultadoMedicoService);
    
    pageConfig = computed(() => this.paginaService.getPage('resultados'));
    
    // Estado de la vista
    viewState = signal<'LOOKUP' | 'RESULTS'>('LOOKUP');
    isLoading = signal(false);
    isConfirmed = signal(false);
    errorMessage = signal('');

    // Campos de búsqueda
    cedula = '';
    orderNumber = '';

    // Datos del resultado encontrado
    foundResult: any = null;
    patientDetails: any = {
        name: '',
        id: '',
        date: '',
        order: ''
    };

    getSection(id: string) {
        return this.pageConfig()?.sections.find(s => s.id === id);
    }

    confirmLookup() {
        if (this.cedula.length >= 10 && this.orderNumber) {
            this.isConfirmed.set(true);
            this.errorMessage.set('');
        } else {
            this.errorMessage.set('Por favor, ingrese una cédula válida (10 dígitos) y el número de orden.');
        }
    }

    async viewResults() {
        this.isLoading.set(true);
        this.errorMessage.set('');
        
        // Demo/Test Mode
        if (this.cedula === '1234567890' && this.orderNumber === 'ALELI-001') {
            await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate delay
            this.foundResult = {
                id: 'mock-1',
                fecha: new Date().toISOString(),
                numeroOrden: 'ALELI-001',
                estudios: [
                    { nombre: 'Hemograma Completo', resultado: 'Normal', referencia: '4.5 - 11.0 k/uL' },
                    { nombre: 'Glucosa en Ayunas', resultado: '92 mg/dL', referencia: '70 - 100 mg/dL' },
                    { nombre: 'Colesterol Total', resultado: '185 mg/dL', referencia: '< 200 mg/dL' },
                    { nombre: 'Triglicéridos', resultado: '140 mg/dL', referencia: '< 150 mg/dL' }
                ],
                observaciones: 'Paciente en condiciones saludables. Se recomienda mantener dieta equilibrada.',
                usuario: { nombre: 'JUAN PEREZ DEMO', cedula: '1234567890' }
            };
            this.patientDetails = {
                name: 'JUAN PEREZ DEMO',
                id: '1234567890',
                date: new Date().toLocaleDateString(),
                order: 'ALELI-001'
            };
            this.viewState.set('RESULTS');
            this.isLoading.set(false);
            return;
        }

        try {
            const data = await firstValueFrom(this.resultadoService.buscarResultado(this.cedula, this.orderNumber));
            
            if (data) {
                this.foundResult = data;
                this.patientDetails = {
                    name: data.usuario?.nombre || 'Paciente',
                    id: data.usuario?.cedula || this.cedula,
                    date: new Date(data.fecha).toLocaleDateString(),
                    order: data.numeroOrden || this.orderNumber
                };
                this.viewState.set('RESULTS');
            } else {
                this.errorMessage.set('No se encontraron resultados para los datos ingresados. Verifique su cédula y número de orden.');
                this.isConfirmed.set(false);
            }
        } catch (error: any) {
            console.error('Error al buscar resultados:', error);
            this.errorMessage.set(error.error?.message || 'Ocurrió un error al consultar los resultados. Por favor, intente más tarde.');
            this.isConfirmed.set(false);
        } finally {
            this.isLoading.set(false);
        }
    }

    goBack() {
        this.viewState.set('LOOKUP');
        this.isConfirmed.set(false);
        this.foundResult = null;
        this.errorMessage.set('');
    }

    printResults() {
        window.print();
    }
}
