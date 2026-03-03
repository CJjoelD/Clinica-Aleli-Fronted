import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PaginaService } from '../../services/pagina.service';
import { PageConfig, SectionConfig } from '../../models/cms.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-pagina-editor',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="editor-container" [class.sidebar-hidden]="!isSidebarVisible()">
      <header class="page-header">
        <div class="header-left">
          <button class="toggle-pages-btn" (click)="toggleSidebar()" [title]="isSidebarVisible() ? 'Ocultar páginas' : 'Mostrar páginas'">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="9" y1="3" x2="9" y2="21"></line></svg>
          </button>
          <div>
            <h1>Gestión de Contenido</h1>
            <p>Edita las secciones y el contenido de tu sitio web de forma dinámica.</p>
          </div>
        </div>
      </header>

      <div class="editor-layout">
        <!-- Sidebar: Lista de Páginas Categorizada -->
        <aside class="pages-list" [class.collapsed]="!isSidebarVisible()">
          <div class="sidebar-header-simple">
            <h4>Páginas</h4>
          </div>
          <div 
            *ngFor="let page of pages()" 
            class="page-selector"
            [class.active]="selectedPage()?.id === page.id"
            (click)="selectPage(page)">
            <span class="page-dot"></span>
            {{page.title}}
          </div>
        </aside>

        <!-- Main Workspace -->
        <main class="sections-editor" *ngIf="selectedPage() as page">
          <div class="page-info-header">
            <div class="title-area">
              <h2>{{page.title}}</h2>
              <span class="page-status">Borrador</span>
            </div>
            <span class="page-id">ID: {{page.id}}</span>
          </div>

          <div class="section-card" *ngFor="let section of page.sections; let i = index">
            <div class="section-header">
              <div class="header-main">
                <span class="drag-handle">::</span>
                <h3>{{section.name}}</h3>
              </div>
              <div class="header-actions">
                <label class="switch">
                  <input type="checkbox" [(ngModel)]="section.enabled" (change)="saveChange()">
                  <span class="slider round"></span>
                </label>
                <button class="delete-btn" (click)="deleteSection(i)" title="Eliminar sección">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                </button>
              </div>
            </div>

            <div class="section-body" *ngIf="section.enabled">
              <!-- Renderiza diferentes campos según el ID de la sección -->
              
              <!-- Caso: Hero / Banner Genérico -->
              <div *ngIf="['hero', 'banner', 'nosotros_hero'].includes(section.id)" class="edit-mode-container">
                <div class="form-group">
                  <label>Título Principal</label>
                  <input type="text" [(ngModel)]="section.content.title" (change)="saveChange()" class="form-control" placeholder="Escribe el título aquí...">
                  
                  <div *ngIf="section.content.description !== undefined">
                    <label>Descripción</label>
                    <textarea [(ngModel)]="section.content.description" (change)="saveChange()" class="form-control" rows="3" placeholder="Descripción detallada..."></textarea>
                  </div>
                  
                  <div *ngIf="section.content.imageUrl !== undefined" class="image-field">
                    <label>URL de Imagen</label>
                    <div class="image-input-wrapper">
                      <input type="text" [(ngModel)]="section.content.imageUrl" (change)="saveChange()" class="form-control">
                      <img [src]="section.content.imageUrl" class="field-preview-img" *ngIf="section.content.imageUrl">
                    </div>
                  </div>
                </div>
              </div>

              <!-- Caso: Artículos del Blog -->
              <div *ngIf="section.id === 'articulos'" class="items-grid-container">
                 <div class="items-header">
                    <h4>Gestión de Entradas del Blog</h4>
                    <p>Agrega, edita o elimina artículos publicados.</p>
                 </div>
                 
                 <div class="visual-items-grid">
                    <div *ngFor="let item of section.content.items; let j = index" class="visual-item-card">
                       <div class="item-preview">
                          <img [src]="item.imageUrl || 'assets/images/placeholder.jpg'" alt="Preview" class="item-img">
                          <div class="item-overlay-info">
                             <h5>{{item.title}}</h5>
                             <p class="truncate">{{item.excerpt}}</p>
                          </div>
                       </div>
                       
                       <div class="item-edit-form" *ngIf="isEditingItem(section.id, j)">
                          <div class="form-group p-3">
                             <label>Título</label>
                             <input type="text" [(ngModel)]="item.title" (change)="saveChange()" class="form-control">
                             <label>Resumen</label>
                             <textarea [(ngModel)]="item.excerpt" (change)="saveChange()" class="form-control" rows="2"></textarea>
                             <label>Imagen URL</label>
                             <input type="text" [(ngModel)]="item.imageUrl" (change)="saveChange()" class="form-control">
                             <label>Link / ID</label>
                             <input type="text" [(ngModel)]="item.id" (change)="saveChange()" class="form-control">
                             <button class="btn-done" (click)="stopEditing()">Listo</button>
                          </div>
                       </div>

                       <div class="visual-card-actions">
                          <button class="btn-visual-edit" (click)="startEditing(section.id, j)">EDITAR</button>
                          <button class="btn-visual-delete" (click)="removeItem(section, j)">ELIMINAR</button>
                       </div>
                    </div>

                    <div class="add-item-empty" (click)="addItem(section, 'articulo')">
                       <div class="empty-plus">+</div>
                       <span>NUEVA ENTRADA</span>
                    </div>
                 </div>
              </div>

              <!-- Caso: Servicios -->
              <div *ngIf="section.id === 'servicios'" class="items-grid-container">
                 <div class="items-header">
                    <h4>Tarjetas de Servicios</h4>
                    <p>Gestiona los servicios que se muestran en esta sección.</p>
                 </div>
                 
                 <div class="visual-items-grid">
                    <div *ngFor="let item of section.content.items; let j = index" class="visual-item-card">
                       <div class="item-preview">
                          <div class="service-preview-header">
                             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="service-icon"><path d="M22 12h-4l-3 9L9 3l-3 9H2"></path></svg>
                             <h5>{{item.title}}</h5>
                          </div>
                          <p class="p-3">{{item.description}}</p>
                       </div>
                       
                       <div class="item-edit-form" *ngIf="isEditingItem(section.id, j)">
                          <div class="form-group p-3">
                             <label>Título del Servicio</label>
                             <input type="text" [(ngModel)]="item.title" (change)="saveChange()" class="form-control">
                             <label>Descripción</label>
                             <textarea [(ngModel)]="item.description" (change)="saveChange()" class="form-control" rows="3"></textarea>
                             <button class="btn-done" (click)="stopEditing()">Listo</button>
                          </div>
                       </div>

                       <div class="visual-card-actions">
                          <button class="btn-visual-edit" (click)="startEditing(section.id, j)">EDITAR</button>
                          <button class="btn-visual-delete" (click)="removeItem(section, j)">ELIMINAR</button>
                       </div>
                    </div>

                    <div class="add-item-empty" (click)="addItem(section, 'servicio')">
                       <div class="empty-plus">+</div>
                       <span>AGREGAR SERVICIO</span>
                    </div>
                 </div>
              </div>

              <!-- Caso: Directorio (Médicos) -->
              <div *ngIf="section.id === 'lista_medicos'" class="items-grid-container">
                 <div class="items-header">
                    <h4>Directorio Médico</h4>
                    <p>Personaliza el staff de especialistas.</p>
                 </div>
                 
                 <div class="visual-items-grid">
                    <div *ngFor="let item of section.content.items; let j = index" class="visual-item-card doctor-card">
                       <div class="item-preview doctor-preview">
                          <img [src]="item.imageUrl || 'assets/images/placeholder.jpg'" alt="Doctor" class="doctor-img">
                          <div class="doctor-info">
                             <h5>{{item.name}}</h5>
                             <span class="specialty">{{item.specialty}}</span>
                          </div>
                       </div>
                       
                       <div class="item-edit-form" *ngIf="isEditingItem(section.id, j)">
                          <div class="form-group p-3">
                             <label>Nombre</label>
                             <input type="text" [(ngModel)]="item.name" (change)="saveChange()" class="form-control">
                             <label>Especialidad</label>
                             <input type="text" [(ngModel)]="item.specialty" (change)="saveChange()" class="form-control">
                             <label>Biografía</label>
                             <textarea [(ngModel)]="item.bio" (change)="saveChange()" class="form-control" rows="3"></textarea>
                             <button class="btn-done" (click)="stopEditing()">Listo</button>
                          </div>
                       </div>

                       <div class="visual-card-actions">
                          <button class="btn-visual-edit" (click)="startEditing(section.id, j)">EDITAR</button>
                          <button class="btn-visual-delete" (click)="removeItem(section, j)">ELIMINAR</button>
                       </div>
                    </div>

                    <div class="add-item-empty" (click)="addItem(section, 'medico_detalle')">
                       <div class="empty-plus">+</div>
                       <span>NUEVO MÉDICO</span>
                    </div>
                 </div>
              </div>

              <!-- Caso: FAQ -->
              <div *ngIf="section.id === 'faq'" class="form-group">
                <div class="faq-list">
                  <div *ngFor="let item of section.content.items; let j = index" class="faq-item-simple">
                     <div class="faq-header" (click)="startEditing('faq', j)">
                        <span>P: {{item.question}}</span>
                        <button class="remove-item" (click)="removeItem(section, j); $event.stopPropagation()">×</button>
                     </div>
                     <div class="faq-edit-area" *ngIf="isEditingItem('faq', j)">
                        <input type="text" [(ngModel)]="item.question" (change)="saveChange()" class="form-control mb-2">
                        <textarea [(ngModel)]="item.answer" (change)="saveChange()" class="form-control"></textarea>
                        <button class="btn-done mt-2" (click)="stopEditing()">Ok</button>
                     </div>
                  </div>
                </div>
                <button class="add-btn" (click)="addItem(section, 'faq')">+ Nueva Pregunta FRECUENTE</button>
              </div>

              <!-- Caso Genérico / Otros -->
              <div *ngIf="!['hero', 'banner', 'nosotros_hero', 'articulos', 'lista_medicos', 'servicios', 'faq'].includes(section.id)" class="generic-content">
                <div *ngIf="section.content.title !== undefined" class="form-group">
                    <label>Título</label>
                    <input type="text" [(ngModel)]="section.content.title" (change)="saveChange()" class="form-control">
                </div>
                <div *ngIf="section.content.description !== undefined" class="form-group">
                    <label>Descripción</label>
                    <textarea [(ngModel)]="section.content.description" (change)="saveChange()" class="form-control"></textarea>
                </div>
              </div>
            </div>
          </div>
          
          <div class="editor-actions">
             <button class="add-section-btn" (click)="addNewSection()">
               <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
               Agregar Nueva Sección
             </button>
          </div>
        </main>
      </div>
    </div>
  `,
  styles: [`
    .editor-container { padding: 1.5rem; transition: all 0.3s ease; }
    
    .page-header { 
      margin-bottom: 2.5rem; 
      display: flex; 
      justify-content: space-between; 
      align-items: center; 
    }
    .header-left { display: flex; align-items: center; gap: 1.5rem; }
    
    .toggle-pages-btn {
      background: white; border: 1px solid #e2e8f0; border-radius: 8px;
      padding: 10px; cursor: pointer; color: #64748b; transition: all 0.2s;
    }
    .toggle-pages-btn:hover { background: #f8fafc; color: #1e293b; border-color: #cbd5e1; }

    .page-header h1 { color: #0f172a; font-size: 1.75rem; font-weight: 800; margin: 0; }
    .page-header p { color: #64748b; font-size: 1rem; margin: 0; }
    
    .editor-layout {
      display: flex;
      gap: 2.5rem;
      align-items: start;
    }

    .pages-list {
      width: 280px;
      background: white;
      border-radius: 16px;
      padding: 1.25rem;
      box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);
      position: sticky;
      top: 1.5rem;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      overflow: hidden;
    }

    .pages-list.collapsed {
      width: 0;
      padding: 0;
      margin: 0;
      opacity: 0;
      pointer-events: none;
    }

    .sidebar-header-simple { margin-bottom: 1rem; border-bottom: 1px solid #f1f5f9; padding-bottom: 0.5rem; }
    .sidebar-header-simple h4 {
      font-size: 0.75rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: #94a3b8;
      margin: 0;
      padding-left: 0.75rem;
    }

    .page-selector {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.875rem 1rem;
      border-radius: 10px;
      cursor: pointer;
      margin-bottom: 0.25rem;
      transition: all 0.2s;
      color: #475569;
      font-weight: 500;
      font-size: 0.9rem;
    }

    .page-dot { width: 6px; height: 6px; border-radius: 50%; background: #cbd5e1; }
    .page-selector:hover { background: #f1f5f9; color: #0f172a; }
    .page-selector.active { background: #eff6ff; color: #2563eb; }
    .page-selector.active .page-dot { background: #2563eb; transform: scale(1.5); }

    .sections-editor { flex: 1; display: flex; flex-direction: column; gap: 2rem; }

    .page-info-header {
      margin-bottom: 1.5rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: white;
      padding: 1.5rem 2rem;
      border-radius: 20px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.05);
    }
    .title-area { display: flex; align-items: center; gap: 1rem; }
    .page-info-header h2 { margin: 0; font-size: 1.5rem; color: #0f172a; }
    .page-status { font-size: 0.7rem; background: #fef3c7; color: #b45309; padding: 4px 10px; border-radius: 20px; font-weight: 700; text-transform: uppercase; }
    .page-id { font-family: monospace; font-size: 0.8rem; color: #94a3b8; }

    .section-card {
      background: white;
      border-radius: 20px;
      border: 1px solid #e2e8f0;
      overflow: hidden;
      box-shadow: 0 4px 6px -1px rgba(0,0,0,0.02);
      transition: transform 0.2s, box-shadow 0.2s;
    }
    .section-card:hover { box-shadow: 0 10px 15px -3px rgba(0,0,0,0.04); }

    .section-header {
      padding: 1.25rem 2rem;
      background: #fafafc;
      border-bottom: 1px solid #e2e8f0;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .header-main { display: flex; align-items: center; gap: 1rem; }
    .drag-handle { color: #cbd5e1; cursor: grab; font-weight: 900; }
    .header-main h3 { margin: 0; font-size: 1.1rem; color: #1e293b; font-weight: 700; }
    .header-actions { display: flex; align-items: center; gap: 1rem; }

    .delete-btn {
      background: transparent; border: none; color: #94a3b8; cursor: pointer;
      padding: 6px; border-radius: 6px; transition: all 0.2s;
    }
    .delete-btn:hover { color: #ef4444; background: #fee2e2; }

    .section-body { padding: 2rem; }

    /* Visual Item Cards */
    .visual-items-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 1.5rem;
      margin-top: 1.5rem;
    }

    .visual-item-card {
      background: white; border: 1px solid #e2e8f0; border-radius: 16px;
      overflow: hidden; display: flex; flex-direction: column;
      box-shadow: 0 2px 4px rgba(0,0,0,0.02); transition: all 0.2s;
    }
    .visual-item-card:hover { transform: translateY(-4px); box-shadow: 0 12px 20px rgba(0,0,0,0.05); border-color: #3b82f6; }

    .item-preview { position: relative; height: 160px; }
    .item-img { width: 100%; height: 100%; object-fit: cover; }
    .item-overlay-info {
      position: absolute; bottom: 0; left: 0; right: 0;
      padding: 1rem; background: linear-gradient(transparent, rgba(0,0,0,0.8));
      color: white;
    }
    .item-overlay-info h5 { margin: 0; font-size: 1rem; }
    .item-overlay-info p { margin: 4px 0 0; font-size: 0.8rem; opacity: 0.9; }

    .visual-card-actions {
      display: flex; padding: 1rem; gap: 1rem; background: #f8fafc;
      border-top: 1px solid #e2e8f0;
    }
    .btn-visual-edit, .btn-visual-delete {
      flex: 1; padding: 10px; border-radius: 8px; font-weight: 700; font-size: 0.8rem;
      cursor: pointer; border: none; transition: all 0.2s;
    }
    .btn-visual-edit { background: #e2e8f0; color: #1e293b; }
    .btn-visual-edit:hover { background: #cbd5e1; }
    .btn-visual-delete { background: #e2e8f0; color: #1e293b; }
    .btn-visual-delete:hover { background: #fee2e2; color: #ef4444; }

    .add-item-empty {
      border: 2px dashed #cbd5e1; border-radius: 16px;
      display: flex; flex-direction: column; align-items: center; justify-content: center;
      gap: 1rem; cursor: pointer; transition: all 0.2s; color: #94a3b8;
      min-height: 200px;
    }
    .add-item-empty:hover { border-color: #3b82f6; color: #3b82f6; background: #eff6ff; }
    .empty-plus { font-size: 2rem; font-weight: 300; }
    .add-item-empty span { font-weight: 700; font-size: 0.8rem; letter-spacing: 0.05em; }

    /* Doctor specific */
    .doctor-preview { height: auto; padding: 1.5rem; display: flex; gap: 1rem; align-items: center; }
    .doctor-img { width: 64px; height: 64px; border-radius: 50%; }
    .doctor-info h5 { margin: 0; color: #1e293b; }
    .specialty { font-size: 0.8rem; color: #3b82f6; font-weight: 600; }

    .service-preview-header { padding: 1.5rem 1.5rem 0.5rem; display: flex; align-items: center; gap: 1rem; }
    .service-icon { color: #3b82f6; }

    /* Form and general Utils */
    .form-group { display: flex; flex-direction: column; gap: 0.75rem; }
    .form-group label { font-size: 0.85rem; font-weight: 700; color: #475569; }
    .form-control {
      padding: 0.75rem 1rem; border: 1px solid #e2e8f0; border-radius: 12px;
      font-size: 0.9rem; background: #fafafa; transition: all 0.2s;
    }
    .form-control:focus { outline: none; border-color: #3b82f6; box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1); background: white; }

    .field-preview-img { width: 100px; height: 60px; object-fit: cover; border-radius: 8px; margin-left: 1rem; }
    .image-input-wrapper { display: flex; align-items: center; }

    .switch { position: relative; display: inline-block; width: 44px; height: 22px; }
    .switch input { opacity: 0; width: 0; height: 0; }
    .slider { position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; background-color: #e2e8f0; transition: .4s; border-radius: 34px; }
    .slider:before { position: absolute; content: ""; height: 16px; width: 16px; left: 3px; bottom: 3px; background-color: white; transition: .4s; border-radius: 50%; }
    input:checked + .slider { background-color: #3b82f6; }
    input:checked + .slider:before { transform: translateX(22px); }

    .btn-done { background: #0f172a; color: white; border: none; padding: 8px 16px; border-radius: 8px; cursor: pointer; font-weight: 600; width: 100%; }
    .add-section-btn {
       padding: 1.25rem 2.5rem; background: #0f172a; color: white;
       border: none; border-radius: 16px; cursor: pointer;
       font-weight: 700; display: flex; align-items: center; gap: 0.75rem; align-self: center;
       box-shadow: 0 10px 25px rgba(0,0,0,0.1); transition: all 0.2s;
    }
    .add-section-btn:hover { background: #1e293b; transform: translateY(-2px); box-shadow: 0 15px 30px rgba(0,0,0,0.15); }

    .truncate { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
    .p-3 { padding: 1rem; }
    .mb-2 { margin-bottom: 0.5rem; }
    .mt-2 { margin-top: 0.5rem; }
  `]
})
export class PaginaEditorComponent {
  private paginaService = inject(PaginaService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  pages = this.paginaService.pages;
  selectedPage = signal<PageConfig | null>(null);
  isSidebarVisible = signal(true);
  editingItemId = signal<string | null>(null);

  constructor() {
    this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        const page = this.pages().find(p => p.id === id);
        if (page) this.selectedPage.set(page);
      } else if (this.pages().length > 0 && !this.selectedPage()) {
        this.selectedPage.set(this.pages()[0]);
      }
    });
  }

  toggleSidebar() {
    this.isSidebarVisible.update(v => !v);
  }

  selectPage(page: PageConfig) {
    this.selectedPage.set(page);
    this.router.navigate(['/admin/paginas', page.id]);
    this.editingItemId.set(null);
  }

  startEditing(sectionId: string, index: number) {
    this.editingItemId.set(`${sectionId}-${index}`);
  }

  isEditingItem(sectionId: string, index: number): boolean {
    return this.editingItemId() === `${sectionId}-${index}`;
  }

  stopEditing() {
    this.editingItemId.set(null);
  }

  saveChange() {
    const page = this.selectedPage();
    if (page) {
      this.paginaService.updatePage({ ...page });
    }
  }

  deleteSection(index: number) {
    const page = this.selectedPage();
    if (page && confirm('¿Estás seguro de eliminar esta sección?')) {
      page.sections.splice(index, 1);
      this.saveChange();
    }
  }

  addNewSection() {
    const page = this.selectedPage();
    if (page) {
      const newSec: SectionConfig = {
        id: 'new-' + Date.now(),
        name: 'Nueva Sección',
        enabled: true,
        content: { title: 'Nuevo Título', description: 'Nueva descripción' }
      };
      page.sections.push(newSec);
      this.saveChange();
    }
  }

  removeItem(section: SectionConfig, index: number) {
    if (confirm('¿Eliminar este elemento?')) {
      section.content.items.splice(index, 1);
      this.saveChange();
    }
  }

  addItem(section: SectionConfig, type?: string) {
    if (!section.content.items) section.content.items = [];

    let newItem: any = { id: Date.now() };

    if (type === 'servicio') {
      newItem = { ...newItem, title: 'Nuevo Servicio', description: 'Descripción breve para la tarjeta.' };
    } else if (type === 'articulo') {
      newItem = { ...newItem, id: 'post-' + Date.now(), title: 'Nuevo Artículo', excerpt: 'Resumen de la noticia...', imageUrl: 'assets/images/BLOG/placeholder.png' };
    } else if (type === 'medico_detalle') {
      newItem = { ...newItem, name: 'Nombre Apellido', specialty: 'Especialidad', bio: 'Bio...', imageUrl: 'assets/images/ESPECIALIDADES/placeholder.png' };
    } else if (type === 'faq') {
      newItem = { question: 'Nueva Pregunta', answer: 'Nueva Respuesta' };
    } else {
      newItem = { title: 'Nuevo Item' };
    }

    section.content.items.push(newItem);
    this.saveChange();
    this.startEditing(section.id, section.content.items.length - 1);
  }
}
