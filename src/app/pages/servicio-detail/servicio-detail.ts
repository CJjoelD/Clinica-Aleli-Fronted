import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SERVICES_DATA, ServiceInfo } from '../servicios/servicios-data';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { NavbarComponent } from '../../shared/components/navbar/navbar';
import { DOCTORS } from '../../data/doctor-data';
import { PaginaService } from '../../services/pagina.service';

@Component({
    selector: 'app-servicio-detail',
    standalone: true,
    imports: [CommonModule, RouterLink, FooterComponent, NavbarComponent],
    templateUrl: './servicio-detail.html',
    styleUrl: './servicio-detail.css'
})
export class ServicioDetailComponent implements OnInit {
    private paginaService = inject(PaginaService);
    private route = inject(ActivatedRoute);
    private router = inject(Router);

    serviceId = signal<string | null>(null);

    // Dynamic service data computed from the CMS or fallback
    service = computed(() => {
        const id = this.serviceId();
        if (!id) return undefined;

        const cmsPage = this.paginaService.getPage(`srv_${id}`);
        if (cmsPage) {
            const hero = cmsPage.sections.find((s: any) => s.id === 'hero');
            const points = cmsPage.sections.find((s: any) => s.id === 'points');
            const extras = cmsPage.sections.filter((s: any) => s.id.startsWith('extra_'));

            return {
                id: id,
                category: hero?.content.category,
                title: hero?.content.title,
                description: hero?.content.description,
                image: hero?.content.imageUrl,
                pointsTitle: points?.content.title,
                points: points?.content.items?.map((i: any) => i.title) || [],
                extraSections: extras.map((e: any) => ({
                    title: e.content.title,
                    content: e.content.description,
                    items: e.content.items?.map((it: any) => it.title) || []
                }))
            };
        }

        return SERVICES_DATA.find(s => s.id === id);
    });

    doctors = DOCTORS.slice(0, 3);

    ngOnInit(): void {
        this.route.params.subscribe((params: any) => {
            const id = params['id'];
            this.serviceId.set(id);

            if (!this.service()) {
                this.router.navigate(['/servicios']);
            }
            window.scrollTo(0, 0);
        });
    }
}
