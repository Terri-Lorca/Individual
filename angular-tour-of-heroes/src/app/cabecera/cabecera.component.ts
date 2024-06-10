import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { juego } from '../juego.model';

@Component({
  selector: 'app-cabecera',
  standalone: true,
  imports: [ CommonModule, RouterLink],
  templateUrl: './cabecera.component.html',
  styleUrl: './cabecera.component.scss'
})
export class CabeceraComponent {

}
