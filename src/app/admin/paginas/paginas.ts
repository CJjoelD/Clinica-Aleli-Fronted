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
            <h4>Gestión de Páginas</h4>
          </div>
          <div class="sidebar-scroll">
            <div class="sidebar-section">
              <h3 class="sidebar-category">Páginas Principales</h3>
              <div *ngFor="let page of mainPages()" 
                   class="page-item" 
                   [class.active]="selectedPage()?.id === page.id"
                   (click)="selectPage(page)">
                <span class="page-dot"></span>
                <span class="page-title">{{page.title}}</span>
              </div>
            </div>

            <div class="sidebar-section" *ngIf="servicePages().length > 0">
              <h3 class="sidebar-category">Servicios (Detalle)</h3>
              <div *ngFor="let page of servicePages()" 
                   class="page-item" 
                   [class.active]="selectedPage()?.id === page.id"
                   (click)="selectPage(page)">
                <span class="page-dot srv"></span>
                <span class="page-title">{{page.title.replace('Pág: ', '')}}</span>
              </div>
            </div>
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
              
              <!-- Caso: Hero / Banner Genérico (Instalaciones) -->
              <div *ngIf="['hero', 'banner', 'nosotros_hero'].includes(section.id)" class="edit-mode-container">
                <div class="form-group">
                  <label>{{ section.id === 'nosotros_hero' ? 'Nombre del Área / Instalación' : 'Título Principal' }}</label>
                  <input type="text" [(ngModel)]="section.content.title" (change)="saveChange()" class="form-control" placeholder="Escribe el título aquí...">
                  
                  <div *ngIf="section.content.description !== undefined">
                    <label>Descripción</label>
                    <textarea [(ngModel)]="section.content.description" (change)="saveChange()" class="form-control" rows="3" placeholder="Descripción detallada..."></textarea>
                  </div>
                  <div *ngIf="section.content.subtitle !== undefined">
                    <label>Subtítulo</label>
                    <textarea [(ngModel)]="section.content.subtitle" (change)="saveChange()" class="form-control" rows="3" placeholder="Subtítulo..."></textarea>
                  </div>
                  
                  <div *ngIf="section.content.imageUrl !== undefined" class="image-field">
                    <label>Imagen (URL)</label>
                    <div class="image-input-wrapper">
                      <input type="text" [(ngModel)]="section.content.imageUrl" (change)="saveChange()" class="form-control">
                      <img [src]="section.content.imageUrl" class="field-preview-img" *ngIf="section.content.imageUrl">
                    </div>
                  </div>
                </div>
              </div>

              <!-- Caso: Datos de Contacto -->
              <div *ngIf="section.id === 'datos_contacto'" class="edit-mode-container">
                <div class="contact-edit-grid">
                  <div class="form-group">
                    <label>Dirección Física</label>
                    <input type="text" [(ngModel)]="section.content.address" (change)="saveChange()" class="form-control">
                  </div>
                  <div class="form-group">
                    <label>Teléfono de Contacto</label>
                    <input type="text" [(ngModel)]="section.content.phone" (change)="saveChange()" class="form-control">
                  </div>
                  <div class="form-group">
                    <label>Correo Electrónico</label>
                    <input type="text" [(ngModel)]="section.content.email" (change)="saveChange()" class="form-control">
                  </div>
                  <div class="form-group">
                    <label>Horario de Atención</label>
                    <textarea [(ngModel)]="section.content.schedule" (change)="saveChange()" class="form-control" rows="2"></textarea>
                  </div>
                </div>
              </div>

              <!-- Caso: Grilla de Items Genéricos (Blog, Galería, etc) -->
              <div *ngIf="['articulos', 'lista_especialidades', 'galeria_instalaciones'].includes(section.id) || section.content.items" class="items-grid-container">
                 <div class="items-header" *ngIf="section.id === 'articulos'">
                    <h4>Gestión de Entradas del Blog</h4>
                    <p>Agrega, edita o elimina artículos publicados.</p>
                 </div>
                 <div class="items-header" *ngIf="section.id === 'lista_especialidades'">
                    <h4>Departamentos Médicos</h4>
                    <p>Gestiona las especialidades y departamentos de la clínica.</p>
                 </div>
                 <div class="items-header" *ngIf="section.id === 'galeria_instalaciones'">
                    <h4>Galería de Instalaciones</h4>
                    <p>Sube y gestiona las fotos de la clínica.</p>
                 </div>
                 
                 <div class="visual-items-grid">
                    <div *ngFor="let item of section.content.items; let j = index" class="visual-item-card">
                       <!-- Preview para Contenido con Imagen -->
                       <div class="item-preview" *ngIf="item.imageUrl || item.image">
                          <img [src]="item.imageUrl || item.image || 'assets/images/placeholder.jpg'" alt="Preview" class="item-img">
                          <div class="item-overlay-info">
                             <h5>{{item.title || item.name}}</h5>
                             <p class="truncate">{{item.excerpt || item.description || item.specialty}}</p>
                          </div>
                       </div>
                       
                       <!-- Preview para Contenido sin Imagen (Servicios) -->
                       <div class="item-preview" *ngIf="!item.imageUrl && !item.image">
                          <div class="service-preview-header">
                             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="service-icon"><path d="M22 12h-4l-3 9L9 3l-3 9H2"></path></svg>
                             <h5>{{item.title || item.name}}</h5>
                          </div>
                          <p class="p-3">{{item.description || item.excerpt}}</p>
                       </div>
                       
                       <!-- Formulario de Edición (Modal/Inline) -->
                       <div class="item-edit-form" *ngIf="isEditingItem(section.id, j)">
                          <div class="form-group p-3">
                              <div *ngIf="item.imageUrl !== undefined">
                                <label>URL de Imagen</label>
                                <input type="text" [(ngModel)]="item.imageUrl" (change)="saveChange()" class="form-control">
                              </div>
                              <div *ngIf="item.image !== undefined">
                                <label>Ruta de Imagen (assets/...)</label>
                                <input type="text" [(ngModel)]="item.image" (change)="saveChange()" class="form-control">
                              </div>

                              <div *ngIf="item.specialty !== undefined">
                                <label>Especialidad</label>
                                <input type="text" [(ngModel)]="item.specialty" (change)="saveChange()" class="form-control">
                              </div>
                              
                              <div *ngIf="item.title !== undefined">
                                 <label>Título</label>
                                 <input type="text" [(ngModel)]="item.title" (change)="saveChange()" class="form-control">
                              </div>
                              <div *ngIf="item.name !== undefined">
                                 <label>Nombre</label>
                                 <input type="text" [(ngModel)]="item.name" (change)="saveChange()" class="form-control">
                              </div>
                              
                              <div *ngIf="item.description !== undefined">
                                 <label>Descripción</label>
                                 <textarea [(ngModel)]="item.description" (change)="saveChange()" class="form-control" rows="3"></textarea>
                              </div>
                              <div *ngIf="item.excerpt !== undefined">
                                 <label>Resumen</label>
                                 <textarea [(ngModel)]="item.excerpt" (change)="saveChange()" class="form-control" rows="3"></textarea>
                              </div>
                              <div *ngIf="item.bio !== undefined">
                                 <label>Biografía Professional</label>
                                 <textarea [(ngModel)]="item.bio" (change)="saveChange()" class="form-control" rows="3"></textarea>
                              </div>
                             
                             <button class="btn-done" (click)="stopEditing()">Guardar Cambios</button>
                          </div>
                       </div>

                       <div class="visual-card-actions">
                          <button class="btn-visual-edit" (click)="startEditing(section.id, j)">{{ isEditingItem(section.id, j) ? 'CERRAR' : 'EDITAR' }}</button>
                          <button class="btn-visual-delete" (click)="removeItem(section, j)">ELIMINAR</button>
                       </div>
                    </div>

                    <div class="add-item-empty" (click)="addItem(section, section.id)">
                       <div class="empty-plus">+</div>
                       <span>AGREGAR NUEVO</span>
                    </div>
                 </div>
              </div>

              <!-- Los casos especializados fueron integrados en la grilla genérica superior -->


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
              <div class="generic-content">
                <div *ngIf="section.content.category !== undefined" class="form-group">
                    <label>Categoría / Subtítulo Superior</label>
                    <input type="text" [(ngModel)]="section.content.category" (change)="saveChange()" class="form-control">
                </div>
                <div *ngIf="section.content.title !== undefined" class="form-group">
                    <label>Título</label>
                    <input type="text" [(ngModel)]="section.content.title" (change)="saveChange()" class="form-control">
                </div>
                <div *ngIf="section.content.description !== undefined" class="form-group">
                    <label>Descripción / Contenido de Texto</label>
                    <textarea [(ngModel)]="section.content.description" (change)="saveChange()" class="form-control" rows="4"></textarea>
                </div>
                <div *ngIf="section.content.imageUrl !== undefined" class="form-group">
                    <label>Imagen (URL)</label>
                    <input type="text" [(ngModel)]="section.content.imageUrl" (change)="saveChange()" class="form-control">
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
    .editor-container { padding: 1.5rem; transition: all 0.3s ease; font-family: 'Outfit', sans-serif; }
    
    .page-header { 
      margin-bottom: 2.5rem; 
      display: flex; 
      justify-content: space-between; 
      align-items: center; 
      background: white;
      padding: 1.5rem 2rem;
      border-radius: 20px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.03);
    }
    .header-left { display: flex; align-items: center; gap: 1.5rem; }
    
    .toggle-pages-btn {
      background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px;
      padding: 12px; cursor: pointer; color: #6a1b9a; transition: all 0.2s;
    }
    .toggle-pages-btn:hover { background: #6a1b9a; color: white; border-color: #6a1b9a; transform: scale(1.05); }

    .page-header h1 { color: #1e293b; font-size: 1.8rem; font-weight: 800; margin: 0; }
    .page-header p { color: #64748b; font-size: 0.95rem; margin: 0.25rem 0 0 0; font-weight: 500; }
    
    .editor-layout {
      display: flex;
      gap: 2.5rem;
      align-items: start;
    }

    .pages-list {
      width: 280px;
      background: white;
      border-radius: 24px;
      padding: 1.5rem;
      box-shadow: 0 10px 30px rgba(0,0,0,0.04);
      position: sticky;
      top: 1.5rem;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      overflow: hidden;
      border: 1px solid #f1f5f9;
    }

    .pages-list.collapsed {
      width: 0;
      padding: 0;
      margin: 0;
      opacity: 0;
      pointer-events: none;
    }

    .sidebar-header-simple { margin-bottom: 1.5rem; border-bottom: 1px solid #f1f5f9; padding-bottom: 1rem; }
    .sidebar-header-simple h4 {
      font-size: 0.75rem;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: #94a3b8;
      margin: 0;
      padding-left: 0.75rem;
      font-weight: 800;
    }

    .page-selector {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 1rem;
      border-radius: 16px;
      cursor: pointer;
      margin-bottom: 0.5rem;
      transition: all 0.3s ease;
      color: #475569;
      font-weight: 600;
      font-size: 0.95rem;
    }

    .sidebar-scroll { max-height: calc(100vh - 150px); overflow-y: auto; padding-right: 5px; }
    .sidebar-scroll::-webkit-scrollbar { width: 4px; }
    .sidebar-scroll::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }

    .sidebar-category { 
      font-size: 0.7rem; text-transform: uppercase; letter-spacing: 1.5px; 
      color: #94a3b8; font-weight: 800; margin: 1.5rem 0 0.8rem 0.5rem; 
    }

    .page-item {
      display: flex; align-items: center; gap: 12px; padding: 12px 16px; 
      border-radius: 14px; cursor: pointer; transition: all 0.2s;
      color: #475569; font-weight: 600; font-size: 0.9rem; margin-bottom: 4px;
    }
    .page-item:hover { background: #f8fafc; color: #6a1b9a; }
    .page-item.active { background: #f5edfa; color: #6a1b9a; }

    .page-dot { width: 6px; height: 6px; border-radius: 50%; background: #cbd5e1; }
    .page-dot.srv { background: #26C6B2; }
    .page-item.active .page-dot { background: #6a1b9a; transform: scale(1.3); }

    .sections-editor { flex: 1; display: flex; flex-direction: column; gap: 2rem; }

    .page-info-header {
      margin-bottom: 1rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: white;
      padding: 1.8rem 2.5rem;
      border-radius: 24px;
      box-shadow: 0 4px 15px rgba(0,0,0,0.02);
      border: 1px solid #f1f5f9;
    }
    .title-area { display: flex; align-items: center; gap: 1.2rem; }
    .page-info-header h2 { margin: 0; font-size: 1.6rem; color: #1e293b; font-weight: 800; }
    .page-status { font-size: 0.75rem; background: #f5edfa; color: #6a1b9a; padding: 6px 14px; border-radius: 20px; font-weight: 800; text-transform: uppercase; }
    .page-id { font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; color: #94a3b8; font-weight: 600; }

    .section-card {
      background: white;
      border-radius: 24px;
      border: 1px solid #f1f5f9;
      overflow: hidden;
      box-shadow: 0 10px 25px rgba(0,0,0,0.03);
      transition: all 0.3s ease;
    }
    .section-card:hover { transform: translateY(-4px); box-shadow: 0 20px 40px rgba(0,0,0,0.06); }

    .section-header {
      padding: 1.5rem 2.5rem;
      background: #fafafa;
      border-bottom: 1px solid #f1f5f9;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .header-main { display: flex; align-items: center; gap: 1.2rem; }
    .drag-handle { color: #cbd5e1; cursor: grab; font-weight: 900; font-size: 1.2rem; opacity: 0.5; }
    .header-main h3 { margin: 0; font-size: 1.2rem; color: #1e293b; font-weight: 800; }
    
    .header-actions { display: flex; align-items: center; gap: 1.5rem; }

    .delete-btn {
      background: #fff1f2; border: none; color: #f43f5e; cursor: pointer;
      width: 38px; height: 38px; border-radius: 12px; display: flex; align-items: center; justify-content: center;
      transition: all 0.2s;
    }
    .delete-btn:hover { background: #f43f5e; color: white; transform: scale(1.1); }

    .section-body { padding: 3rem; }

    /* Visual Item Cards */
    .visual-items-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
      gap: 2rem;
      margin-top: 2rem;
    }

    .visual-item-card {
      background: white; border: 1px solid #f1f5f9; border-radius: 20px;
      overflow: hidden; display: flex; flex-direction: column;
      box-shadow: 0 4px 10px rgba(0,0,0,0.02); transition: all 0.4s ease;
    }
    .visual-item-card:hover { transform: translateY(-8px); box-shadow: 0 20px 40px rgba(0,0,0,0.08); border-color: #6a1b9a; }

    .item-preview { position: relative; height: 180px; display: flex; flex-direction: column; }
    .item-img { width: 100%; height: 100%; object-fit: cover; }
    .item-overlay-info {
      position: absolute; bottom: 0; left: 0; right: 0;
      padding: 1.5rem; background: linear-gradient(transparent, rgba(0,0,0,0.85));
      color: white;
    }
    .item-overlay-info h5 { margin: 0; font-size: 1.1rem; font-weight: 800; }
    .item-overlay-info p { margin: 6px 0 0; font-size: 0.85rem; opacity: 0.8; font-weight: 500; }

    .visual-card-actions {
      display: flex; padding: 1.2rem; gap: 1rem; background: #fafafa;
      border-top: 1px solid #f1f5f9;
    }
    .btn-visual-edit, .btn-visual-delete {
      flex: 1; padding: 12px; border-radius: 12px; font-weight: 800; font-size: 0.8rem;
      cursor: pointer; border: none; transition: all 0.2s;
    }
    .btn-visual-edit { background: #f1f5f9; color: #475569; }
    .btn-visual-edit:hover { background: #6a1b9a; color: white; }
    .btn-visual-delete { background: #fef2f2; color: #ef4444; }
    .btn-visual-delete:hover { background: #ef4444; color: white; }

    .add-item-empty {
      border: 2px dashed #e2e8f0; border-radius: 20px;
      display: flex; flex-direction: column; align-items: center; justify-content: center;
      gap: 1rem; cursor: pointer; transition: all 0.3s; color: #94a3b8;
      min-height: 220px; background: #fafafa;
    }
    .add-item-empty:hover { border-color: #6a1b9a; color: #6a1b9a; background: #f5edfa; }
    .empty-plus { font-size: 3rem; font-weight: 200; }
    .add-item-empty span { font-weight: 800; font-size: 0.85rem; letter-spacing: 1px; }

    /* Contact Grid */
    .contact-edit-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 2rem;
    }

    /* Doctor specific */
    .doctor-preview { height: auto; padding: 2rem; display: flex; flex-direction: column; align-items: center; background: white; text-align: center; }
    .doctor-img { width: 90px; height: 90px; border-radius: 24px; box-shadow: 0 10px 20px rgba(0,0,0,0.1); margin-bottom: 1.5rem; }
    .doctor-info h5 { margin: 0; color: #1e293b; font-size: 1.1rem; font-weight: 800; }
    .specialty { font-size: 0.85rem; color: #6a1b9a; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; }

    .service-preview-header { padding: 2rem 2rem 1rem; display: flex; align-items: center; gap: 1.2rem; }
    .service-icon { color: #6a1b9a; width: 32px; height: 32px; }

    /* Form and general Utils */
    .form-group { display: flex; flex-direction: column; gap: 0.8rem; }
    .form-group label { font-size: 0.9rem; font-weight: 800; color: #475569; letter-spacing: -0.2px; }
    .form-control {
      padding: 1rem 1.2rem; border: 1px solid #e2e8f0; border-radius: 14px;
      font-size: 1rem; background: #f8fafc; transition: all 0.3s ease;
      color: #1e293b;
    }
    .form-control:focus { outline: none; border-color: #6a1b9a; box-shadow: 0 0 0 5px rgba(106, 27, 154, 0.1); background: white; }

    .field-preview-img { width: 120px; height: 70px; object-fit: cover; border-radius: 12px; margin-left: 1.5rem; border: 2px solid white; box-shadow: 0 4px 10px rgba(0,0,0,0.1); }
    .image-input-wrapper { display: flex; align-items: center; }

    .switch { position: relative; display: inline-block; width: 50px; height: 26px; }
    .switch input { opacity: 0; width: 0; height: 0; }
    .slider { position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; background-color: #e2e8f0; transition: .4s; border-radius: 34px; }
    .slider:before { position: absolute; content: ""; height: 20px; width: 20px; left: 3px; bottom: 3px; background-color: white; transition: .4s; border-radius: 50%; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
    input:checked + .slider { background-color: #6a1b9a; }
    input:checked + .slider:before { transform: translateX(24px); }

    .btn-done { background: #6a1b9a; color: white; border: none; padding: 12px; border-radius: 14px; cursor: pointer; font-weight: 800; width: 100%; transition: all 0.2s; box-shadow: 0 4px 10px rgba(106, 27, 154, 0.2); }
    .btn-done:hover { background: #4a148c; transform: scale(0.98); }

    .add-section-btn {
       padding: 1.5rem 3rem; background: #1e293b; color: white;
       border: none; border-radius: 20px; cursor: pointer;
       font-weight: 800; display: flex; align-items: center; gap: 1rem; align-self: center;
       box-shadow: 0 10px 30px rgba(0,0,0,0.15); transition: all 0.3s ease;
    }
    .add-section-btn:hover { background: #6a1b9a; transform: translateY(-3px); box-shadow: 0 20px 40px rgba(106, 27, 154, 0.25); }

    .truncate { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
    .p-3 { padding: 1.5rem; }
    .mb-2 { margin-bottom: 0.8rem; }
    .mt-2 { margin-top: 0.8rem; }
    
    @media (max-width: 1024px) {
      .editor-layout { flex-direction: column; }
      .pages-list { width: 100%; position: static; }
      .contact-edit-grid { grid-template-columns: 1fr; }
    }
  `]
})
export class PaginaEditorComponent {
  private paginaService = inject(PaginaService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  pages = this.paginaService.pages;
  mainPageIds = ['inicio', 'servicios', 'especialidades', 'nosotros', 'contacto'];
  mainPages = computed(() => this.pages().filter(p => this.mainPageIds.includes(p.id)));
  servicePages = computed(() => this.pages().filter(p => p.id.startsWith('srv_')));

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
    this.editingItemId.set(`${sectionId} - ${index}`);
  }

  isEditingItem(sectionId: string, index: number): boolean {
    return this.editingItemId() === `${sectionId} - ${index}`;
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

    if (type === 'servicios' || type === 'lista_especialidades') {
      newItem = { ...newItem, title: 'Nuevo Item', description: 'Descripción breve.' };
    } else if (type === 'articulos') {
      newItem = { ...newItem, id: 'post-' + Date.now(), title: 'Nuevo Artículo', excerpt: 'Resumen...', imageUrl: 'assets/images/placeholder.jpg' };
    } else if (type === 'lista_medicos') {
      newItem = { ...newItem, name: 'Nombre Apellido', specialty: 'Especialidad', bio: 'Bio...', image: 'assets/images/placeholder.jpg' };
    } else if (type === 'galeria_instalaciones') {
      newItem = { ...newItem, title: 'Nueva Instalación', excerpt: 'Descripción...', imageUrl: 'assets/images/placeholder.jpg' };
    } else if (type === 'faq') {
      newItem = { question: 'Nueva Pregunta', answer: 'Nueva Respuesta' };
    } else if (this.selectedPage()?.id.startsWith('srv_')) {
      newItem = { ...newItem, title: 'Nuevo punto o detalle' };
    } else {
      newItem = { title: 'Nuevo Item' };
    }

    section.content.items.push(newItem);
    this.saveChange();
    this.startEditing(section.id, section.content.items.length - 1);
  }
}
