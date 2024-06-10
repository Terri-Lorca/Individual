import { Component, OnInit } from '@angular/core';
import { JuegoService } from '../juego.service';
import { juegoImg } from '../juegoImg.model';
import { FormsModule } from '@angular/forms';
import { NgIf, NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports: [FormsModule, NgIf, NgFor, RouterLink],
  templateUrl: './admin-panel.component.html',
  styleUrl: './admin-panel.component.scss',
})
export class AdminPanelComponent implements OnInit {
  juegos: juegoImg[] = [];
  isLoggedIn: boolean = false;
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(
    private juegoService: JuegoService,
  ) {}

  ngOnInit(): void {
    this.loadGames();
  }

  loadGames() {
    this.juegoService.getGamesWithNullUrl().subscribe((data: juegoImg[]) => {
      this.juegos = data.map(game => ({ ...game, newUrl: '' }));
    });
  }

  updateGameUrl(game: juegoImg) {
    game.url = game.newUrl;
    this.juegoService.updateGameUrl(game).subscribe(() => {
      this.loadGames();
    });
  }

  login() {
    if (this.username === 'admin' && this.password === 'admin') {
      this.isLoggedIn = true;
      this.errorMessage = '';
    } else {
      this.errorMessage = 'Usuario o contraseña incorrectos';
    }
  }
}
