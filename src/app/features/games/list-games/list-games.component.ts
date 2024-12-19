import { Component, OnInit } from '@angular/core';
import { Game, GamesService } from '../games.service';
import { CommonModule, NgFor } from '@angular/common';

@Component({
  selector: 'app-list-games',
  templateUrl: './list-games.component.html',
  styleUrls: ['./list-games.component.scss'],
  imports: [
    CommonModule]
})
export class ListGamesComponent implements OnInit {
  games: Game[] = []

  constructor(private gameService: GamesService) { }

  ngOnInit(): void {
    this.loadGames()
  }

  loadGames() {
    this.gameService.getAllGames().subscribe(
      (data) => (this.games = data),
      (error) => console.error('Error during game fetching:', error)
    )
  }

  editGame(id: number) {
    console.log('Modifica gioco con ID:', id);
    // Implementa navigazione o modal per modificare
  }

  deleteGame(id: number) {
    if (confirm('Sei sicuro di voler eliminare questo gioco?')) {
      this.gameService.deleteGame(id).subscribe(
        () => this.loadGames(),
        (error) => console.error('Errore durante l\'eliminazione del gioco:', error)
      );
    }
  }
}
