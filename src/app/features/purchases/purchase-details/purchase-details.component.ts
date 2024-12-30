import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Purchase, PurchasesService } from '../purchases.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Game } from '../../games/games.service';


@Component({
  selector: 'app-purchase-details',
  standalone: true,
  templateUrl: './purchase-details.component.html',
  styleUrls: ['./purchase-details.component.scss'],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class PurchaseDetailsComponent implements OnInit {
  purchase: Purchase = new Purchase(); 
  isLoading = true;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private purchasesService: PurchasesService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadPurchaseDetails(parseInt(id, 10));
    } else {
      this.error = 'ID non valido';
      this.isLoading = false;
    }
  }

  convertDateToInputFormat(date: Date | string | null): string | null {
    if (!date) return null;
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  updateDate(event: Event, game: any, field: string): void {
    const input = event.target as HTMLInputElement;
    const value = input?.value;
  
    if (field === 'purchase_date') {
      game.purchase_date = value ? new Date(value) : null;
    } else if (field === 'sale_date') {
      game.sale_date = value ? new Date(value) : null;
    }
  }
  
  

  private loadPurchaseDetails(id: number): void {
    this.purchasesService.getPurchaseById(id).subscribe({
      next: (purchase) => {
        this.purchase = purchase;
        this.isLoading = false;
        console.log(this.purchase)
      },
      error: (err) => {
        this.error = 'Errore durante il caricamento dei dettagli.';
        this.isLoading = false;
      },
    });
  }

  saveChanges(): void {
    if (this.purchase) {
      this.purchase.games.forEach((game) => {
        game.purchase_date = new Date(game.purchase_date);
        if (game.sale_date) {
          game.sale_date = new Date(game.sale_date);
        }
      });
  
      this.purchasesService.updatePurchase(this.purchase).subscribe({
        next: () => alert('Acquisto aggiornato con successo!'),
        error: (err) => console.error('Errore durante il salvataggio:', err),
      });
    }
  }
  

  addGame(): void {
    if (this.purchase) {
      const newGame = new Game();
      this.purchase.games.push(newGame);
    }
  }
  

  removeGame(index: number): void {
    this.purchase?.removeGame(index);
  }
}
