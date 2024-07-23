import { Component, OnInit } from '@angular/core';
import { BannerSliderComponent } from '../banner-slider/banner-slider.component';
import { MapaComponent } from '../mapa/mapa.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  imports:[BannerSliderComponent, MapaComponent ],
  standalone: true,

})
export class MainComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
