import { Injectable } from '@angular/core';
import { Game } from '../games/games.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export class Purchase {
  id: number
  name: string
  date: string //date is a string to use ISO format
  cost: number
  notes: string
  games: Game[];

  constructor() {
    this.id = 0;
    this.name = '';
    this.date = new Date().toISOString().split('T')[0];
    this.cost = 0;
    this.notes = '';
    this.games = [];
  }

  addGame(): void {
    this.games.push(new Game());
  }

  removeGame(index: number): void {
    this.games.splice(index, 1);
  }
}
@Injectable({
  providedIn: 'root'
})
export class PurchasesService {
  private readonly baseUrl = `${environment.apiUrl}/purchases`

  constructor(private http: HttpClient) { }

  getAllPurchases(): Observable<Purchase[]> {
    return this.http.get<Purchase[]>(this.baseUrl)
  }

  addPurchase(purchase: Purchase): Observable<Purchase> {
    return this.http.post<Purchase>(`${this.baseUrl}/add`, purchase);
  }

  updatePurchase(id: number, purchase: Purchase): Observable<Purchase> {
    return this.http.put<Purchase>(`${this.baseUrl}/${id}`, purchase);
  }

  deletePurchase(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
