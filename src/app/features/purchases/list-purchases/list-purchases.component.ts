import { Component, OnInit } from '@angular/core';
import { Purchase, PurchasesService } from '../purchases.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list-purchases',
  imports: [
    CommonModule
  ],
  templateUrl: './list-purchases.component.html',
  styleUrl: './list-purchases.component.scss'
})
export class ListPurchasesComponent implements OnInit{
  purchases: Purchase[] = []

  constructor(
    private purchaseService: PurchasesService
  ) { }

  ngOnInit(): void {
    this.loadPurchases()
    console.log("ngOnInit")
    console.log( this.purchases)
  }

  loadPurchases() {
    this.purchaseService.getAllPurchases().subscribe(
      (data) => (this.purchases = data),

      (error) => console.error('Error during purchase fetching: ', error)
    )
  }
}
