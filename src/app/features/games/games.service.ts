import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export class Game {
  id: number
  name: string
  condition: string
  console: string
  language: string
  notes?: string
  purchase_date: Date
  saleDate: Date | null
  salePrice: number | null

  constructor() {
    this.id = 0;
    this.name = '';
    this.condition = '';
    this.console = '';
    this.language = '';
    this.notes = '';
    this.purchase_date = new Date();
    this.saleDate = null;
    this.salePrice = null;
  }
}

@Injectable({
  providedIn: 'root'
})
export class GamesService {
  private readonly baseUrl = `${environment.apiUrl}/games`

  constructor(private http: HttpClient) { }

  getAllGames(): Observable<Game[]> {
    return this.http.get<Game[]>(this.baseUrl)
  }

  getGameById(id: number): Observable<Game> {
    return this.http.get<Game>(`${this.baseUrl}/${id}`);
  }

  addGame(game: Game): Observable<Game> {
    return this.http.post<Game>(`${this.baseUrl}/add`, game);
  }

  updateGame(id: number, game: Game): Observable<Game> {
    return this.http.put<Game>(`${this.baseUrl}/${id}`, game);
  }

  deleteGame(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
