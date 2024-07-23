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
  slides = [
    { img: '../assets/istockphoto-1026871784-1024x1024.jpg', title: 'Slide 1' },
    { img: '../assets/istockphoto-1474914272-1024x1024.jpg', title: 'Slide 2' },
    { img: '../assets/sea-2564601_960_720.jpg', title: 'Slide 3' },
  ];

  constructor(public dialog: MatDialog, public direccionService: DireccionService) {}

  abrirModal() {
    const dialogRef = this.dialog.open(ModalDirComponent, {
      width: '500px',
    });
    dialogRef.afterClosed().subscribe((direccion) => {
      this.direccionService.sendDireccion(direccion);
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
