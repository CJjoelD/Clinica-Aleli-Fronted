import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DOCTORS, Doctor } from '../../data/doctor-data';
import { NavbarComponent } from '../../shared/components/navbar/navbar';
import { FooterComponent } from '../../shared/components/footer/footer.component';

@Component({
    selector: 'app-medico-detail',
    standalone: true,
    imports: [CommonModule, RouterLink, NavbarComponent, FooterComponent],
    templateUrl: './medico-detail.html',
    styleUrl: './medico-detail.css'
})
export class MedicoDetailComponent implements OnInit {
    doctor: Doctor | undefined;

    constructor(private route: ActivatedRoute) { }

    ngOnInit(): void {
        const id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.doctor = DOCTORS.find(d => d.id === id);
        }
    }
}
