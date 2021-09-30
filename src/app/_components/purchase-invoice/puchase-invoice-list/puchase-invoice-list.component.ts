import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PurchaseinvoiceService } from 'src/app/_services/purchaseinvoice.service';
import { PagingService } from 'src/app/_services/paging.service';
import { AuthenticationService } from 'src/app/_services';

@Component({
  selector: 'app-puchase-invoice-list',
  templateUrl: './puchase-invoice-list.component.html',
  styleUrls: ['./puchase-invoice-list.component.css']
})
export class PuchaseInvoiceListComponent implements OnInit {
  public data: any;

  pager: any = {};
  pagedItems: any[];
  invoiceList: any = [];
  searchText = '';

  constructor(public router: Router, private invoiceService: PurchaseinvoiceService,
    private pagingService: PagingService) { }

  ngOnInit() {

    this.invoiceService.getAllPurchaseInvoice().subscribe(
      data => {
        this.invoiceList = data;
        this.setPage(1);
      },
      error => {
        console.log(error.error.message, 'Error');
      });


      this.invoiceService.getAllPurchaseInvoice().subscribe(
        data => {
          this.invoiceList = data;
          this.setPage(1);
        },
        error => {
          console.log(error.error.message, 'Error');
        });
  }

  setPage(page: number) {
    // get pager object from service
    this.pager = this.pagingService.getPager(this.invoiceList.length, page);

    // get current page of items
    this.pagedItems = this.invoiceList.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }

  Add() {
    this.router.navigate(['purchaseinvoice-add/Add']);
  }

  View(item: any) {
    this.invoiceService.setData(item);
    this.router.navigate(['purchaseinvoice-add/View']);
  }

  Edit(item: any) {
    this.invoiceService.setData(item);
    this.router.navigate(['purchaseinvoice-add/Edit']);
  }

  Delete(item: any) {
    this.invoiceService.setData(item);
    this.router.navigate(['purchaseinvoice-add/Delete']);
  }

}
