import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { ModalDirComponent } from '../add-direccion/modal-add-dir.component';
import { DireccionService } from '../servicios/direccion.service';

@Component({
  selector: 'app-banner-slider',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './banner-slider.component.html',
  styleUrls: ['./banner-slider.component.scss'],
})
export class BannerSliderComponent implements OnInit {
  currentSlide = 0;
  slides: any = [
    {
      img: '../assets/istockphoto-1026871784-1024x1024.jpg',
      title: 'Destino 1',
      id: 1,
    },
    {
      img: '../assets/istockphoto-1474914272-1024x1024.jpg',
      title: 'Destino 2',
      id: 2,
    },
    { img: '../assets/sea-2564601_960_720.jpg', title: 'Destino 3', id: 3 },
  ];
  ubicacion: any;
  constructor(
    public dialog: MatDialog,
    public direccionService: DireccionService
  ) {}
  ngOnInit(): void {
    /*     this.direccionService.obtenerUbicaciones().subscribe((ubicaciones) => {
      this.ubicaciones = ubicaciones;
      console.log(this.ubicaciones)
    }); */
  }

  abrirModal(id: number) {
    console.log(id);
    const dialogRef = this.dialog.open(ModalDirComponent, {
      width: '500px',
    });
    dialogRef.afterClosed().subscribe((direccion) => {
      const registroDir = {
        dir: direccion,
        id: id,
      };
      console.log(registroDir);
      this.direccionService.sendDireccion(registroDir);
    });
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.slides.length;
    const id = this.currentSlide + 1;
    this.direccionService.obtenerUbicacionPorId(id).subscribe((ubi) => {
      if (ubi) {
        this.ubicacion = ubi;
      } else {
        this.ubicacion = undefined;
      }
    });
  }

  prevSlide() {
    this.currentSlide =
      (this.currentSlide - 1 + this.slides.length) % this.slides.length;
    const id = this.currentSlide + 1;
    this.direccionService.obtenerUbicacionPorId(id).subscribe((ubi) => {
      console.log(ubi);
      if (ubi) {
        this.ubicacion = ubi;
      } else {
        this.ubicacion = undefined;
      }
    });
  }
}
