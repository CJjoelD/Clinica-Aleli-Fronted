import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { NavbarComponent } from '../../shared/components/navbar/navbar';
import { DOCTORS, Doctor } from '../../data/doctor-data';
import { PaginaService } from '../../services/pagina.service';

interface Category {
  name: string;
  count: number;
  isOpen?: boolean;
  subCategories?: { name: string; count: number }[];
}

import { FormsModule } from '@angular/forms';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';

@Component({
  selector: 'app-especialidades',
  standalone: true,
  imports: [CommonModule, FooterComponent, NavbarComponent, RouterLink, FormsModule],
  templateUrl: './especialidades.html',
  styleUrl: './especialidades.css',
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-10px)' }),
        animate('200ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ opacity: 0, transform: 'translateY(-10px)' }))
      ])
    ]),
    trigger('listAnimation', [
      transition('* <=> *', [
        query(':enter', [
          style({ opacity: 0, transform: 'translateY(20px)' }),
          stagger('50ms', animate('400ms cubic-bezier(0.165, 0.84, 0.44, 1)', style({ opacity: 1, transform: 'translateY(0)' })))
        ], { optional: true })
      ])
    ])
  ]
})
export class EspecialidadesComponent {
  private paginaService = inject(PaginaService);

  pageConfig = computed(() => this.paginaService.getPage('especialidades'));

  getSection(id: string) {
    return this.pageConfig()?.sections.find(s => s.id === id);
  }

  selectedCategory: string = 'all';
  selectedSubCategory: string = 'all';
  searchTerm: string = '';

  categories: Category[] = [
    {
      name: 'Departamento de Cirugía',
      count: 7,
      isOpen: false,
      subCategories: [
        { name: 'Anestesiología', count: 2 },
        { name: 'Cirugía Coloproctología', count: 1 },
        { name: 'Cirugía Estética', count: 1 },
        { name: 'Cirugía General', count: 2 },
        { name: 'Cirugía Laparoscópica', count: 3 },
        { name: 'Traumatología y Ortopedia', count: 1 }
      ]
    },
    {
      name: 'Departamento de Ginecología y Obstetricia',
      count: 1,
      isOpen: false,
      subCategories: [
        { name: 'Ginecología', count: 1 },
        { name: 'Ginecología y Obstetricia', count: 1 }
      ]
    },
    {
      name: 'Departamento de Otorrinolaringología',
      count: 1,
      isOpen: false
    },
    {
      name: 'Departamento de Pediatría',
      count: 3,
      isOpen: false,
      subCategories: [
        { name: 'Pediatría', count: 3 }
      ]
    },
    {
      name: 'Departamento Medicina Interna',
      count: 5,
      isOpen: false,
      subCategories: [
        { name: 'Cardiología', count: 1 },
        { name: 'Fisioterapia', count: 1 },
        { name: 'Medicina Familiar', count: 1 },
        { name: 'Medicina Interna', count: 1 },
        { name: 'Nefrología', count: 1 }
      ]
    }
  ];

  doctors: Doctor[] = DOCTORS;

  get filteredDoctors() {
    return this.doctors.filter(doctor => {
      const categoryMatch = this.selectedCategory === 'all' || doctor.category === this.selectedCategory;
      const subCategoryMatch = this.selectedSubCategory === 'all' || doctor.subCategory === this.selectedSubCategory;

      const searchStr = this.searchTerm.toLowerCase();
      const searchMatch = !this.searchTerm ||
        doctor.name.toLowerCase().includes(searchStr) ||
        doctor.specialty.toLowerCase().includes(searchStr);

      return categoryMatch && subCategoryMatch && searchMatch;
    });
  }

  isFilterActive(): boolean {
    return this.selectedCategory !== 'all' || this.selectedSubCategory !== 'all';
  }

  selectCategory(categoryName: string) {
    if (this.selectedCategory === categoryName && this.selectedSubCategory === 'all') {
      this.resetFilters();
      return;
    }

    this.selectedCategory = categoryName;
    this.selectedSubCategory = 'all';

    // Auto-open the selected category
    this.categories.forEach(cat => {
      if (cat.name === categoryName) {
        cat.isOpen = true;
      } else {
        cat.isOpen = false;
      }
    });
  }

  toggleCategory(event: Event, category: Category) {
    event.stopPropagation();
    category.isOpen = !category.isOpen;
  }

  selectSubCategory(event: Event, category: string, subCategory: string) {
    event.stopPropagation();
    this.selectedCategory = category;
    this.selectedSubCategory = subCategory;
  }

  resetFilters() {
    this.selectedCategory = 'all';
    this.selectedSubCategory = 'all';
    this.categories.forEach(c => c.isOpen = false);
  }
}
