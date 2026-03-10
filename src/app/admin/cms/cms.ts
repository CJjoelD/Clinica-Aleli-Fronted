import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CmsService, CMSItem } from '../../services/cms.service';

@Component({
  selector: 'app-admin-cms',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="cms-container">
      <header class="page-header">
        <div class="header-content">
          <h1>Gestión de Contenido (CMS)</h1>
          <p>Edita los textos, servicios y especialidades que aparecen en la página principal.</p>
        </div>
        <div class="category-filter">
          <button (click)="filter('servicio')" [class.active]="currentCategory === 'servicio'">Servicios</button>
          <button (click)="filter('especialidad')" [class.active]="currentCategory === 'especialidad'">Especialidades</button>
          <button (click)="filter('general')" [class.active]="currentCategory === 'general'">General</button>
        </div>
      </header>

      <div class="cms-grid">
        <div class="content-card" *ngFor="let item of filteredItems()">
          <div class="card-image" *ngIf="item.imagenUrl">
            <img [src]="item.imagenUrl" alt="Imagen del contenido">
            <div class="edit-overlay" (click)="editItem(item)">
              <span>Cambiar Imagen</span>
            </div>
          </div>
          
          <div class="card-details">
            <div class="badge">{{ item.tipo }}</div>
            <h3>{{ item.clave }}</h3>
            <p class="preview-text">{{ item.valor }}</p>
            <button class="btn-edit" (click)="editItem(item)">Editar Contenido</button>
          </div>
        </div>
      </div>

      <!-- Modal de Edición -->
      <div class="modal-overlay" *ngIf="showModal()">
        <div class="modal-content">
          <div class="modal-header">
            <h2>Editar Contenido: {{ selectedItem()?.clave }}</h2>
            <button class="close-btn" (click)="closeModal()">×</button>
          </div>
          
          <form class="modal-body" (submit)="saveChanges()">
            <div class="form-group">
              <label>Texto del Contenido (Valor)</label>
              <textarea [(ngModel)]="editValue" name="valor" rows="4" class="form-control" placeholder="Escribe el texto aquí..."></textarea>
            </div>
            
            <div class="form-group">
              <label>URL de Imagen (Opcional)</label>
              <input type="text" [(ngModel)]="editImage" name="imagenUrl" class="form-control" placeholder="https://ejemplo.com/foto.jpg">
            </div>

            <div class="modal-footer">
              <button type="button" class="btn-cancel" (click)="closeModal()">Cancelar</button>
              <button type="submit" class="btn-save">Guardar Cambios</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .cms-container { padding: 1.5rem; }
    .page-header { background: white; padding: 2rem; border-radius: 25px; margin-bottom: 2rem; box-shadow: 0 5px 20px rgba(0,0,0,0.03); display: flex; justify-content: space-between; align-items: center; }
    .page-header h1 { margin: 0; color: #1e293b; font-size: 1.8rem; font-weight: 800; }
    .page-header p { margin: 5px 0 0; color: #64748b; }
    
    .category-filter { display: flex; gap: 0.5rem; background: #f1f5f9; padding: 5px; border-radius: 12px; }
    .category-filter button { padding: 8px 20px; border: none; background: transparent; color: #64748b; font-weight: 700; border-radius: 8px; cursor: pointer; transition: all 0.3s; }
    .category-filter button.active { background: #6a1b9a; color: white; box-shadow: 0 4px 10px rgba(106, 27, 154, 0.2); }

    .cms-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 1.5rem; }
    .content-card { background: white; border-radius: 20px; overflow: hidden; border: 1px solid #f1f5f9; transition: transform 0.3s; box-shadow: 0 4px 10px rgba(0,0,0,0.02); }
    .content-card:hover { transform: translateY(-5px); box-shadow: 0 15px 30px rgba(0,0,0,0.05); }

    .card-image { position: relative; height: 160px; }
    .card-image img { width: 100%; height: 100%; object-fit: cover; }
    
    .edit-overlay { position: absolute; inset: 0; background: rgba(0,0,0,0.4); display: flex; align-items: center; justify-content: center; opacity: 0; transition: opacity 0.3s; color: white; cursor: pointer; }
    .card-image:hover .edit-overlay { opacity: 1; }

    .card-details { padding: 1.5rem; }
    .badge { display: inline-block; padding: 4px 10px; border-radius: 20px; background: #f5edfa; color: #6a1b9a; font-size: 0.7rem; font-weight: 800; text-transform: uppercase; margin-bottom: 0.8rem; }
    .card-details h3 { margin: 0 0 0.8rem; font-size: 1.1rem; color: #1e293b; }
    .preview-text { font-size: 0.9rem; color: #64748b; margin-bottom: 1.5rem; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }

    .btn-edit { width: 100%; background: #f1f5f9; border: 1px solid #e2e8f0; padding: 10px; border-radius: 10px; color: #475569; font-weight: 700; cursor: pointer; transition: all 0.2s; }
    .btn-edit:hover { background: #6a1b9a; color: white; border-color: #6a1b9a; }

    /* Modal */
    .modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.4); backdrop-filter: blur(4px); display: flex; align-items: center; justify-content: center; z-index: 1000; }
    .modal-content { background: white; width: 90%; max-width: 600px; padding: 2.5rem; border-radius: 25px; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.25); }
    .modal-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; }
    .close-btn { background: none; border: none; font-size: 1.5rem; cursor: pointer; color: #94a3b8; }

    .form-group { margin-bottom: 1.5rem; }
    .form-group label { display: block; margin-bottom: 0.5rem; color: #475569; font-weight: 700; }
    .form-control { width: 100%; padding: 1rem; border-radius: 12px; border: 1px solid #e2e8f0; font-family: inherit; font-size: 1rem; box-sizing: border-box; }
    
    .modal-footer { margin-top: 2rem; display: flex; justify-content: flex-end; gap: 1rem; }
    .btn-cancel { background: #f1f5f9; color: #475569; border: none; padding: 12px 25px; border-radius: 12px; font-weight: 700; cursor: pointer; }
    .btn-save { background: #6a1b9a; color: white; border: none; padding: 12px 25px; border-radius: 12px; font-weight: 700; cursor: pointer; box-shadow: 0 4px 10px rgba(106, 27, 154, 0.2); }
  `]
})
export class CmsContentComponent implements OnInit {
  private cmsService = inject(CmsService);

  cmsItems = this.cmsService.cmsItems;
  currentCategory = 'servicio';

  showModal = signal(false);
  selectedItem = signal<CMSItem | null>(null);
  
  editValue = '';
  editImage = '';

  filteredItems = computed(() => {
    return this.cmsItems().filter(i => i.tipo?.toLowerCase() === this.currentCategory.toLowerCase());
  });

  async ngOnInit() {
    await this.cmsService.loadAllCMS();
  }

  filter(cat: string) {
    this.currentCategory = cat;
  }

  editItem(item: CMSItem) {
    this.selectedItem.set(item);
    this.editValue = item.valor;
    this.editImage = item.imagenUrl || '';
    this.showModal.set(true);
  }

  closeModal() {
    this.showModal.set(false);
    this.selectedItem.set(null);
  }

  async saveChanges() {
    const item = this.selectedItem();
    if (item && item.id) {
       await this.cmsService.updateItem(item.id, {
         valor: this.editValue,
         imagenUrl: this.editImage
       });
       this.closeModal();
    }
  }
}
