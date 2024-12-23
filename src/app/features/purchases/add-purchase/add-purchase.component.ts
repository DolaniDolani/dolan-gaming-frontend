import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Purchase, PurchasesService } from '../purchases.service';

@Component({
  selector: 'app-add-purchase',
  imports: [CommonModule, FormsModule],
  templateUrl: './add-purchase.component.html',
  styleUrl: './add-purchase.component.scss'
})
export class AddPurchaseComponent {
  purchase: Purchase = new Purchase();

  constructor(private purchaseService: PurchasesService) { }
  // Aggiunge un nuovo gioco utilizzando il metodo della classe Purchase
  addGame(): void {
    this.purchase.addGame();
  }

  // Rimuove un gioco dalla lista
  removeGame(index: number): void {
    this.purchase.removeGame(index);
  }

  // Salva l'acquisto
  savePurchase(): void {
    this.purchase.date = new Date(this.purchase.date).toISOString();
    this.purchaseService.addPurchase(this.purchase).subscribe(
      (data) => {
        alert('Purchase added successfully')
      
      },
      (error) => console.error('Error while adding purchase', error)
    )
    // Logica per inviare i dati al backend
  }
}