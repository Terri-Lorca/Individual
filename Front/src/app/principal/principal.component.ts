import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { juego } from '../juego.model';
import { JuegoService } from '../juego.service';
import { juegoImg } from '../juegoImg.model';

@Component({
  selector: 'app-principal',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './principal.component.html',
  styleUrl: './principal.component.scss',
})
export class PrincipalComponent {
  juegos: juego[] = [];
  foto: string = '';

  constructor(private juegoService: JuegoService) {}

  ngOnInit(): void {
    this.juegoService.getGames().subscribe((data: juego[]) => {
      this.juegos = data;

      this.juegos.sort(
        (a, b) => parseFloat(b.dealRating) - parseFloat(a.dealRating)
      );

      this.juegos = this.juegos.filter(
        (juego) => juego.metacriticLink && juego.metacriticLink !== 'null'
      );

      this.juegos.forEach((juego) => {
        this.juegoService
          .getGameFoto(juego.metacriticLink)
          .subscribe((fotoData) => {
            if (fotoData.url !== null) {
              juego.thumb = (fotoData as juegoImg).url;
            }
          });
      });
    });
  }

  pasarJuego(juego: juego) {
    this.juegoService.setJuegoDetalle(juego);
  }

  getStoreIcon(storeID: string): string {
    return (
      'https://www.cheapshark.com' + this.juegoService.getStoreIcon(storeID)
    );
  }

  getStarColor(scoreAux: string): string {
    const score = parseFloat(scoreAux);
    if (score >= 80) {
      return 'green';
    } else if (score >= 60) {
      return 'yellow';
    } else {
      return 'red';
    }
  }

  getScoreColor(score: string): string {
    const numericScore = parseFloat(score);
    if (numericScore >= 80) {
      return 'green';
    } else if (numericScore >= 60) {
      return '#F7C947';
    } else {
      return 'red';
    }
  }
}
