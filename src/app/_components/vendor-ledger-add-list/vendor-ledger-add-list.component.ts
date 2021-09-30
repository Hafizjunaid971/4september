
// import { Component, OnInit } from '@angular/core';
// import { VendorLedgerService } from 'src/app/_services/vendor-ledger.service';
// import {PurchaseinvoiceService} from 'src/app/_services/purchaseinvoice.service'
// import { Router } from '@angular/router';
// import { PagingService } from 'src/app/_services/paging.service';
// import { AuthenticationService } from 'src/app/_services';


//  @Component({
//    selector: 'app-vendor-ledger-add-list',
//    templateUrl: './vendor-ledger-add-list.component.html',
//    styleUrls: ['./vendor-ledger-add-list.component.css']
//  })
//  export class VendorLedgerAddListComponent implements OnInit {

//   public data: any;

//    vendorledgerList: any;
//    purchaseinvoiceList: any;
//     pager: any = {};
//     pagedItems: any[];
//   searchText = '';

//   constructor(public router: Router, private vendorledgerService: VendorLedgerService, private purcgaseinvoice: PurchaseinvoiceService,
//     private pagingService: PagingService) { }

//   ngOnInit() {

//     this.vendorledgerService.getVendorFromVendorLedger().subscribe(
//       data => {
//         this.vendorledgerList = data;
//         this.setPage(1);
//       },
//       error => {
//         console.log(error.error.message, 'Error');
//       });

//         //my addition
//       this.vendorledgerService.getVendorFromVendorLedger().subscribe(
//         data => {
//           this.vendorledgerList = data;
//         },
//         error => {
//           console.log(error.error.message, 'Error Fetching invoice list List');
//         });


//       this.purcgaseinvoice.getAllPurchaseInvoice().subscribe(
//         data => {
//           this.purchaseinvoiceList = data;
//         },
//         error => {
//           console.log(error.error.message, 'Error Fetching invoice list List');
//         });
// //end
//   }

//   setPage(page: number) {
//     // get pager object from service
//     this.pager = this.pagingService.getPager(this.vendorledgerList.length, page);

//     // get current page of items
//     this.pagedItems = this.vendorledgerList.slice(this.pager.startIndex, this.pager.endIndex + 1);
//   }


//   Add() {
//     this.router.navigate(['purchase-invoice-add/Add']);
//   }

//   View(item: any) {
//     this.vendorledgerService.setData(item);
//     this.router.navigate(['purchase-invoice-add/View']);
//   }

//   Edit(item: any) {
//     this.vendorledgerService.setData(item);
//     this.router.navigate(['purchase-invoice-add/Edit']);
//   }

//   Delete(item: any) {
//     this.vendorledgerService.setData(item);
//     this.router.navigate(['purchase-invoice-add/Delete']);
//   }

// }









//
// 9th august


import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VendorLedgerService } from 'src/app/_services/vendor-ledger.service';
import { PagingService } from 'src/app/_services/paging.service';
import { AuthenticationService } from 'src/app/_services';
import { ProductService } from 'src/app/_services/product.service';
  @Component({
    selector: 'app-vendor-ledger-add-list',
    templateUrl: './vendor-ledger-add-list.component.html',
    styleUrls: ['./vendor-ledger-add-list.component.css']
  })
  export class VendorLedgerAddListComponent implements OnInit {

  public data: any;

  pager: any = {};
  pagedItems: any[];
    vendorList: any = [];
    productList: any = [];
  searchText = '';

  constructor(public router: Router, private vendorledgerService: VendorLedgerService, private productservice: ProductService,
    private pagingService: PagingService) { }

  ngOnInit() {

    this.vendorledgerService.getVendorFromVendorLedger().subscribe(
      data => {
        this.vendorList = data;
        this.setPage(1);
      },
      error => {
        console.log(error.error.message, 'Error');
      });


      this.vendorledgerService.getAllVendorLedger().subscribe(
        data => {
          this.vendorList = data;
          this.setPage(1);
        },
        error => {
          console.log(error.error.message, 'Error');
        });


    //new add 9th august
    this.productservice.getAllProduct().subscribe(
      data => {
        this.productList = data;
        this.setPage(1);
      },
      error => {
        console.log(error.error.message, 'Error');
      });



  }

  setPage(page: number) {
    // get pager object from service
    this.pager = this.pagingService.getPager(this.vendorList.length, page);

    // get current page of items
    this.pagedItems = this.vendorList.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }

  Add() {
    this.router.navigate(['purchase-invoice-add/Add']);
  }

  View(item: any) {
    this.vendorledgerService.setData(item);
    this.router.navigate(['purchase-invoice-add/View']);
  }

  Edit(item: any) {
    this.vendorledgerService.setData(item);
    this.router.navigate(['purchase-invoice-add/Edit']);
  }

  Delete(item: any) {
    this.vendorledgerService.setData(item);
    this.router.navigate(['purchase-invoice-add/Delete']);
  }

}

