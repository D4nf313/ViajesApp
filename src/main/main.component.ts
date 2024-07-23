import { Component, OnInit } from '@angular/core';
import { BannerSliderComponent } from '../banner-slider/banner-slider.component';
import { MapaComponent } from '../mapa/mapa.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DireccionService } from '../servicios/direccion.service';
import { SocketService } from '../servicios/socket.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { SnackbarExitoComponent } from '../snackbar/snackbar-exito/snackbar-exito.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  imports: [
    BannerSliderComponent,
    MapaComponent,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
  ],
  standalone: true,
})
export class MainComponent implements OnInit {
  confirmationMessage: any;
  constructor(
    public direccionService: DireccionService,
    private socketService: SocketService,
    private snackbar: MatSnackBar,

  ) {}

  ngOnInit() {
    this.socketService.getMessages().subscribe((message) => {
      console.log('Mensaje del servidor:', message);
    });

    this.socketService.sendMessage('Hola desde el cliente');
  }

  planearViaje() {
    this.direccionService.obtenerUbicaciones().subscribe((data) => {
      console.log(data);
      if (data.length > 0) {
        this.socketService.sendMessage(data);
        // Suscríbete a onDataReceived después de enviar el mensaje
        this.socketService.onDataReceived().subscribe((response: any) => {
          this.confirmationMessage = response.message;
          console.log('Mensaje de confirmación recibido:', response.message);
          if( response.message){
            this.mostrarMensajeExito();
          }
        });
      }
    });
  }

  mostrarMensajeExito() {
    this.snackbar.openFromComponent(SnackbarExitoComponent, {
      duration: 5000,
      horizontalPosition: "center", // Posición horizontal del mensaje ('start', 'center', 'end', 'left' o 'right')
      verticalPosition: "bottom", // Posición vertical del mensaje ('top' o 'bottom')
      panelClass: "snackbar-exito",
      data: [
        "Se ha agregado con exito los lugares que quiere viajar, pronto nos contactaremos con usted con toda la informacion",
      ],
    });
  }

}
