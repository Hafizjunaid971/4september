import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from 'src/app/_services';
import { PagingService } from 'src/app/_services/paging.service';
import { ReturninviceService } from 'src/app/_services/returninvice.service';

@Component({
  selector: 'app-return-invoice-list',
  templateUrl: './return-invoice-list.component.html',
  styleUrls: ['./return-invoice-list.component.css']
})
export class ReturnInvoiceListComponent implements OnInit {

  pager: any = {};
  pagedItems: any[];
  returnInvoiceList: any = [];
  searchText = '';

  constructor(public router: Router, private returnInvoiceService: ReturninviceService,  
    private pagingService: PagingService) { }

  ngOnInit() {

    this.returnInvoiceService.getAllReturnInvoice().subscribe(
      data => {
        this.returnInvoiceList = data;
        this.setPage(1);
      },
      error => {
        console.log(error.error.message, 'Error');
      });
  }

  setPage(page: number) {
    // get pager object from service
    this.pager = this.pagingService.getPager(this.returnInvoiceList.length, page);

    // get current page of items
    this.pagedItems = this.returnInvoiceList.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }

  Add() {
    this.router.navigate(['return-invoice-add/Add']);
  }

  View(item: any) {
    this.returnInvoiceService.setData(item);
    this.router.navigate(['return-invoice-add/View']);
  }

}
