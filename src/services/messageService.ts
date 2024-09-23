// socket.service.ts
import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket: Socket;
  private clientIdSubject = new BehaviorSubject<string | undefined>(undefined);
  public clientId$ = this.clientIdSubject.asObservable();

  constructor() {
    this.socket = io('http://localhost:3000');
    this.socket.on('connect', () => {
      this.clientIdSubject.next(this.socket.id);
      console.log('Conectado al servidor de Socket.IO con ID:', this.socket.id);
    });
    this.socket.on('disconnect', () => {
      console.log('Desconectado del servidor de Socket.IO')
    });
  }

  // Método para enviar mensajes
  sendMessage(event: string, message: any) {
    this.socket.emit(event, message);
  }

  // Método para escuchar mensajes
  onMessage(event: string, callback: (data: any) => void) {
    this.socket.on(event, callback);
  }

  // Método para unirse a un grupo
  joinGroup(groupName: string) {
    this.socket.emit('joinGroup', groupName);
  }

  // Método para enviar mensajes a un grupo específico
  sendMessageToGroup(groupName: string, message: any) {
    this.socket.emit('group message', groupName, message);
  }
}
