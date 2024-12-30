import { Component, OnInit } from '@angular/core';
import { Purchase, PurchasesService } from '../purchases.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AddPurchaseComponent } from "../add-purchase/add-purchase.component";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-list-purchases',
  imports: [
    CommonModule,
    FormsModule,
    AddPurchaseComponent,
    RouterModule
],
  templateUrl: './list-purchases.component.html',
  styleUrl: './list-purchases.component.scss'
})
export class ListPurchasesComponent implements OnInit{
  purchases: Purchase[] = []
  revenues: number[] = []
  isRowEditableByID: { [key: number]: boolean} = {}

  constructor(
    private purchaseService: PurchasesService
  ) { }

  ngOnInit(): void {
    this.loadPurchases()
    console.log("ngOnInit")
    console.log(this.purchases)
  }

  calculateRevenue(): void {
    this.purchases.forEach((value: Purchase, index: number) => {
      this.revenues[index] = 0
      value.games.forEach( (value) => {
        if(value.sale_price != null){
          this.revenues[index] += value.sale_price
        }
      })
    })
  }

  loadPurchases() {
    this.purchaseService.getAllPurchases().subscribe(
      (data) => {
        (this.purchases = data)
        this.calculateRevenue()
      },

      (error) => console.error('Error during purchase fetching: ', error)
    )
  }

  editRow(id: number) {
    this.isRowEditableByID[id] = true
  }

  deletePurchase(id: number) {
    this.purchaseService.deletePurchase(id).subscribe(
      (data) => {
        alert('Purchase deleted succesfully');
        this.loadPurchases()
      },

      (error) => console.error('Error while deleting purchase: ', error)
    )
    
  }

  saveRow(purchase: Purchase) {
    this.purchaseService.updatePurchase(purchase).subscribe(
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
