import { Component, Input, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { DireccionService } from '../../servicios/direccion.service';
@Component({
  selector: 'app-mapa',
  standalone: true,
  imports: [],
  templateUrl: './mapa.component.html',
  styleUrl: './mapa.component.scss',
})
export class MapaComponent implements OnInit {
  private map!: L.Map;
  private geocoder: any;
  ngAfterViewInit(): void {
    this.initMap();
  }

  ngOnChanges() {}
  constructor(public direccionService: DireccionService) {}
  ngOnInit(): void {
    this.direccionService.currentMessage.subscribe((dir: string) => {
      console.log(dir);
      this.geocodeAddress(dir);
    });
  }

  private initMap(): void {
    this.map = L.map('map').setView([14.094167, -87.206667], 15);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.map);
  }

  private geocodeAddress(address: string): void {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        if (data && data.length > 0) {
          const result = data[0];
          const lat = parseFloat(result.lat);
          const lon = parseFloat(result.lon);

          // Crear un marcador en el resultado
          L.marker([lat, lon]).addTo(this.map)
            .bindPopup(result.display_name)
            .openPopup();

          // Centrar el mapa en el marcador
          this.map.setView([lat, lon], 15);
        } else {
          console.error('No se encontraron resultados para la dirección dada.');
        }
      })
      .catch(error => {
        console.error('Error al geocodificar la dirección:', error);
      });
  }


}
