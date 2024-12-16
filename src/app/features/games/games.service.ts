import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

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
  constructor() { }

}
