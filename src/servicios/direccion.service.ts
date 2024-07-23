import { Injectable } from '@angular/core';
import { BehaviorSubject, delay, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DireccionService {
  private ubicaciones: any[] = [];
  private messageSource = new BehaviorSubject<string>(''); // Inicializamos con un valor vacío
  private ubicacionesSubject: BehaviorSubject<any[]> = new BehaviorSubject<
    any[]
  >(this.ubicaciones);

  currentMessage = this.messageSource.asObservable();

  sendDireccion(dir: any) {
    this.messageSource.next(dir);
  }

  agregarUbicacion(nuevaUbicacion: any): Observable<any[]> {
    const index = this.ubicaciones.findIndex(
      (ubicacion) => ubicacion.id === nuevaUbicacion.id
    );
    if (index !== -1) {
      // Si la ubicación ya existe, actualizarla
      this.ubicaciones[index] = nuevaUbicacion;
    } else {
      // Si la ubicación no existe, agregarla
      this.ubicaciones.push(nuevaUbicacion);
    }
    this.ubicacionesSubject.next(this.ubicaciones); // Emitir el nuevo estado de ubicaciones
    return this.ubicacionesSubject.asObservable();
  }

  // Método para obtener todas las ubicaciones
  obtenerUbicaciones(): Observable<any[]> {
    return of(this.ubicaciones).pipe(delay(1000)); // Simula un retraso de 1 segundo
  }

  constructor() {}
}
