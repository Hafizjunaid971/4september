import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from "@angular/flex-layout";
import { LogInComponent } from './_components/log-in/log-in.component';
import { RegisterComponent } from './_components/register/register.component';
import { UserService } from './_services/user.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { InterceptorService } from './_services/interceptor.service';
import { SidenavComponent } from './_components/sidenav/sidenav.component';
import { DashboardComponent } from './_components/dashboard/dashboard.component';
import { MatButtonModule, MatCheckboxModule, MatToolbarModule, MatIconModule, MatMenuModule, MatSidenavModule, MatExpansionModule, MatListModule, MatBadgeModule, MatGridListModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatRadioModule, MatDatepickerModule, MatNativeDateModule, MatChipsModule, MatTooltipModule, MatTableModule, MatPaginatorModule } from '@angular/material';
import { GoogleChartsModule } from 'angular-google-charts';
import { DpDatePickerModule } from 'ng2-date-picker';
import { NgxPrintModule } from 'ngx-print';
import { NgSelectModule } from '@ng-select/ng-select';
import { NumbersWithTwoDecimalsDirective } from './_directive/numbers-with-two-decimals.directive';
import { NumbersonlyDirective } from './_directive/numbersonly.directive';
import { ReturnInvoiceListComponent } from './_components/return-invoice/return-invoice-list/return-invoice-list.component';
import { ReturnInvoiceAddComponent } from './_components/return-invoice/return-invoice-add/return-invoice-add.component';
import { InvoiceAddComponent } from './_components/invoice/invoice-add/invoice-add.component';
import { InvoiceListComponent } from './_components/invoice/invoice-list/invoice-list.component';
import { CustomerInvoicesComponent } from './_components/customer-invoices/customer-invoices.component';
import { ModalPopupComponent } from './_components/modal-popup/modal-popup.component';
import { SearchPriceListPipe } from './_helpers/search-price-list.pipe';
import { SearchProductInventoryListPipe } from './_helpers/search-product-inventory-list.pipe';
import { SearchCustomerListPipe, SearchCustomerList2Pipe, SearchCustomerList3Pipe, SearchCustomerList4Pipe } from './_helpers/search-customer-list.pipe';
import { SearchInvoiceListPipe, SearchInvoiceList2Pipe, SearchInvoiceList3Pipe, SearchInvoiceList4Pipe } from './_helpers/search-invoice-list.pipe';
import { SearchVendorListPipe } from './_helpers/search-vendor-list.pipe';
//my addition
import { SearchPartyListPipe} from './_helpers/search-party-list.pipe';
import {SearchGodownSetupListPipe  } from './_helpers/search-godown-list.pipe';
import {SearchVendorLedgerListPipe } from './_helpers/search-vendorinvoice-list.pipe';
import {SearchAddGradeListPipe } from './_helpers/search-addgrade-list.pipe';
import {SearchAddInventoryListPipe, SearchAddInventoryList2Pipe, SearchAddInventoryList3Pipe, SearchAddInventoryList4Pipe, SearchAddInventoryList5Pipe } from './_helpers/search-inventorystock-list.pipe';
import {SearchDOSETUPListPipe, SearchDOSETUPList2Pipe, SearchDOSETUPList3Pipe, SearchDOSETUPList4Pipe,SearchDOSETUPList5Pipe } from './_helpers/search-doissue-list.pipe';
import {SearchRETURNListPipe } from './_helpers/search-returnorder-list.pipe'
import { AccountLedgerComponent } from './_components/account-ledger/account-ledger.component';
import { VendorAddComponent } from './_components/vendor/vendor-add/vendor-add.component';
import { VendorListComponent } from './_components/vendor/vendor-list/vendor-list.component';
import { VendorLedgerAddComponent } from './_components/vendor-ledger-add/vendor-ledger-add.component';
import { VendorLedgerComponent } from './_components/vendor-ledger/vendor-ledger.component';
import { ProductListComponent } from './_components/products/product-list/product-list.component';
import { ProductAddComponent } from './_components/products/product-add/product-add.component';
import { CustomerListComponent } from './_components/customer/customer-list/customer-list.component';
import { CustomerAddComponent } from './_components/customer/customer-add/customer-add.component';
import { PriceListAddComponent } from './_components/productprice/price-list-add/price-list-add.component';
import { PriceListComponent } from './_components/productprice/price-list/price-list.component';
import { DatePipe } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { ExpenseAddComponent } from './_components/expense/expense-add/expense-add.component';
import { ExpenseListComponent } from './_components/expense/expense-list/expense-list.component';
import { ExpenseInvoiceAddComponent } from './_components/expense/expense-invoice-add/expense-invoice-add.component';
import { ExpenseInvoiceListComponent } from './_components/expense/expense-invoice-list/expense-invoice-list.component';
import { SearchExpenseListPipe } from './_helpers/search-expense-list.pipe';
import { ExpenseLedgerComponent } from './_components/expense/expense-ledger/expense-ledger.component';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive';
import { ModalModule } from 'ngx-bootstrap/modal';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { LoadingBarModule } from '@ngx-loading-bar/core';
import { NgxSpinnerModule } from "ngx-spinner";
import { PuchaseInvoiceAddComponent } from './_components/purchase-invoice/puchase-invoice-add/puchase-invoice-add.component';
import { PuchaseInvoiceListComponent } from './_components/purchase-invoice/puchase-invoice-list/puchase-invoice-list.component';
import { NgxMaskModule } from 'ngx-mask';
import { UserAddComponent } from './_components/user-management/user-add/user-add.component';
import { UserListComponent } from './_components/user-management/user-list/user-list.component';
import { GodownAddComponent } from './_components/godownsetup/godown-add/godown-add.component';
import { GodownListComponent } from './_components/godownsetup/godown-list/godown-list.component';
import { VendorLedgerAddListComponent } from './_components/vendor-ledger-add-list/vendor-ledger-add-list.component';
import { PlacementstockAddComponent } from './_components/placementstock/placementstock-add/placementstock-add.component';
import { PlacementstockListComponent } from './_components/placementstock/placementstock-list/placementstock-list.component';
import { IssuedosetupAddComponent } from './_components/dosetup/issuedosetup-add/issuedosetup-add.component';
import { IssuedosetupListComponent } from './_components/dosetup/issuedosetup-list/issuedosetup-list.component';
import { PartyAddComponent } from './_components/partysetup/party-add/party-add.component';
import { PartyListComponent } from './_components/partysetup/party-list/party-list.component';
import { AddgradeComponent } from './_components/inventory-setup/addgrade/addgrade.component';
import { AddgradeListComponent } from './_components/inventory-setup/addgrade-list/addgrade-list.component';
import { InventoryStockAddComponent } from './_components/inventory-setup/inventory-stock-add/inventory-stock-add.component';
import { InventoryStockListComponent } from './_components/inventory-setup/inventory-stock-list/inventory-stock-list.component';
import { ReleasedoAddComponent } from './_components/inventory-setup/releasedo-add/releasedo-add.component';
import { ReleasedoListComponent } from './_components/inventory-setup/releasedo-list/releasedo-list.component';
import { AgentdoreleaseAddComponent } from './_components/inventory-setup/agentdorelease-add/agentdorelease-add.component';
import { DoPopupComponent } from './_components/inventory-setup/do-popup/do-popup.component';
import { ReturndoAddComponent } from './_components/dosetup/returndo-add/returndo-add.component';
import { ReturndoListComponent } from './_components/dosetup/returndo-list/returndo-list.component';
import { ModelPopupComponent } from './_components/inventory-setup/model-popup/model-popup.component';

@NgModule({
  declarations: [
    //Directives
    NumbersWithTwoDecimalsDirective,
    NumbersonlyDirective,

    //Pipes
    SearchPriceListPipe,
    SearchCustomerListPipe,
    SearchCustomerList2Pipe,
    SearchCustomerList3Pipe,
    SearchCustomerList4Pipe,
    SearchInvoiceListPipe,
    SearchInvoiceList2Pipe,
    SearchInvoiceList3Pipe,
    SearchInvoiceList4Pipe,
    SearchVendorListPipe,
    SearchPartyListPipe,
    //mene add kia
    SearchGodownSetupListPipe,
    SearchVendorLedgerListPipe,

    SearchExpenseListPipe,
    SearchProductInventoryListPipe,
    SearchAddGradeListPipe,
    SearchAddInventoryListPipe,
    SearchAddInventoryList2Pipe,
    SearchAddInventoryList3Pipe,
    SearchAddInventoryList4Pipe,
    SearchAddInventoryList5Pipe,

    SearchDOSETUPListPipe,
    SearchDOSETUPList2Pipe,
    SearchDOSETUPList3Pipe,
    SearchDOSETUPList4Pipe,
    SearchDOSETUPList5Pipe,


    SearchRETURNListPipe,

    //Components
    AppComponent,
    LogInComponent,
    RegisterComponent,
    LogInComponent,
    SidenavComponent,
    DashboardComponent,
    ProductListComponent,
    ProductAddComponent,
    CustomerListComponent,
    CustomerAddComponent,
    PriceListAddComponent,
    PriceListComponent,
    InvoiceAddComponent,
    InvoiceListComponent,
    CustomerInvoicesComponent,
    ModalPopupComponent,
    AccountLedgerComponent,
    VendorAddComponent,
    VendorListComponent,
    VendorLedgerAddComponent,
    VendorLedgerComponent,
    ReturnInvoiceAddComponent,
    ReturnInvoiceListComponent,
    ExpenseAddComponent,
    ExpenseListComponent,
    ExpenseInvoiceAddComponent,
    ExpenseInvoiceListComponent,
    ExpenseLedgerComponent,
    PuchaseInvoiceAddComponent,
    PuchaseInvoiceListComponent,
    UserAddComponent,
    UserListComponent,
    GodownAddComponent,
    GodownListComponent,
    VendorLedgerAddListComponent,
    PlacementstockAddComponent,
    PlacementstockListComponent,
    IssuedosetupAddComponent,
    IssuedosetupListComponent,
    PartyAddComponent,
    PartyListComponent,
    AddgradeComponent,
    AddgradeListComponent,
    InventoryStockAddComponent,
    InventoryStockListComponent,
    ReleasedoAddComponent,
    ReleasedoListComponent,
    AgentdoreleaseAddComponent,
    DoPopupComponent,
    ReturndoAddComponent,
    ReturndoListComponent,
    ModelPopupComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPrintModule,
    GoogleChartsModule,
    NgSelectModule,
    DpDatePickerModule,
    ToastrModule.forRoot(),
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatBadgeModule,
    MatSidenavModule,
    MatListModule,
    MatGridListModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatChipsModule,
    MatTooltipModule,
    MatTableModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatMenuModule,
    MatExpansionModule,
    NgIdleKeepaliveModule.forRoot(),
    ModalModule.forRoot(),

    // for HttpClient use:
    LoadingBarHttpClientModule,

    // for Router use:
    LoadingBarRouterModule,

    // for Core use:
    LoadingBarModule,
    NgxSpinnerModule,
    NgxMaskModule.forRoot()
  ],
  providers: [DatePipe, UserService, { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true }],
  bootstrap: [AppComponent],
  entryComponents: [
    DoPopupComponent,
  ModelPopupComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class AppModule { }
