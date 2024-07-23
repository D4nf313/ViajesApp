import { Component, Input, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { DireccionService } from '../servicios/direccion.service';

@Component({
  selector: 'app-mapa',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, MatListModule],
  templateUrl: './mapa.component.html',
  styleUrl: './mapa.component.scss',
})
export class MapaComponent implements OnInit {
  private map!: L.Map;
  ubicacion: any;
  ubicaciones: any[] = [];

  ngAfterViewInit(): void {
    this.initMap();
  }

  constructor(public direccionService: DireccionService) {}
  ngOnInit(): void {
    this.direccionService.currentMessage.subscribe((ubi: any) => {
      if (ubi) {
        this.geocodeAddress(ubi);
      }
    });
    this.direccionService.obtenerUbicaciones().subscribe((ubicaciones) => {
      this.ubicaciones = ubicaciones;
    });
  }

  private initMap(): void {
    this.map = L.map('map').setView([4.711, -74.0721], 12);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.map);
  }

  private geocodeAddress(ubicacion: any): void {
    const address = ubicacion.dir;
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
      address
    )}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (data && data.length > 0) {
          const result = data[0];
          const lat = parseFloat(result.lat);
          const lon = parseFloat(result.lon);

          // Crear un marcador en el resultado
          L.marker([lat, lon])
            .addTo(this.map)
            .bindPopup(result.display_name)
            .openPopup();

          // Centrar el mapa en el marcador
          this.map.setView([lat, lon], 15);
          this.ubicacion = {
            id: ubicacion.id,
            lat: lat,
            lon: lon,
            dir: result.display_name,
          };
        } else {
          console.error('No se encontraron resultados para la dirección dada.');
        }
      })
      .catch((error) => {
        console.error('Error al geocodificar la dirección:', error);
      });
  }

  centrarMapa(ubicacion: any) {
    this.geocodeAddress(ubicacion);
  }

  guardar() {
    console.log(this.ubicacion.id);
    if (this.ubicacion.id) {
      this.direccionService.agregarUbicacion(this.ubicacion).subscribe(
        (ubicacionGuardada) => {
          console.log('Ubicación guardada:', ubicacionGuardada);
        },
        (error) => {
          console.error('Error al guardar la ubicación:', error);
        }
      );
    }
  }
}
