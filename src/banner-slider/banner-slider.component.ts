import { Component } from '@angular/core';
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
export class BannerSliderComponent {
  currentSlide = 0;
  slides:any = [
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
    { img: '../assets/sea-2564601_960_720.jpg', 
      title: 'Destino 3', 
      id: 3 },
  ];

  constructor(
    public dialog: MatDialog,
    public direccionService: DireccionService
  ) {}

  abrirModal(id:number) {
    console.log(id)
    const dialogRef = this.dialog.open(ModalDirComponent, {
      width: '500px',
    });
    dialogRef.afterClosed().subscribe((direccion) => {
    const registroDir ={
      dir: direccion,
      id:id
    }
    console.log(registroDir)
      this.direccionService.sendDireccion(registroDir);
    });
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.slides.length;
  }

  prevSlide() {
    this.currentSlide =
      (this.currentSlide - 1 + this.slides.length) % this.slides.length;
  }
}
