import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../../shared/components/navbar/navbar';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { PaginaService } from '../../services/pagina.service';

interface LabResult {
    item: string;
    result: string;
    reference: string;
}

interface PatientInfo {
    name: string;
    id: string;
    birthDate: string;
    age: string;
    orderNumber: string;
    doctor: string;
    service: string;
    date: string;
}

@Component({
    selector: 'app-resultados',
    standalone: true,
    imports: [CommonModule, FormsModule, NavbarComponent, FooterComponent],
    templateUrl: './resultados.html',
    styleUrl: './resultados.css'
})
export class ResultadosComponent {
    private paginaService = inject(PaginaService);

    pageConfig = computed(() => this.paginaService.getPage('resultados'));

    getSection(id: string) {
        return this.pageConfig()?.sections.find(s => s.id === id);
    }

    viewState: 'LOOKUP' | 'RESULTS' = 'LOOKUP';
    cedula: string = '';
    orderNumber: string = '';
    isConfirmed: boolean = false;
    isLoading: boolean = false;

    patient: PatientInfo = {
        name: 'JUAN PEREZ GARCIA',
        id: '0102030405',
        birthDate: '12/05/1985',
        age: '38 AÑOS',
        orderNumber: 'ORD-2024-001',
        doctor: 'DR. PABLO CHICA',
        service: 'LABORATORIO CLÍNICO',
        date: '26/02/2026'
    };

    results: LabResult[] = [
        { item: 'GLUCOSA EN AYUNAS', result: '95 mg/dL', reference: '70 - 100 mg/dL' },
        { item: 'COLESTEROL TOTAL', result: '180 mg/dL', reference: 'Menor a 200 mg/dL' },
        { item: 'TRIGLICÉRIDOS', result: '140 mg/dL', reference: 'Menor a 150 mg/dL' },
        { item: 'HDL (COLESTEROL BUENO)', result: '55 mg/dL', reference: 'Mayor a 40 mg/dL' },
        { item: 'LDL (COLESTEROL MALO)', result: '90 mg/dL', reference: 'Menor a 130 mg/dL' },
        { item: 'ÁCIDO ÚRICO', result: '5.2 mg/dL', reference: '3.4 - 7.0 mg/dL' },
        { item: 'CREATININA', result: '0.9 mg/dL', reference: '0.7 - 1.2 mg/dL' }
    ];

    confirmLookup() {
        if (this.cedula && this.orderNumber) {
            this.isConfirmed = true;
        }
    }

    viewResults() {
        this.isLoading = true;
        setTimeout(() => {
            this.isLoading = false;
            this.viewState = 'RESULTS';
        }, 1500);
    }

    goBack() {
        this.viewState = 'LOOKUP';
        this.isConfirmed = false;
        this.cedula = '';
        this.orderNumber = '';
    }

    printResults() {
        window.print();
    }
}
