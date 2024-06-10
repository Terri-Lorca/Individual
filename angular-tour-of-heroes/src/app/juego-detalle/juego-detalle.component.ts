import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { juego } from '../juego.model';
import { JuegoService } from '../juego.service';

@Component({
  selector: 'app-juego-detalle',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './juego-detalle.component.html',
  styleUrl: './juego-detalle.component.scss',
})
export class JuegoDetalleComponent {
  gameId: number | undefined;
  game: juego | undefined;
  purchaseUrl: string | undefined;

  constructor(
    private route: ActivatedRoute,
    private juegoService: JuegoService
  ) {}

  ngOnInit(): void {
    this.game = this.juegoService.getJuegoDetalle();
  }

  openMetacritic(): void {
    if (this.game && this.game.metacriticLink) {
      window.open('https://www.metacritic.com' + this.game.metacriticLink, '_blank');
    }
  }

  openPurchase(): void {
    switch (this.game?.storeID) {
      case "1":
        this.purchaseUrl = `https://store.steampowered.com`;
        break;
      case "7":
        this.purchaseUrl = `https://www.gog.com`;
        break;
      case "8":
        this.purchaseUrl = `https://www.ea.com`;
        break;
      case "11":
        this.purchaseUrl = `https://www.humblebundle.com`;
        break;
      case "13":
        this.purchaseUrl = `https://www.ubisoft.com/`;
        break;
      case "25":
        this.purchaseUrl = `https://www.epicgames.com`;
        break;
      default:
        this.purchaseUrl = '';
        break;
    }
  
    window.open(this.purchaseUrl, '_blank');
  }
}
