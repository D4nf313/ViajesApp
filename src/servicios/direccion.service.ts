import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DireccionService {

  private messageSource = new BehaviorSubject<string>(''); // Inicializamos con un valor vacío
  currentMessage = this.messageSource.asObservable();

  sendDireccion(dir: string) {
    this.messageSource.next(dir);
  }

constructor() { }

}
