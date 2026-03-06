import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SERVICES_DATA, ServiceInfo } from '../servicios/servicios-data';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { NavbarComponent } from '../../shared/components/navbar/navbar';
import { DOCTORS } from '../../data/doctor-data';

@Component({
    selector: 'app-servicio-detail',
    standalone: true,
    imports: [CommonModule, RouterLink, FooterComponent, NavbarComponent],
    templateUrl: './servicio-detail.html',
    styleUrl: './servicio-detail.css'
})
export class ServicioDetailComponent implements OnInit {
    service: ServiceInfo | undefined;
    doctors = DOCTORS.slice(0, 3); // Just show top 3 for demo or use logic to filter by specialty if possible.

    constructor(
        private route: ActivatedRoute,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            const id = params['id'];
            this.loadService(id);
            window.scrollTo(0, 0);
        });
    }

    loadService(id: string): void {
        this.service = SERVICES_DATA.find(s => s.id === id);
        if (!this.service) {
            this.router.navigate(['/servicios']);
        }
    }
}
