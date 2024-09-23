import { CommonModule } from '@angular/common';
import { Component} from '@angular/core';
import { RouterOutlet,provideRouter } from '@angular/router';
import { SocketService } from '../services/messageService';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    FormsModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  messages: string[] = [];
  groupname: string | null = null;
  inputMessage: string = '';
  clientId: string | undefined;

  constructor(
    private socketService: SocketService,
    private route:ActivatedRoute
  ) {}

  ngOnInit() {
    // Escuchar cambios en los parámetros de la ruta
    this.route.paramMap.subscribe(params => {
      console.log('Parámetros de la ruta:', params);
      const groupParam = params.get('group');
      alert(groupParam);
      if (groupParam) {
        this.groupname = groupParam;
      } else {
        this.groupname = 'default2';
      }
      this.socketService.joinGroup(this.groupname);
    });

    this.socketService.clientId$.subscribe((clientId) => {
      this.clientId = clientId;

    });

    // Escuchar mensajes del servidor
    this.socketService.onMessage('message', (data) => {
      console.log('Mensaje recibido:', data);
      this.messages.push(data);
    });
  }

  sendMessage() {

    if (this.groupname) {
      this.socketService.sendMessageToGroup(this.groupname, this.inputMessage+' '+this.clientId);
    } else {
      console.error('Group name is null');
    }
  }
}
