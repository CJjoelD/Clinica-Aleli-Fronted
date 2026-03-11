import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CmsService, CMSItem } from '../../services/cms.service';
import { PaginaService } from '../../services/pagina.service';
import { SectionConfig } from '../../models/cms.model';

@Component({
  selector: 'app-admin-cms',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="cms-container">
      <header class="page-header shadow-premium">
        <div class="header-content">
          <span class="header-tag">GESTOR DE CONTENIDO INTEGRAL</span>
          <h1>Control de la Página de Inicio</h1>
          <p>Gestiona cada bloque de tu portada: cambia títulos, descripciones y añade o quita elementos.</p>
        </div>
        
        <div class="category-filter">
          <button (click)="currentTab = 'portada'" [class.active]="currentTab === 'portada'">
             <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="icon"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
             Secciones de Portada
          </button>
          <button (click)="currentTab = 'destacados'" [class.active]="currentTab === 'destacados'">
             <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="icon"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
             Textos Rápidos (SEO)
          </button>
        </div>
      </header>

      <!-- TAB 1: SECCIONES DE PORTADA (APPARATUSES) -->
      <div class="cms-apparatus-list" *ngIf="currentTab === 'portada'">
        <div class="apparatus-card shadow-premium" *ngFor="let section of filteredSections()">
          <div class="apparatus-header">
             <div class="info">
                <span class="tag">BLOQUE</span>
                <h3>{{ section.name }}</h3>
             </div>
             <div class="status-pill" [class.enabled]="section.enabled">
                {{ section.enabled ? 'ACTIVO EN WEB' : 'OCULTO' }}
             </div>
          </div>

          <div class="apparatus-body">
            <div class="field-row">
               <div class="field">
                  <label>TÍTULO PRINCIPAL</label>
                  <input type="text" [(ngModel)]="section.content.title" (change)="saveHomepage()" class="premium-input">
               </div>
               <div class="field" *ngIf="section.content.subtitle !== undefined">
                  <label>SUBTÍTULO / TAG</label>
                  <input type="text" [(ngModel)]="section.content.subtitle" (change)="saveHomepage()" class="premium-input">
               </div>
            </div>

            <div class="field" *ngIf="section.content.description !== undefined">
               <label>DESCRIPCIÓN BREVE</label>
               <textarea [(ngModel)]="section.content.description" (change)="saveHomepage()" rows="2" class="premium-input"></textarea>
            </div>

            <!-- Gestión de Items (Agregar/Quitar) -->
            <div class="items-mgt" *ngIf="section.content.items">
               <div class="items-header">
                  <label>ELEMENTOS EN ESTE BLOQUE ({{ section.content.items.length }})</label>
                  <button class="btn-add-item" (click)="addItemToSection(section)">+ AÑADIR ELEMENTO</button>
               </div>
               <div class="items-mini-grid">
                  <div class="mini-item shadow-premium bounce-in" *ngFor="let item of section.content.items; let i = index">
                     <div class="item-img" *ngIf="item.imageUrl" [style.background-image]="'url('+item.imageUrl+')'"></div>
                     <div class="item-info">
                        <input type="text" [(ngModel)]="item.title" (change)="saveHomepage()" placeholder="Título...">
                        <input type="text" [(ngModel)]="item.name" *ngIf="item.name" (change)="saveHomepage()" placeholder="Nombre...">
                     </div>
                     <button class="btn-remove" (click)="removeItemFromSection(section, i)" title="Quitar">×</button>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>

      <!-- TAB 2: DESTACADOS RÁPIDOS (OLD CMS) -->
      <div class="cms-grid" *ngIf="currentTab === 'destacados'">
        <div class="content-card" *ngFor="let item of cmsItems()">
          <div class="card-image" *ngIf="item.imagenUrl">
            <img [src]="item.imagenUrl" alt="Imagen">
            <div class="edit-overlay" (click)="editCmsItem(item)"><span>CAMBIAR IMAGEN</span></div>
          </div>
          <div class="card-details">
            <div class="badge">{{ item.tipo }}</div>
            <h3>{{ item.clave }}</h3>
            <p class="preview-text">{{ item.valor }}</p>
            <button class="btn-edit-action" (click)="editCmsItem(item)">EDITAR TEXTO</button>
          </div>
        </div>
      </div>

      <!-- Modal de Edición para CMS Items -->
      <div class="modal-overlay" *ngIf="showModal()">
        <div class="modal-content animate-pop">
          <div class="modal-header">
            <div><span class="modal-tag">MODIFICAR DESTACADO</span><h2>{{ selectedCmsItem()?.clave }}</h2></div>
            <button class="close-btn" (click)="closeModal()">×</button>
          </div>
          <form class="modal-body" (submit)="saveCmsItem()">
            <div class="form-group">
              <label>VALOR / TEXTO</label>
              <textarea [(ngModel)]="editValue" name="valor" rows="4" class="form-control"></textarea>
            </div>
            <div class="form-group">
              <label>URL IMAGEN</label>
              <input type="text" [(ngModel)]="editImage" name="imagenUrl" class="form-control">
            </div>
            <div class="modal-footer">
              <button type="button" class="btn-cancel" (click)="closeModal()">DESCARTAR</button>
              <button type="submit" class="btn-save">GUARDAR CAMBIOS</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .cms-container { padding: 3rem; background: #050810; min-height: 100vh; font-family: 'Outfit', sans-serif; color: #fff; }
    
    .page-header { 
       background: #0a0f1d; padding: 2.5rem; border-radius: 28px; margin-bottom: 3.5rem; 
       border: 1px solid rgba(255,255,255,0.05); display: flex; flex-direction: column; gap: 2.5rem;
    }
    .header-tag { font-size: 0.75rem; color: #6366f1; font-weight: 800; letter-spacing: 2.5px; opacity: 0.8; }
    .page-header h1 { margin: 0; color: #fff; font-size: 2.2rem; font-weight: 900; }
    .page-header p { margin: 8px 0 0; color: #64748b; font-size: 1.1rem; }
    
    .category-filter { display: flex; gap: 1rem; }
    .category-filter button { 
       padding: 12px 28px; border: 1px solid rgba(255,255,255,0.05); background: rgba(255,255,255,0.02); 
       color: #64748b; font-weight: 700; border-radius: 16px; cursor: pointer; transition: all 0.3s; 
       display: flex; align-items: center; gap: 10px; font-size: 0.9rem;
    }
    .category-filter button:hover { background: rgba(99, 102, 241, 0.05); color: #fff; border-color: #6366f1; }
    .category-filter button.active { background: #6366f1; color: white; border-color: #6366f1; box-shadow: 0 10px 25px rgba(99, 102, 241, 0.3); }

    /* Apparatus Cards */
    .cms-apparatus-list { display: flex; flex-direction: column; gap: 2.5rem; max-width: 1000px; margin: 0 auto; }
    .apparatus-card { 
       background: #0a0f1d; border-radius: 28px; padding: 3rem; border: 1px solid rgba(255,255,255,0.05);
       transition: 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    .apparatus-card:hover { border-color: rgba(99, 102, 241, 0.3); transform: translateY(-3px); }

    .apparatus-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 2.5rem; }
    .apparatus-header .tag { font-size: 0.6rem; font-weight: 800; color: #6366f1; letter-spacing: 2px; }
    .apparatus-header h3 { margin: 5px 0 0; font-size: 1.6rem; font-weight: 900; color: #fff; }
    .status-pill { padding: 5px 15px; border-radius: 20px; font-size: 0.7rem; font-weight: 800; background: rgba(239, 68, 68, 0.1); color: #ef4444; border: 1px solid rgba(239, 68, 68, 0.1); }
    .status-pill.enabled { background: rgba(16, 185, 129, 0.1); color: #10b981; border-color: rgba(16, 185, 129, 0.1); }

    .apparatus-body { display: flex; flex-direction: column; gap: 2rem; }
    .field { display: flex; flex-direction: column; gap: 10px; flex: 1; }
    .field label { font-size: 0.7rem; font-weight: 800; color: #64748b; letter-spacing: 1px; }
    .premium-input { 
       background: #050810; border: 1px solid rgba(255,255,255,0.08); border-radius: 14px;
       color: #fff; padding: 1.2rem; font-size: 1rem; width: 100%; transition: 0.2s;
    }
    .premium-input:focus { border-color: #6366f1; outline: none; }
    .field-row { display: flex; gap: 1.5rem; }

    /* Items Management */
    .items-mgt { background: rgba(255,255,255,0.01); border-radius: 20px; padding: 2rem; border: 1px dashed rgba(255,255,255,0.05); }
    .items-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; }
    .btn-add-item { background: #6366f1; color: white; border: none; padding: 10px 20px; border-radius: 12px; font-weight: 800; font-size: 0.75rem; cursor: pointer; transition: 0.2s; }
    .btn-add-item:hover { background: #4f46e5; transform: scale(1.05); }

    .items-mini-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 1.2rem; }
    .mini-item { 
       background: #050810; border-radius: 14px; padding: 12px; border: 1px solid rgba(255,255,255,0.05);
       position: relative; display: flex; align-items: center; gap: 12px;
    }
    .item-img { width: 45px; height: 45px; border-radius: 10px; background-size: cover; background-position: center; border: 1px solid rgba(255,255,255,0.1); flex-shrink: 0; }
    .item-info { flex: 1; display: flex; flex-direction: column; gap: 4px; }
    .item-info input { background: transparent; border: none; color: #fff; font-size: 0.8rem; font-weight: 700; width: 100%; }
    .item-info input:focus { color: #6366f1; outline: none; }
    .btn-remove { 
       position: absolute; top: -10px; right: -10px; width: 24px; height: 24px; border-radius: 50%;
       background: #ef4444; color: white; border: none; cursor: pointer; font-size: 1.2rem;
       display: flex; align-items: center; justify-content: center; opacity: 0; transition: 0.2s;
    }
    .mini-item:hover .btn-remove { opacity: 1; }

    /* Animation */
    .bounce-in { animation: bounceIn 0.4s ease-out; }
    @keyframes bounceIn { from { transform: scale(0.8); opacity: 0; } to { transform: scale(1); opacity: 1; } }

    /* Old Grid Styles */
    .cms-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 2rem; }
    .content-card { background: #0a0f1d; border-radius: 24px; overflow: hidden; border: 1px solid rgba(255,255,255,0.05); transition: all 0.3s; }
    .card-image { position: relative; height: 160px; }
    .card-image img { width: 100%; height: 100%; object-fit: cover; opacity: 0.8; }
    .edit-overlay { position: absolute; inset: 0; background: rgba(0,0,0,0.6); display: flex; align-items: center; justify-content: center; opacity: 0; transition: 0.3s; color: white; cursor: pointer; font-size: 0.75rem; font-weight: 800; }
    .card-image:hover .edit-overlay { opacity: 1; }
    .card-details { padding: 1.5rem; }
    .badge { display: inline-block; padding: 4px 10px; border-radius: 20px; background: rgba(99,102,241,0.1); color: #818cf8; font-size: 0.65rem; font-weight: 800; text-transform: uppercase; margin-bottom: 0.8rem; }
    .card-details h3 { margin: 0 0 0.8rem; font-size: 1.1rem; color: #fff; }
    .preview-text { font-size: 0.9rem; color: #94a3b8; margin-bottom: 1rem; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
    .btn-edit-action { width: 100%; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.05); padding: 10px; border-radius: 10px; color: #fff; font-weight: 700; cursor: pointer; transition: 0.2s; }
    .btn-edit-action:hover { background: #6366f1; }

    /* Modal */
    .modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.85); backdrop-filter: blur(8px); display: flex; align-items: center; justify-content: center; z-index: 1000; }
    .modal-content { background: #0a0f1d; width: 90%; max-width: 550px; padding: 3rem; border-radius: 30px; border: 1px solid rgba(255,255,255,0.1); box-shadow: 0 50px 100px rgba(0,0,0,0.5); }
    .modal-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; }
    .modal-tag { color: #6366f1; font-size: 0.7rem; font-weight: 800; letter-spacing: 1px; }
    .modal-header h2 { margin: 5px 0 0; color: #fff; font-size: 1.8rem; }
    .close-btn { background: none; border: none; font-size: 2rem; color: #64748b; cursor: pointer; }
    .form-group { margin-bottom: 1.5rem; }
    .form-group label { display: block; margin-bottom: 10px; color: #64748b; font-weight: 800; font-size: 0.75rem; }
    .form-control { width: 100%; padding: 1.2rem; background: #050810; border: 1px solid rgba(255,255,255,0.1); border-radius: 14px; color: #fff; font-size: 1rem; }
    .modal-footer { display: flex; justify-content: flex-end; gap: 1rem; margin-top: 2.5rem; }
    .btn-cancel { background: rgba(255,255,255,0.05); color: #94a3b8; border: none; padding: 12px 25px; border-radius: 12px; font-weight: 700; cursor: pointer; }
    .btn-save { background: #6366f1; color: #fff; border: none; padding: 12px 30px; border-radius: 12px; font-weight: 800; cursor: pointer; }
  `]
})
export class CmsContentComponent implements OnInit {
  private cmsService = inject(CmsService);
  public paginaService = inject(PaginaService);

  currentTab = 'portada';
  cmsItems = this.cmsService.cmsItems;

  showModal = signal(false);
  selectedCmsItem = signal<CMSItem | null>(null);
  editValue = '';
  editImage = '';

  // Focus sections for Homepage
  focusSectionIds = ['servicios', 'nosotros', 'beneficios', 'especialidades_destacadas', 'blog_home', 'faq'];

  filteredSections = computed(() => {
    const page = this.paginaService.getPage('inicio');
    if (!page) return [];
    return page.sections.filter(s => this.focusSectionIds.includes(s.id));
  });

  async ngOnInit() {
    await this.cmsService.loadAllCMS();
  }

  saveHomepage() {
    this.paginaService.savePages();
  }

  addItemToSection(section: SectionConfig) {
    if (!section.content.items) section.content.items = [];
    
    // Default item based on section type
    const newItem: any = {
      id: Date.now(),
      title: 'Nuevo Elemento',
      description: 'Descripción breve aquí...',
      imageUrl: 'assets/images/INICIO-IMAGEN2.png',
      link: '#'
    };

    if (section.id === 'especialidades_destacadas') {
      newItem.name = 'Nombre del Doctor';
      newItem.specialty = 'Especialidad';
    }

    section.content.items.push(newItem);
    this.saveHomepage();
  }

  removeItemFromSection(section: SectionConfig, index: number) {
    if (confirm('¿Estás seguro de quitar este elemento?')) {
       section.content.items.splice(index, 1);
       this.saveHomepage();
    }
  }

  // CMS Items (Tab 2) Logic
  editCmsItem(item: CMSItem) {
    this.selectedCmsItem.set(item);
    this.editValue = item.valor;
    this.editImage = item.imagenUrl || '';
    this.showModal.set(true);
  }

  closeModal() {
    this.showModal.set(false);
    this.selectedCmsItem.set(null);
  }

  async saveCmsItem() {
    const item = this.selectedCmsItem();
    if (item && item.id) {
       await this.cmsService.updateItem(item.id, {
         valor: this.editValue,
         imagenUrl: this.editImage
       });
       this.closeModal();
    }
  }
}
