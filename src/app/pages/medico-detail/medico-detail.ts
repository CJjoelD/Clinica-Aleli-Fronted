import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DOCTORS, Doctor } from '../../data/doctor-data';
import { NavbarComponent } from '../../shared/components/navbar/navbar';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { PaginaService } from '../../services/pagina.service';

@Component({
    selector: 'app-medico-detail',
    standalone: true,
    imports: [CommonModule, RouterLink, NavbarComponent, FooterComponent],
    templateUrl: './medico-detail.html',
    styleUrl: './medico-detail.css'
})
export class MedicoDetailComponent implements OnInit {
    private route = inject(ActivatedRoute);
    private paginaService = inject(PaginaService);

    doctor: any | undefined;

    ngOnInit(): void {
        const id = this.route.snapshot.paramMap.get('id');
        if (id) {
            // Intentar buscar en el CMS primero
            const directorio = this.paginaService.getPage('directorio');
            const cmsDoctor = directorio?.sections
                .find(s => s.id === 'lista_medicos')?.content.items
                .find((m: any) => m.id === id);

            if (cmsDoctor) {
                this.doctor = cmsDoctor;
            } else {
                // Fallback a datos estáticos
                this.doctor = DOCTORS.find(d => d.id === id);
            }
        }
    }
}
