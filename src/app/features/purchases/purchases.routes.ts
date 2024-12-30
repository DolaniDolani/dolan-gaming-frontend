import { Routes } from "@angular/router";
import { ListPurchasesComponent } from "./list-purchases/list-purchases.component";
import { PurchaseDetailsComponent } from "./purchase-details/purchase-details.component";

export const routes: Routes = [
    { path: '', component: ListPurchasesComponent},
    { path: ':id', component: PurchaseDetailsComponent}
]