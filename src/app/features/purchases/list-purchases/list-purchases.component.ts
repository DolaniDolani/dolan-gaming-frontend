import { Component, OnInit } from '@angular/core';
import { Purchase, PurchasesService } from '../purchases.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-list-purchases',
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './list-purchases.component.html',
  styleUrl: './list-purchases.component.scss'
})
export class ListPurchasesComponent implements OnInit{
  purchases: Purchase[] = []
  isRowEditableByID: { [key: number]: boolean} = {}

  constructor(
    private purchaseService: PurchasesService
  ) { }

  ngOnInit(): void {
    this.loadPurchases()
    console.log("ngOnInit")
    console.log( this.purchases)
  }

  printa(): void {
    console.log( this.purchases)
    this.purchases.forEach((purchase) => {
      if (purchase.date) {
        // Trasforma la data ISO in yyyy-MM-dd per il datepicker
        purchase.date = new Date(purchase.date).toISOString().split('T')[0];
      }
    });
    
  }

  loadPurchases() {
    this.purchaseService.getAllPurchases().subscribe(
      (data) => (this.purchases = data),

      (error) => console.error('Error during purchase fetching: ', error)
    )
  }

  editRow(id: number) {
    this.isRowEditableByID[id] = true
  }

  deletePurchase(id: number) {
    this.purchaseService.deletePurchase(id).subscribe(
      (data) => alert('Purchase deleted succesfully'),

      (error) => console.error('Error while deleting purchase: ', error)
    )
  }

  saveRow(purchase: Purchase) {
    this.purchaseService.updatePurchase(purchase.id, purchase).subscribe(
      (data) => alert('Purchase updated successfully'),
      (error) => console.error('Error while updating purchase')
    )
    this.isRowEditableByID[purchase.id] = false
  }

  cancelEdit(id: number) {
    this.isRowEditableByID[id] = false
  }

  formatDate(event: Event): string {
    const input = event.target as HTMLInputElement;
    if (input && input.value) {
      // Crea una stringa ISO a partire dal valore del datepicker
      return new Date(input.value).toISOString();
    }
    return '';
  } 

}
