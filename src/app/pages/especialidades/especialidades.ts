import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../../shared/components/footer/footer.component';

interface Doctor {
  name: string;
  specialty: string;
  image: string;
  category: string;
  subCategory?: string;
}

interface Category {
  name: string;
  count: number;
  isOpen?: boolean;
  subCategories?: { name: string; count: number }[];
}

@Component({
  selector: 'app-especialidades',
  standalone: true,
  imports: [RouterLink, CommonModule, FooterComponent],
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

  doctors: Doctor[] = [
    { name: 'Dr. Pablo Adrian Alvarracin', specialty: 'Cirujano general y Laparoscópico', image: 'assets/images/ESPECIALIDADES/DR_PABLO_ADRIA_CHICA_ALVARACIN.png', category: 'Departamento de Cirugía', subCategory: 'Cirugía Laparoscópica' },
    { name: 'Dra. Ligia Naranjo Bernal', specialty: 'Anestesiología', image: 'assets/images/ESPECIALIDADES/DRA_LIGIA_NARANJO_BERNAL.png', category: 'Departamento de Cirugía', subCategory: 'Anestesiología' },
    { name: 'Dra. Ana Cristina Jimbo J.', specialty: 'Pediatría', image: 'assets/images/ESPECIALIDADES/DRA_ANA_CRISTINA_JIMBO_J.png', category: 'Departamento de Pediatría', subCategory: 'Pediatría' },
    { name: 'Dra. Ana Patricia Gonzales', specialty: 'Nefróloga', image: 'assets/images/ESPECIALIDADES/DR_ANA_PATRICIA_GONZALES.png', category: 'Departamento Medicina Interna', subCategory: 'Nefrología' },
    { name: 'Dr. Alvaro Leonardo Beltrán', specialty: 'Ginecología y Obstetricia', image: 'assets/images/ESPECIALIDADES/DR_ALVARO_LEONARDO_BELTRÁN_VIDAL.png', category: 'Departamento de Ginecología y Obstetricia', subCategory: 'Ginecología y Obstetricia' },
    { name: 'Dr. Deniss Calderón Aleman', specialty: 'Otorrinolaringología - Cirugía estética', image: 'assets/images/ESPECIALIDADES/DR_DENISS_CALDERON_ALEMAN.png', category: 'Departamento de Otorrinolaringología' },
    { name: 'Dr. Fernando Sigua Espinoza', specialty: 'Medicina Familiar', image: 'assets/images/ESPECIALIDADES/DR_FERNANDO_SIGUA_ESPINOZA.png', category: 'Departamento Medicina Interna', subCategory: 'Medicina Familiar' },
    { name: 'Lcda. Katy Yunga Q.', specialty: 'Fisioterapia', image: 'assets/images/ESPECIALIDADES/LCDA_KATY_YUNGA_Q.png', category: 'Departamento Medicina Interna', subCategory: 'Fisioterapia' },
    { name: 'Dra. Lucila Alvarado Palacios', specialty: 'Pediatría', image: 'assets/images/ESPECIALIDADES/DRA_LUCILA_ALVARADO_PALACIOS.png', category: 'Departamento de Pediatría', subCategory: 'Pediatría' },
    { name: 'Dra. Catherine Cabrera', specialty: 'Coloproctología, Cirugía General', image: 'assets/images/ESPECIALIDADES/DRA_CATHERINE_CABRERA.png', category: 'Departamento de Cirugía', subCategory: 'Cirugía Coloproctología' },
    { name: 'Dr. Alvaro Buñay', specialty: 'Cardiología', image: 'assets/images/ESPECIALIDADES/DR_ALVARO_BUÑAY.png', category: 'Departamento Medicina Interna', subCategory: 'Cardiología' },
    { name: 'Dr. Carlos Iván Aguilar', specialty: 'Cirugía General', image: 'assets/images/ESPECIALIDADES/DR_CARLOS_IVAN_AGUILAR_GAIBOR.png', category: 'Departamento de Cirugía', subCategory: 'Cirugía General' },
    { name: 'Dr. Vicente Velez P.', specialty: 'Pediatría', image: 'assets/images/ESPECIALIDADES/DR_VICENTE_VELEZ_P.png', category: 'Departamento de Pediatría', subCategory: 'Pediatría' },
    { name: 'Dr. Fabricio Lata Cando', specialty: 'Medicina Interna', image: 'assets/images/ESPECIALIDADES/DR_FABRICIO_LATA_CANDO.png', category: 'Departamento Medicina Interna', subCategory: 'Medicina Interna' },
    { name: 'Dr. Carlos Palacios Reinoso', specialty: 'Anestesiología', image: 'assets/images/ESPECIALIDADES/DR_CARLOS_PALACIOS_REINOSO.png', category: 'Departamento de Cirugía', subCategory: 'Anestesiología' },
    { name: 'Dra. Diana Moreno', specialty: 'Traumatología y Ortopedia', image: 'assets/images/ESPECIALIDADES/DRA_DIANA_MORENO.png', category: 'Departamento de Cirugía', subCategory: 'Traumatología y Ortopedia' }
  ];

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
