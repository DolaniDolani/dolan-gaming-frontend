import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface Game {
  id: number
  name: string
  condition: string
  console: string
  language: string
  notes?: string
  purchaseDate: Date
  purchasePrice: number
  saleDate: Date
  salePrice: number
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
