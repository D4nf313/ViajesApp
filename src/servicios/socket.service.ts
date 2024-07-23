// src/app/socket.service.ts
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private socket: Socket;
  private readonly serverUrl: string = 'http://localhost:3000'; // Asegúrate de que esta URL sea correcta

  constructor() {
    this.socket = io(this.serverUrl, {
      transports: ['websocket', 'polling'], // Usa los transportes correctos
    });
  }

  sendMessage(data: any): void {
    this.socket.emit('envio data ubicacion', data);
  }

  getMessages() {
    return new Observable<string>((observer) => {
      this.socket.on('respuesta', (data: string) => {
        observer.next(data);
      });
    });
  }

  onDataReceived(): Observable<any> {
    return new Observable((observer) => {
      this.socket.on('data-received', (response: any) => {
        observer.next(response);
      });
    });
  }
}
