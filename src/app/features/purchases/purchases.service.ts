import { Injectable } from '@angular/core';
import { Game } from '../games/games.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface Purchase {
  id: number
  name: string
  date: Date
  cost: number
  notes: string
  games: Game[]
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

  addPurchase(id: number, purchase: Purchase): Observable<Purchase> {
    return this.http.post<Purchase>(`${this.baseUrl}/${id}`, purchase);
  }

  updatePurchase(id: number, purchase: Purchase): Observable<Purchase> {
    return this.http.put<Purchase>(`${this.baseUrl}/${id}`, purchase);
  }

  deletePurchase(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
