// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-placementstock-list',
//   templateUrl: './placementstock-list.component.html',
//   styleUrls: ['./placementstock-list.component.css']
// })
// export class PlacementstockListComponent implements OnInit {

//   constructor() { }

//   ngOnInit() {
//   }

// }



import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VendorLedgerService } from 'src/app/_services/vendor-ledger.service';
import { PagingService } from 'src/app/_services/paging.service';
import { AuthenticationService } from 'src/app/_services';
import { ProductService } from 'src/app/_services/product.service';
import { GodownsetupService} from 'src/app/_services/godownsetup.service';

 @Component({
   selector: 'app-placementstock-list',
   templateUrl: './placementstock-list.component.html',
   styleUrls: ['./placementstock-list.component.css']
 })
 export class PlacementstockListComponent implements OnInit {

  public data: any;

  pager: any = {};
  pagedItems: any[];
    vendorList: any = [];
   productList: any = [];
   godownList: any = [];
  searchText = '';

  constructor(public router: Router, private vendorledgerService: VendorLedgerService, private productservice: ProductService,
    private pagingService: PagingService, private godownsetupservices: GodownsetupService) { }

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


    // 10th august add

    this.godownsetupservices.getAllGodown().subscribe(
      data => {
        this.godownList = data;
        this.setPage(1);
      },
      error => {
        console.log(error.error.message, 'Error')
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
