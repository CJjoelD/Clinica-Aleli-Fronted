import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, firstValueFrom } from 'rxjs';
import { environment } from '../../environments/environment';

export interface CMSItem {
    id?: number;
    clave: string;
    valor: string;
    tipo: string;
    imagenUrl?: string;
    lastUpdated?: Date;
}

@Injectable({
    providedIn: 'root'
})
export class CmsService {
    private apiUrl = `${environment.apiUrl}/cms`;
    private http = inject(HttpClient);
    
    cmsItems = signal<CMSItem[]>([]);

    constructor() {}

    async loadAllCMS() {
        try {
            const data = await firstValueFrom(this.http.get<CMSItem[]>(this.apiUrl));
            this.cmsItems.set(data);
        } catch (error) {
            console.error('Error al cargar CMS:', error);
        }
    }

    async getByClave(clave: string): Promise<CMSItem | null> {
        try {
            return await firstValueFrom(this.http.get<CMSItem>(`${this.apiUrl}/${clave}`));
        } catch (error) {
            return null;
        }
    }

    async updateItem(id: number, data: Partial<CMSItem>) {
        try {
            const updated = await firstValueFrom(this.http.put<CMSItem>(`${this.apiUrl}/${id}`, data));
            this.cmsItems.update(items => items.map(i => i.id === id ? updated : i));
            return true;
        } catch (error) {
            console.error('Error al actualizar item CMS:', error);
            return false;
        }
    }

    async createItem(data: CMSItem) {
        try {
            const newItem = await firstValueFrom(this.http.post<CMSItem>(this.apiUrl, data));
            this.cmsItems.update(items => [...items, newItem]);
            return true;
        } catch (error) {
            console.error('Error al crear item CMS:', error);
            return false;
        }
    }
}
