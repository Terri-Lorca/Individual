import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { juego } from './juego.model';
import { juegoImg } from './juegoImg.model';

@Injectable({
  providedIn: 'root',
})
export class JuegoService {
  private apiUrl =
    'https://www.cheapshark.com/api/1.0/deals?storeID=1,7,8,11,13,25';

  private gameDetailsUrl = 'https://www.cheapshark.com/api/1.0/games';

  private storeUrl = 'https://www.cheapshark.com/api/1.0/stores';

  private apiBaseUrl = 'http://localhost:8080/api/Juegos';

  private storeIcons: { [key: string]: string } = {};

  private juegos: Observable<juego[]> | null = null; 

  private JuegoDetalle: juego | undefined;

  constructor(private http: HttpClient) {
    this.loadStoreIcons();
  }

  loadStoreIcons() {
    this.http.get<any[]>(this.storeUrl).subscribe((stores) => {
      stores.forEach((store) => {
        this.storeIcons[store.storeID] = store.images.logo;
      });
    });
  }

  getGames(): Observable<juego[]> {
    if (this.juegos == null) {
    this.juegos = this.http.get<juego[]>(this.apiUrl);
    }
    return this.juegos;
  }

  getStoreIcon(storeID: string): string {
    return (
      this.storeIcons[storeID] || 'https://example.com/default-store-logo.png'
    );
  }

  getGameDetails(gameId: string): juego | undefined {
    if (this.juegos != null) {
      this.juegos.subscribe(data => {
        return data.find(g => g.dealID === String?.toString());
      });
    }
    return undefined;
  }

  getGameFoto(gameId: string) {
    const parts = gameId.split('/');
    const url = `http://localhost:8080/api/Juegos/${parts[parts.length - 2]}`;
    return this.http.get<juegoImg>(url);
  }

  setJuegoDetalle(juego: juego) {
    this.JuegoDetalle = juego;
  }

  getJuegoDetalle(): juego | undefined {
    return this.JuegoDetalle;
  }

  getGamesWithNullUrl(): Observable<juegoImg[]> {
    return this.http.get<juegoImg[]>(`${this.apiBaseUrl}/ToDo`);
  }

  updateGameUrl(juego: juegoImg): Observable<juegoImg> {
    return this.http.put<juegoImg>(`${this.apiBaseUrl}/actualizarImagen`, juego);
  }

}
