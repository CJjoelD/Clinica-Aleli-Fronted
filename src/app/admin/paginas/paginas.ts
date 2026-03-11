import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PaginaService } from '../../services/pagina.service';
import { PageConfig, SectionConfig } from '../../models/cms.model';
import { ActivatedRoute, Router } from '@angular/router';
import { DOCTORS } from '../../data/doctor-data';

@Component({
  selector: 'app-pagina-editor',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="editor-container">
      <header class="page-header">
        <div class="header-left">
          <button class="toggle-pages-btn" (click)="toggleSidebar()" [title]="isSidebarVisible() ? 'Ocultar menú' : 'Mostrar menú'">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="9" y1="3" x2="9" y2="21"></line></svg>
          </button>
          <div>
            <h1>Editor de Contenido</h1>
            <p>{{selectedPage()?.title || 'Seleccione una página para comenzar'}}</p>
          </div>
        </div>
        <div class="header-actions-main">
           <button class="btn-preview-public" routerLink="/especialidades" target="_blank">VER WEB PÚBLICA</button>
        </div>
      </header>

      <div class="editor-layout">
        <!-- Sidebar Compacto -->
        <aside class="pages-list" [class.collapsed]="!isSidebarVisible()" *ngIf="isSidebarVisible()">
          <div class="sidebar-scroll">
            <div class="sidebar-section">
              <h3 class="sidebar-category">VISTAS PRINCIPALES</h3>
              <div *ngFor="let page of mainPages()" 
                   class="page-item" 
                   [class.active]="selectedPage()?.id === page.id"
                   (click)="selectPage(page)">
                <div class="page-icon-box">
                   <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path></svg>
                </div>
                <span class="page-title">{{page.title}}</span>
              </div>
            </div>

            <div class="sidebar-section" *ngIf="servicePages().length > 0">
              <h3 class="sidebar-category">DETALLE DE SERVICIOS</h3>
              <div *ngFor="let page of servicePages()" 
                   class="page-item" 
                   [class.active]="selectedPage()?.id === page.id"
                   (click)="selectPage(page)">
                <div class="page-icon-box srv">
                   <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 21a9 9 0 100-18 9 9 0 000 18z M12 8v8M8 12h8"></path></svg>
                </div>
                <span class="page-title">{{page.title.replace('Pág: ', '')}}</span>
              </div>
            </div>
          </div>
        </aside>

        <main class="sections-editor" *ngIf="selectedPage() as page">
          <!-- Iteración de Secciones con diseño diferenciado -->
          <ng-container *ngFor="let section of page.sections; let i = index">
            
            <!-- CASO ESPECIAL: Lista de Médicos (Se edita directamente en tarjetas) -->
            <div class="section-container-focused" *ngIf="section.id === 'lista_medicos'">
                <div class="focused-header">
                   <div class="header-info">
                      <span class="focus-tag">GESTIÓN CENTRAL</span>
                      <h2>Control de Médicos y Especialistas</h2>
                      <p>Los cambios realizados aquí se sincronizan en todo el sitio web automáticamente.</p>
                   </div>
                   <button class="btn-add-highlight" (click)="addItem(section, 'lista_medicos')">
                      <span>+</span> AÑADIR NUEVO DOCTOR
                   </button>
                </div>

                <div class="visual-items-grid">
                    <div *ngFor="let item of section.content.items; let j = index" class="doctor-admin-card">
                       <div class="card-status-dot" [class.online]="section.enabled"></div>
                       <div class="doctor-card-content">
                          <div class="doctor-img-box">
                             <img [src]="item.image || item.imageUrl || 'assets/images/placeholder.jpg'">
                          </div>
                          <div class="doctor-text-box">
                             <span class="doctor-spec-label">{{item.specialty || 'SIN ESPECIALIDAD'}}</span>
                             <h4>{{item.name || 'Sin Nombre'}}</h4>
                             <p class="doctor-preview-bio">{{item.bio || 'Sin biografía configurada...'}}</p>
                          </div>
                       </div>
                       <div class="card-footer-actions">
                          <button class="btn-action-edit" (click)="startItemEditing(item)">
                             CONFIGURAR PERFIL COMPLETO
                          </button>
                          <button class="btn-action-delete" (click)="removeItem(section, j)" title="Eliminar">
                             <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                          </button>
                       </div>
                    </div>
                </div>
            </div>

            <!-- SECCIONES GENÉRICAS (Colapsables o más discretas) -->
            <div class="section-card-compact" *ngIf="section.id !== 'lista_medicos'">
              <div class="compact-header" (click)="section.isExpanded = !section.isExpanded">
                <div class="header-left-compact">
                  <div class="status-indicator" [class.enabled]="section.enabled"></div>
                  <h3>{{section.name}}</h3>
                </div>
                <div class="header-right-compact">
                  <span class="expand-label">{{section.isExpanded ? 'OCULTAR' : 'EDITAR'}}</span>
                  <div class="chevron" [class.open]="section.isExpanded">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
                  </div>
                </div>
              </div>

              <div class="compact-body" *ngIf="section.isExpanded">
                <div class="compact-controls">
                   <label class="switch-premium">
                     <span>Sección visible en la web</span>
                     <input type="checkbox" [(ngModel)]="section.enabled" (change)="saveChange()">
                     <span class="slider round"></span>
                   </label>
                </div>

                <div class="field-grid">
                  <!-- Título e Imagen -->
                  <div class="form-group" *ngIf="section.content.title !== undefined">
                      <label class="premium-label">TÍTULO DE SECCIÓN</label>
                      <input type="text" [(ngModel)]="section.content.title" (change)="saveChange()" class="premium-input-compact">
                  </div>
                  <div class="form-group" *ngIf="section.content.imageUrl !== undefined">
                      <label class="premium-label">IMAGEN / BANNER (URL)</label>
                      <input type="text" [(ngModel)]="section.content.imageUrl" (change)="saveChange()" class="premium-input-compact">
                  </div>
                  <!-- Descripción -->
                  <div class="form-group full-width" *ngIf="section.content.description !== undefined">
                      <label class="premium-label">DESCRIPCIÓN / TEXTO</label>
                      <textarea [(ngModel)]="section.content.description" (change)="saveChange()" class="premium-input-compact" rows="3"></textarea>
                  </div>
                </div>

                <!-- Si tiene items genéricos (FAQ, Servicios, etc) -->
                <div class="generic-items-list" *ngIf="section.content.items">
                   <label class="premium-label mb-3">LISTA DE ELEMENTOS</label>
                   <div class="items-mini-grid">
                      <div *ngFor="let item of section.content.items; let j = index" class="mini-item-card" (click)="startItemEditing(item)">
                         <span class="mini-title">{{item.title || item.question || 'Elemento ' + (j+1)}}</span>
                         <div class="mini-actions">
                            <span class="edit-link">Editar</span>
                            <button class="delete-link" (click)="$event.stopPropagation(); removeItem(section, j)">×</button>
                         </div>
                      </div>
                      <button class="btn-add-mini" (click)="addItem(section)">+ Nuevo</button>
                   </div>
                </div>
              </div>
            </div>
          </ng-container>
        </main>
      </div>

      <!-- Panel de Edición Lateral (SLIDE-OVER PREMIUM) -->
      <div class="edit-panel-overlay" *ngIf="editingItemData()" (click)="stopEditing()">
         <div class="edit-panel-content" (click)="$event.stopPropagation()">
            <div class="panel-header">
               <div class="header-meta">
                  <span class="panel-tag">EDITOR AVANZADO</span>
                  <h2>Editar Contenido</h2>
               </div>
               <button class="close-panel-btn" (click)="stopEditing()">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
               </button>
            </div>

            <div class="panel-body" *ngIf="editingItemData() as item">
               
               <!-- Sección para Médicos -->
               <div class="editor-group" *ngIf="item.name !== undefined">
                  <div class="doctor-profile-header-admin">
                     <div class="profile-img-editor">
                        <img [src]="item.image || item.imageUrl || 'assets/images/placeholder.jpg'">
                        <div class="img-edit-overlay">
                           <input type="text" [ngModel]="item.image || item.imageUrl" 
                                  (ngModelChange)="updateItemImage($event)" (change)="saveChange()" 
                                  placeholder="URL de la foto...">
                        </div>
                     </div>
                     <div class="profile-main-fields">
                        <div class="form-group mb-3">
                           <label class="premium-label">NOMBRE DEL ESPECIALISTA</label>
                           <input type="text" [(ngModel)]="item.name" (change)="saveChange()" class="form-control premium-input">
                        </div>
                        <div class="form-group">
                           <label class="premium-label">ESPECIALIDAD</label>
                           <input type="text" [(ngModel)]="item.specialty" (change)="saveChange()" class="form-control premium-input">
                        </div>
                     </div>
                  </div>

                  <div class="editor-row mt-4">
                     <div class="form-group flex-1">
                        <label class="premium-label">DEPARTAMENTO</label>
                        <select [(ngModel)]="item.category" (change)="saveChange()" class="form-control premium-input">
                           <option value="Departamento de Cirugía">Departamento de Cirugía</option>
                           <option value="Departamento de Ginecología y Obstetricia">Departamento de Ginecología y Obstetricia</option>
                           <option value="Departamento de Otorrinolaringología">Departamento de Otorrinolaringología</option>
                           <option value="Departamento de Pediatría">Departamento de Pediatría</option>
                           <option value="Departamento Medicina Interna">Departamento Medicina Interna</option>
                        </select>
                     </div>
                     <div class="form-group flex-1">
                        <label class="premium-label">ID ÚNICO (URL)</label>
                        <input type="text" [(ngModel)]="item.id" (change)="saveChange()" class="form-control premium-input">
                     </div>
                  </div>

                  <div class="form-group mt-4">
                     <label class="premium-label">¿QUIÉN SOY? (BIOGRAFÍA)</label>
                     <textarea [(ngModel)]="item.bio" (change)="saveChange()" class="form-control premium-input" rows="8" placeholder="Escribe una breve presentación profesional..."></textarea>
                  </div>

                  <div class="editor-row mt-4">
                     <div class="form-group flex-1">
                        <label class="premium-label">SERVICIOS OFRECIDOS (POR LÍNEA)</label>
                        <textarea [ngModel]="listToString(item.services)" 
                                  (ngModelChange)="item.services = stringToList($event)" 
                                  (change)="saveChange()" 
                                  class="form-control premium-input" rows="5"></textarea>
                     </div>
                     <div class="form-group flex-1">
                        <label class="premium-label">EXPERIENCIA (POR LÍNEA)</label>
                        <textarea [ngModel]="listToString(item.experience)" 
                                  (ngModelChange)="item.experience = stringToList($event)" 
                                  (change)="saveChange()" 
                                  class="form-control premium-input" rows="5"></textarea>
                     </div>
                  </div>
               </div>

               <!-- Sección para Items Genéricos (FAQ, Blog, etc) -->
               <div class="editor-group" *ngIf="item.name === undefined">
                  <div class="form-group mb-4" *ngIf="item.title !== undefined">
                     <label class="premium-label">TÍTULO DEL ELEMENTO</label>
                     <input type="text" [(ngModel)]="item.title" (change)="saveChange()" class="form-control premium-input">
                  </div>
                  <div class="form-group mb-4" *ngIf="item.question !== undefined">
                     <label class="premium-label">PREGUNTA</label>
                     <input type="text" [(ngModel)]="item.question" (change)="saveChange()" class="form-control premium-input">
                  </div>
                  <div class="form-group mb-4" *ngIf="item.answer !== undefined || item.description !== undefined">
                     <label class="premium-label">CONTENIDO PRINCIPAL</label>
                     <textarea *ngIf="item.answer !== undefined" [(ngModel)]="item.answer" (change)="saveChange()" class="form-control premium-input" rows="6"></textarea>
                     <textarea *ngIf="item.answer === undefined && item.description !== undefined" [(ngModel)]="item.description" (change)="saveChange()" class="form-control premium-input" rows="6"></textarea>
                  </div>
               </div>
            </div>

            <div class="panel-footer">
               <button class="btn-save-panel" (click)="stopEditing()">GUARDAR Y CERRAR</button>
            </div>
         </div>
      </div>
    </div>
  `,
  styles: [`
    .editor-container { padding: 0; background: #050810; min-height: 100vh; color: #f8fafc; font-family: 'Outfit', sans-serif; }
    
    .page-header { 
       padding: 1.5rem 2rem; background: #0a0f1d; border-bottom: 1px solid rgba(255,255,255,0.05); 
       display: flex; justify-content: space-between; align-items: center; position: sticky; top: 0; z-index: 100;
    }
    .header-left { display: flex; align-items: center; gap: 1.5rem; }
    .page-header h1 { font-size: 1.4rem; margin: 0; font-weight: 800; color: #fff; }
    .page-header p { color: #64748b; margin: 2px 0 0; font-size: 0.9rem; }
    
    .btn-preview-public { 
       background: rgba(99, 102, 241, 0.1); color: #6366f1; border: 1px solid rgba(99, 102, 241, 0.2);
       padding: 0.6rem 1.2rem; border-radius: 10px; font-weight: 700; cursor: pointer; font-size: 0.8rem;
    }

    .editor-layout { display: flex; }
    
    .pages-list {
      width: 280px; background: #0a0f1d; border-right: 1px solid rgba(255,255,255,0.05); 
      height: calc(100vh - 70px); position: sticky; top: 70px;
    }
    .sidebar-scroll { height: 100%; overflow-y: auto; padding-bottom: 2rem; }
    .sidebar-section { padding: 1.5rem 1rem; }
    .sidebar-category { font-size: 0.65rem; color: #475569; letter-spacing: 2px; font-weight: 800; margin-bottom: 1.2rem; padding-left: 0.5rem; }
    .page-item {
      padding: 0.8rem 1rem; border-radius: 12px; margin-bottom: 0.4rem; cursor: pointer;
      color: #94a3b8; transition: all 0.2s; display: flex; align-items: center; gap: 12px; font-size: 0.85rem;
      border: 1px solid transparent;
    }
    .page-item:hover { background: rgba(255,255,255,0.03); color: #fff; }
    .page-item.active { 
       background: rgba(99, 102, 241, 0.1); 
       color: #818cf8; 
       border: 1px solid rgba(99, 102, 241, 0.2); 
    }
    .page-icon-box { width: 32px; height: 32px; border-radius: 8px; background: rgba(255,255,255,0.03); color: #64748b; display: flex; align-items: center; justify-content: center; }

    .sections-editor { flex: 1; padding: 3rem; max-width: 1000px; margin: 0 auto; }

    /* Estilo para Gestión de Médicos Enfocado */
    .section-container-focused { margin-bottom: 4rem; }
    .focused-header { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 2rem; }
    .focus-tag { font-size: 0.7rem; color: #6366f1; font-weight: 800; letter-spacing: 2px; }
    .focused-header h2 { font-size: 2rem; font-weight: 800; margin: 0.5rem 0; color: #fff; }
    .focused-header p { color: #64748b; margin: 0; }
    .btn-add-highlight { 
       background: #6366f1; color: #fff; border: none; padding: 1rem 1.5rem; border-radius: 15px;
       font-weight: 800; cursor: pointer; display: flex; align-items: center; gap: 10px;
       box-shadow: 0 10px 20px rgba(99, 102, 241, 0.3); transition: 0.3s;
    }
    .btn-add-highlight:hover { transform: translateY(-3px); box-shadow: 0 15px 30px rgba(99, 102, 241, 0.4); }

    .doctor-admin-card { 
       background: #0a0f1d; border-radius: 20px; border: 1px solid rgba(255,255,255,0.05);
       padding: 1.5rem; position: relative; transition: 0.3s;
    }
    .card-status-dot { position: absolute; top: 1.5rem; right: 1.5rem; width: 10px; height: 10px; border-radius: 50%; background: #334155; }
    .card-status-dot.online { background: #22c55e; box-shadow: 0 0 10px rgba(34, 197, 94, 0.4); }
    
    .doctor-card-content { display: flex; gap: 1.5rem; margin-bottom: 1.5rem; }
    .doctor-img-box { width: 80px; height: 80px; border-radius: 15px; overflow: hidden; border: 2px solid rgba(255,255,255,0.05); }
    .doctor-img-box img { width: 100%; height: 100%; object-fit: cover; }
    .doctor-spec-label { font-size: 0.65rem; color: #38bdf8; font-weight: 800; letter-spacing: 1px; }
    .doctor-text-box h4 { margin: 5px 0; font-size: 1.1rem; color: #fff; }
    .doctor-preview-bio { font-size: 0.85rem; color: #64748b; line-height: 1.5; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }

    .card-footer-actions { display: flex; gap: 10px; }
    .btn-action-edit { flex: 1; background: rgba(255,255,255,0.03); color: #fff; border: 1px solid rgba(255,255,255,0.1); padding: 0.8rem; border-radius: 12px; font-weight: 700; font-size: 0.8rem; cursor: pointer; transition: 0.2s; }
    .btn-action-edit:hover { background: #6366f1; border-color: #6366f1; }
    .btn-action-delete { width: 45px; background: rgba(239, 68, 68, 0.1); color: #ef4444; border: none; border-radius: 12px; cursor: pointer; display: flex; align-items: center; justify-content: center; }

    /* Secciones Compactas */
    .section-card-compact { background: #0a0f1d; border-radius: 20px; border: 1px solid rgba(255,255,255,0.05); margin-bottom: 1rem; overflow: hidden; }
    .compact-header { padding: 1.2rem 1.5rem; display: flex; justify-content: space-between; align-items: center; cursor: pointer; }
    .header-left-compact { display: flex; align-items: center; gap: 1rem; }
    .status-indicator { width: 8px; height: 8px; border-radius: 50%; background: #334155; }
    .status-indicator.enabled { background: #22c55e; }
    .header-left-compact h3 { margin: 0; font-size: 1rem; color: #fff; }
    .header-right-compact { display: flex; align-items: center; gap: 1rem; }
    .expand-label { font-size: 0.7rem; color: #64748b; font-weight: 700; }
    .chevron { transition: 0.3s; color: #64748b; }
    .chevron.open { transform: rotate(180deg); color: #6366f1; }
    
    .compact-body { padding: 2rem; background: rgba(255,255,255,0.01); border-top: 1px solid rgba(255,255,255,0.03); }
    .field-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; }
    .full-width { grid-column: span 2; }
    .premium-input-compact { 
       width: 100%; background: #050810; border: 1px solid rgba(255,255,255,0.05); 
       padding: 0.8rem 1rem; border-radius: 10px; color: #fff; font-size: 0.9rem;
    }
    .premium-input-compact:focus { border-color: #6366f1; outline: none; }

    .switch-premium { display: flex; align-items: center; gap: 15px; margin-bottom: 2rem; cursor: pointer; color: #94a3b8; font-size: 0.9rem; }
    .switch-premium input { display: none; }
    .slider { position: relative; width: 44px; height: 24px; background: #334155; border-radius: 24px; transition: 0.3s; }
    .slider::before { content: ''; position: absolute; width: 18px; height: 18px; left: 3px; top: 3px; background: #fff; border-radius: 50%; transition: 0.3s; }
    input:checked + .slider { background: #22c55e; }
    input:checked + .slider::before { transform: translateX(20px); }

    /* Slide-over */
    .edit-panel-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.85); backdrop-filter: blur(10px); z-index: 1000; display: flex; justify-content: flex-end; }
    .edit-panel-content { width: 600px; background: #0a0f1d; height: 100vh; border-left: 1px solid rgba(255,255,255,0.1); display: flex; flex-direction: column; box-shadow: -20px 0 50px rgba(0,0,0,0.5); }
    .panel-header { padding: 2.5rem; background: #050810; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(255,255,255,0.05); }
    .panel-tag { font-size: 0.6rem; color: #6366f1; font-weight: 800; letter-spacing: 2px; }
    .panel-header h2 { margin: 5px 0 0; font-size: 1.6rem; }
    .close-panel-btn { background: none; border: none; color: #64748b; cursor: pointer; }
    
    .panel-body { padding: 2.5rem; flex: 1; overflow-y: auto; }
    
    .doctor-profile-header-admin { display: flex; gap: 2rem; align-items: center; }
    .profile-img-editor { width: 120px; height: 120px; position: relative; border-radius: 20px; overflow: hidden; }
    .profile-img-editor img { width: 100%; height: 100%; object-fit: cover; }
    .img-edit-overlay { position: absolute; inset: 0; background: rgba(0,0,0,0.7); display: flex; align-items: center; justify-content: center; opacity: 0; transition: 0.3s; }
    .profile-img-editor:hover .img-edit-overlay { opacity: 1; }
    .img-edit-overlay input { width: 80%; font-size: 0.7rem; padding: 5px; background: #fff; border: none; border-radius: 5px; }

    .editor-row { display: flex; gap: 1.5rem; }

    /* Items Mini Grid (FAQ, etc) */
    .items-mini-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 1rem; margin-top: 1rem; }
    .mini-item-card { 
       background: rgba(255,255,255,0.02); border-radius: 12px; border: 1px solid rgba(255,255,255,0.05);
       padding: 1.2rem; cursor: pointer; transition: 0.2s; display: flex; flex-direction: column; gap: 8px;
    }
    .mini-item-card:hover { border-color: #6366f1; background: rgba(99, 102, 241, 0.05); transform: translateY(-3px); }
    .mini-title { font-size: 0.85rem; font-weight: 700; color: #fff; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .mini-actions { display: flex; justify-content: space-between; align-items: center; }
    .edit-link { font-size: 0.65rem; color: #6366f1; font-weight: 800; text-transform: uppercase; letter-spacing: 1.5px; }
    .delete-link { 
       background: rgba(239, 68, 68, 0.1); color: #ef4444; border: none; width: 26px; height: 26px; 
       border-radius: 8px; cursor: pointer; font-size: 1.1rem; display: flex; align-items: center; justify-content: center;
       transition: 0.2s;
    }
    .delete-link:hover { background: #ef4444; color: #fff; }

    .btn-add-mini { 
       background: transparent; border: 2px dashed rgba(255,255,255,0.08); border-radius: 12px;
       color: #475569; font-weight: 700; cursor: pointer; transition: 0.2s; min-height: 80px;
       display: flex; align-items: center; justify-content: center; font-size: 0.9rem;
    }
    .btn-add-mini:hover { border-color: #6366f1; color: #6366f1; background: rgba(99, 102, 241, 0.03); }

    .flex-1 { flex: 1; }
    .premium-label { font-size: 0.65rem; font-weight: 800; color: #6366f1; letter-spacing: 1.5px; margin-bottom: 8px; display: block; }
    .premium-input { background: #050810 !important; border: 1px solid rgba(255,255,255,0.1) !important; border-radius: 12px !important; color: #fff !important; padding: 1rem !important; width: 100%; }

    .panel-footer { padding: 2rem; background: #050810; border-top: 1px solid rgba(255,255,255,0.05); }
    .btn-save-panel { width: 100%; background: #6366f1; color: #fff; border: none; padding: 1.2rem; border-radius: 15px; font-weight: 800; cursor: pointer; font-size: 1rem; box-shadow: 0 10px 20px rgba(99, 102, 241, 0.2); }
  `]
})
export class PaginaEditorComponent {
  private paginaService = inject(PaginaService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  pages = this.paginaService.pages;
  mainPages = computed(() => this.pages().filter(p => !p.id.startsWith('srv_')));
  servicePages = computed(() => this.pages().filter(p => p.id.startsWith('srv_')));

  selectedPage = signal<PageConfig | null>(null);
  isSidebarVisible = signal(true);
  editingItemData = signal<any | null>(null);

  constructor() {
    this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        const page = this.pages().find(p => p.id === id);
        if (page) {
           // Inicializar propiedad isExpanded si no existe
           page.sections.forEach(s => (s as any).isExpanded = s.id === 'lista_medicos');
           this.selectedPage.set(page);
        }
      }
    });
  }

  toggleSidebar() {
    this.isSidebarVisible.update(v => !v);
  }

  selectPage(page: PageConfig) {
    this.selectedPage.set(page);
    this.router.navigate(['/admin/paginas', page.id]);
    this.editingItemData.set(null);
  }

  startItemEditing(item: any) {
    this.editingItemData.set(item);
  }

  stopEditing() {
    this.editingItemData.set(null);
  }

  updateItemImage(newVal: string) {
    const item = this.editingItemData();
    if (item) {
       if (item.image !== undefined) item.image = newVal;
       if (item.imageUrl !== undefined) item.imageUrl = newVal;
       this.saveChange();
    }
  }

  saveChange() {
    this.paginaService.savePages();
  }

  removeItem(section: SectionConfig, index: number) {
    if (confirm('¿Desea eliminar este elemento permanentemente?')) {
      section.content.items.splice(index, 1);
      this.saveChange();
    }
  }

  addItem(section: SectionConfig, type?: string) {
    if (!section.content.items) section.content.items = [];

    const newItem: any = { id: 'item-' + Date.now() };

    if (section.id === 'lista_medicos' || type === 'lista_medicos') {
      newItem.name = 'Nuevo Especialista';
      newItem.specialty = 'Especialidad Médica';
      newItem.category = 'Departamento Medicina Interna';
      newItem.bio = 'Presentación profesional aquí...';
      newItem.image = 'assets/images/placeholder.jpg';
      newItem.services = [];
      newItem.experience = [];
      newItem.education = [];
      newItem.contact = '';
      newItem.email = '';
    } else {
      newItem.title = 'Nuevo Ítem';
      newItem.description = 'Descripción del ítem...';
    }

    section.content.items.push(newItem);
    this.saveChange();
    this.startItemEditing(newItem);
  }

  listToString(list: string[] | undefined): string {
    return (list || []).join('\n');
  }

  stringToList(value: string): string[] {
    return value.split('\n').map(s => s.trim()).filter(s => s !== '');
  }
}
