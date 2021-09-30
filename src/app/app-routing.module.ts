import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LogInComponent } from './_components/log-in/log-in.component';
import { RegisterComponent } from './_components/register/register.component';
import { DashboardComponent } from './_components/dashboard/dashboard.component';
import { AuthGuard } from './_helpers/auth.guard';
import { CustomerListComponent } from './_components/customer/customer-list/customer-list.component';
import { CustomerAddComponent } from './_components/customer/customer-add/customer-add.component';
import { ProductListComponent } from './_components/products/product-list/product-list.component';
import { ProductAddComponent } from './_components/products/product-add/product-add.component';
import { PriceListComponent } from './_components/productprice/price-list/price-list.component';
import { PriceListAddComponent } from './_components/productprice/price-list-add/price-list-add.component';
import { InvoiceListComponent } from './_components/invoice/invoice-list/invoice-list.component';
import { InvoiceAddComponent } from './_components/invoice/invoice-add/invoice-add.component';
import { ReturnInvoiceListComponent } from './_components/return-invoice/return-invoice-list/return-invoice-list.component';
import { ReturnInvoiceAddComponent } from './_components/return-invoice/return-invoice-add/return-invoice-add.component';
import { CustomerInvoicesComponent } from './_components/customer-invoices/customer-invoices.component';
import { AccountLedgerComponent } from './_components/account-ledger/account-ledger.component';
import { VendorListComponent } from './_components/vendor/vendor-list/vendor-list.component';
import { VendorLedgerComponent } from './_components/vendor-ledger/vendor-ledger.component';
import { VendorAddComponent } from './_components/vendor/vendor-add/vendor-add.component';
import { VendorLedgerAddComponent } from './_components/vendor-ledger-add/vendor-ledger-add.component';
import { ExpenseListComponent } from './_components/expense/expense-list/expense-list.component';
import { ExpenseAddComponent } from './_components/expense/expense-add/expense-add.component';
import { ExpenseInvoiceAddComponent } from './_components/expense/expense-invoice-add/expense-invoice-add.component';
import { ExpenseLedgerComponent } from './_components/expense/expense-ledger/expense-ledger.component';
import { PuchaseInvoiceListComponent } from './_components/purchase-invoice/puchase-invoice-list/puchase-invoice-list.component';
import { PuchaseInvoiceAddComponent } from './_components/purchase-invoice/puchase-invoice-add/puchase-invoice-add.component';
import { UserAddComponent } from './_components/user-management/user-add/user-add.component';
import { UserListComponent } from './_components/user-management/user-list/user-list.component';
import {VendorLedgerAddListComponent} from './_components/vendor-ledger-add-list/vendor-ledger-add-list.component'

//neww add inventory
import { GodownAddComponent } from './_components/godownsetup/godown-add/godown-add.component';
import { GodownListComponent } from './_components/godownsetup/godown-list/godown-list.component';
import { PlacementstockAddComponent } from './_components/placementstock/placementstock-add/placementstock-add.component';
import { PlacementstockListComponent } from './_components/placementstock/placementstock-list/placementstock-list.component';
import { IssuedosetupAddComponent } from './_components/dosetup/issuedosetup-add/issuedosetup-add.component';
import { IssuedosetupListComponent } from './_components/dosetup/issuedosetup-list/issuedosetup-list.component';
import { PartyAddComponent } from './_components/partysetup/party-add/party-add.component';
import { PartyListComponent } from './_components/partysetup/party-list/party-list.component';
import { AddgradeComponent } from './_components/inventory-setup/addgrade/addgrade.component';
import { AddgradeListComponent } from './_components/inventory-setup/addgrade-list/addgrade-list.component';
import {InventoryStockAddComponent } from './_components/inventory-setup/inventory-stock-add/inventory-stock-add.component';
import {InventoryStockListComponent } from './_components/inventory-setup/inventory-stock-list/inventory-stock-list.component';
import { ReleasedoAddComponent} from './_components/inventory-setup/releasedo-add/releasedo-add.component';
import{ReleasedoListComponent} from './_components/inventory-setup/releasedo-list/releasedo-list.component';
import { AgentdoreleaseAddComponent} from './_components/inventory-setup/agentdorelease-add/agentdorelease-add.component';
import {ReturndoAddComponent } from './_components/dosetup/returndo-add/returndo-add.component';
import { ReturndoListComponent} from './_components/dosetup/returndo-list/returndo-list.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LogInComponent },
  // { path: 'register', component: RegisterComponent },

  { path: 'customer-list', component: CustomerListComponent, canActivate: [AuthGuard] },
  { path: 'customer-add/Add', component: CustomerAddComponent, data: { param: 'Add' }, canActivate: [AuthGuard] },
  { path: 'customer-add/Edit', component: CustomerAddComponent, data: { param: 'Edit' }, canActivate: [AuthGuard] },
  { path: 'customer-add/Delete', component: CustomerAddComponent, data: { param: 'Delete'}, canActivate: [AuthGuard] },
  { path: 'customer-add/View', component: CustomerAddComponent, data: { param: 'View'}, canActivate: [AuthGuard] },

  { path: 'product-list', component: ProductListComponent , canActivate: [AuthGuard] },
  { path: 'product-add/Add', component: ProductAddComponent, data: { param: 'Add'}, canActivate: [AuthGuard] },
  { path: 'product-add/View', component: ProductAddComponent, data: { param: 'View'}, canActivate: [AuthGuard] },
  { path: 'product-add/Edit', component: ProductAddComponent, data: { param: 'Edit'}, canActivate: [AuthGuard] },
  { path: 'product-add/Delete', component: ProductAddComponent, data: { param: 'Delete'}, canActivate: [AuthGuard] },

  { path: 'price-list', component: PriceListComponent , canActivate: [AuthGuard] },
  { path: 'price-list-add/Add', component: PriceListAddComponent, data: { param: 'Add'}, canActivate: [AuthGuard] },
  { path: 'price-list-add/View', component: PriceListAddComponent, data: { param: 'View'}, canActivate: [AuthGuard] },
  { path: 'price-list-add/Edit', component: PriceListAddComponent, data: { param: 'Edit'}, canActivate: [AuthGuard] },
  { path: 'price-list-add/Delete', component: PriceListAddComponent, data: { param: 'Delete'}, canActivate: [AuthGuard] },

  { path: 'invoice-list', component: InvoiceListComponent , canActivate: [AuthGuard] },
  { path: 'invoice-add/Add', component: InvoiceAddComponent, data: { param: 'Add'}, canActivate: [AuthGuard] },
  { path: 'invoice-add/View', component: InvoiceAddComponent, data: { param: 'View'}, canActivate: [AuthGuard] },
  { path: 'invoice-add/Edit', component: InvoiceAddComponent, data: { param: 'Edit'}, canActivate: [AuthGuard] },
  { path: 'invoice-add/Delete', component: InvoiceAddComponent, data: { param: 'Delete'}, canActivate: [AuthGuard] },

  { path: 'return-invoice-list', component: ReturnInvoiceListComponent , canActivate: [AuthGuard] },
  { path: 'return-invoice-add/Add', component: ReturnInvoiceAddComponent, data: { param: 'Add'}, canActivate: [AuthGuard] },
  { path: 'return-invoice-add/View', component: ReturnInvoiceAddComponent, data: { param: 'View'}, canActivate: [AuthGuard] },

  { path: 'customer-invoices', component: CustomerInvoicesComponent , canActivate: [AuthGuard] },
  { path: 'account-ledger', component: AccountLedgerComponent , canActivate: [AuthGuard] },
  { path: 'vendor-ledger', component: VendorLedgerComponent , canActivate: [AuthGuard] },
  { path: 'expense-ledger', component: ExpenseLedgerComponent , canActivate: [AuthGuard] },

  { path: 'vendor-list', component: VendorListComponent , canActivate: [AuthGuard] },
  { path: 'vendor-add/Add', component: VendorAddComponent, data: { param: 'Add'}, canActivate: [AuthGuard] },
  { path: 'vendor-add/View', component: VendorAddComponent, data: { param: 'View'}, canActivate: [AuthGuard] },
  { path: 'vendor-add/Edit', component: VendorAddComponent, data: { param: 'Edit'}, canActivate: [AuthGuard] },
  { path: 'vendor-add/Delete', component: VendorAddComponent, data: { param: 'Delete' }, canActivate: [AuthGuard] },


  { path: 'vendorledger-list', component: VendorLedgerAddListComponent, canActivate: [AuthGuard] },

  { path: 'purchase-invoice-add/Add', component: VendorLedgerAddComponent, data: { param: 'Add'}, canActivate: [AuthGuard] },

  //mene add kye ha ye 3no
  { path: 'purchase-invoice-add/Edit', component: VendorLedgerAddComponent, data: { param: 'Edit'}, canActivate: [AuthGuard] },
  { path: 'purchase-invoice-add/View', component: VendorLedgerAddComponent, data: { param: 'View'}, canActivate: [AuthGuard] },
  { path: 'purchase-invoice-add/Delete', component: VendorLedgerAddComponent, data: { param: 'Delete'}, canActivate: [AuthGuard] },


  // ye me just try add ki ha



  { path: 'expense-list', component: ExpenseListComponent , canActivate: [AuthGuard] },
  { path: 'expense-add/Add', component: ExpenseAddComponent, data: { param: 'Add'}, canActivate: [AuthGuard] },
  { path: 'expense-add/View', component: ExpenseAddComponent, data: { param: 'View'}, canActivate: [AuthGuard] },
  { path: 'expense-add/Edit', component: ExpenseAddComponent, data: { param: 'Edit'}, canActivate: [AuthGuard] },
  { path: 'expense-add/Delete', component: ExpenseAddComponent, data: { param: 'Delete'}, canActivate: [AuthGuard] },

  { path: 'purchaseinvoice-list', component: PuchaseInvoiceListComponent , canActivate: [AuthGuard] },
  { path: 'purchaseinvoice-add/Add', component: PuchaseInvoiceAddComponent, data: { param: 'Add'}, canActivate: [AuthGuard] },
  { path: 'purchaseinvoice-add/View', component: PuchaseInvoiceAddComponent, data: { param: 'View'}, canActivate: [AuthGuard] },
  { path: 'purchaseinvoice-add/Edit', component: PuchaseInvoiceAddComponent, data: { param: 'Edit'}, canActivate: [AuthGuard] },
  { path: 'purchaseinvoice-add/Delete', component: PuchaseInvoiceAddComponent, data: { param: 'Delete' }, canActivate: [AuthGuard] },



  //new add yahan se


  { path: 'placemenetstock-add/Add', component: PlacementstockAddComponent, data: { param: 'Add'}, canActivate: [AuthGuard] },
  { path: 'placemenetstock-add/View', component: PlacementstockAddComponent, data: { param: 'View'}, canActivate: [AuthGuard] },
  { path: 'placemenetstock-add/Edit', component: PlacementstockAddComponent, data: { param: 'Edit'}, canActivate: [AuthGuard] },
  { path: 'placemenetstock-add/Delete', component: PlacementstockAddComponent, data: { param: 'Delete'}, canActivate: [AuthGuard] },
  { path: 'placemenetstock-list', component: PlacementstockListComponent },

  { path: 'godownsetup-add/Add', component: GodownAddComponent, data: { param: 'Add'}, canActivate: [AuthGuard] },
  { path: 'godownsetup-add/View', component: GodownAddComponent, data: { param: 'View'}, canActivate: [AuthGuard] },
  { path: 'godownsetup-add/Edit', component: GodownAddComponent, data: { param: 'Edit'}, canActivate: [AuthGuard] },
  { path: 'godownsetup-add/Delete', component: GodownAddComponent, data: { param: 'Delete'}, canActivate: [AuthGuard] },
  { path: 'godownsetup-list', component: GodownListComponent },

  { path: 'dosetup-add/Add', component: IssuedosetupAddComponent, data: { param: 'Add'}, canActivate: [AuthGuard] },
  { path: 'dosetup-add/View', component: IssuedosetupAddComponent, data: { param: 'View'}, canActivate: [AuthGuard] },
  { path: 'dosetup-add/Edit', component: IssuedosetupAddComponent, data: { param: 'Edit'}, canActivate: [AuthGuard] },
  { path: 'dosetup-add/Delete', component: IssuedosetupAddComponent, data: { param: 'Delete'}, canActivate: [AuthGuard] },
  { path: 'dosetup-list', component: IssuedosetupListComponent },

  { path: 'addgrade-add/Add', component: AddgradeComponent, data: { param: 'Add'}, canActivate: [AuthGuard] },
  { path: 'addgrade-add/View', component: AddgradeComponent, data: { param: 'View'}, canActivate: [AuthGuard] },
  { path: 'addgrade-add/Edit', component: AddgradeComponent, data: { param: 'Edit'}, canActivate: [AuthGuard] },
  { path: 'addgrade-add/Delete', component: AddgradeComponent, data: { param: 'Delete'}, canActivate: [AuthGuard] },
  { path: 'addgrade-list', component: AddgradeListComponent },

  { path: 'inventorystock-add/Add', component: InventoryStockAddComponent, data: { param: 'Add'}, canActivate: [AuthGuard] },
  { path: 'inventorystock-add/View', component: InventoryStockAddComponent, data: { param: 'View'}, canActivate: [AuthGuard] },
  { path: 'inventorystock-add/Edit', component: InventoryStockAddComponent, data: { param: 'Edit'}, canActivate: [AuthGuard] },
  { path: 'inventorystock-add/Delete', component: InventoryStockAddComponent, data: { param: 'Delete'}, canActivate: [AuthGuard] },
  { path: 'inventorystock-list', component: InventoryStockListComponent },


  // { path: 'agentdoreleasesetup-add/Add', component: AgentdoreleaseAddComponent, data: { param: 'Add'}, canActivate: [AuthGuard] },
  // { path: 'agentdoreleasesetup-add/View', component: AgentdoreleaseAddComponent, data: { param: 'View'}, canActivate: [AuthGuard] },
  // { path: 'agentdoreleasesetup-add/Edit', component: AgentdoreleaseAddComponent, data: { param: 'Edit'}, canActivate: [AuthGuard] },
  // { path: 'agentdoreleasesetup-add/Delete', component: AgentdoreleaseAddComponent, data: { param: 'Delete'}, canActivate: [AuthGuard] },
  { path: 'agentdoreleasesetup-add', component: AgentdoreleaseAddComponent},

  { path: 'release-doagent-to-customer/Add', component: ReleasedoAddComponent, data: { param: 'Add'}, canActivate: [AuthGuard] },
  { path: 'release-doagent-to-customer/View', component: ReleasedoAddComponent, data: { param: 'View'}, canActivate: [AuthGuard] },
  { path: 'release-doagent-to-customer/Edit', component: ReleasedoAddComponent, data: { param: 'Edit'}, canActivate: [AuthGuard] },
  { path: 'release-doagent-to-customer/Delete', component: ReleasedoAddComponent, data: { param: 'Delete'}, canActivate: [AuthGuard] },
  { path: 'release-doagent-to-customer', component: ReleasedoListComponent },


  { path: 'returndo-add/Add', component: ReturndoAddComponent, data: { param: 'Add'}, canActivate: [AuthGuard] },
  { path: 'returndo-add/View', component: ReturndoAddComponent, data: { param: 'View'}, canActivate: [AuthGuard] },
  { path: 'returndo-add/Edit', component: ReturndoAddComponent, data: { param: 'Edit'}, canActivate: [AuthGuard] },
  { path: 'returndo-add/Delete', component: ReturndoAddComponent, data: { param: 'Delete'}, canActivate: [AuthGuard] },
  { path: 'returndo-list', component: ReturndoListComponent},


  { path: 'party-add/Add', component: PartyAddComponent, data: { param: 'Add'}, canActivate: [AuthGuard] },
  { path: 'party-add/View', component: PartyAddComponent, data: { param: 'View'}, canActivate: [AuthGuard] },
  { path: 'party-add/Edit', component: PartyAddComponent, data: { param: 'Edit'}, canActivate: [AuthGuard] },
  { path: 'party-add/Delete', component: PartyAddComponent, data: { param: 'Delete'}, canActivate: [AuthGuard] },
  { path: 'party-list', component: PartyListComponent },

  { path: 'user-add/Add', component: UserAddComponent, data: { param: 'Add'}, canActivate: [AuthGuard] },
  { path: 'user-add/View', component: UserAddComponent, data: { param: 'View'}, canActivate: [AuthGuard] },
  { path: 'user-add/Edit', component: UserAddComponent, data: { param: 'Edit'}, canActivate: [AuthGuard] },
  { path: 'user-add/Delete', component: UserAddComponent, data: { param: 'Delete'}, canActivate: [AuthGuard] },
  { path: 'user-list', component: UserListComponent },

  { path: '**', redirectTo: 'login' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
