import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { NavbarComponent } from '../../shared/components/navbar/navbar';
import { DOCTORS, Doctor } from '../../data/doctor-data';

interface Category {
  name: string;
  count: number;
  isOpen?: boolean;
  subCategories?: { name: string; count: number }[];
}

@Component({
  selector: 'app-especialidades',
  standalone: true,
  imports: [CommonModule, FooterComponent, NavbarComponent, RouterLink],
  templateUrl: './especialidades.html',
  styleUrl: './especialidades.css',
})
export class EspecialidadesComponent {
  selectedCategory: string = 'all';
  selectedSubCategory: string = 'all';

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
      return categoryMatch && subCategoryMatch;
    });
  }

  toggleCategory(category: Category) {
    category.isOpen = !category.isOpen;
    this.selectedCategory = category.name;
    this.selectedSubCategory = 'all';
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
