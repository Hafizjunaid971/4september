import { Component, OnInit } from '@angular/core';
import { InvoiceService } from 'src/app/_services/invoice.service';
import { PagingService } from 'src/app/_services/paging.service';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/_services';

@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.css']
})
export class InvoiceListComponent implements OnInit {
  pager: any = {};


  pagedItems: any[];
  invoiceList: any = [];
  searchText = '';

  constructor(public router: Router, private invoiceService: InvoiceService,
    private pagingService: PagingService) { }

  ngOnInit() {

    this.invoiceService.getAllInvoice().subscribe(
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
    this.router.navigate(['invoice-add/Add']);
  }

  View(item: any) {
    this.invoiceService.setData(item);
    this.router.navigate(['invoice-add/View']);
  }

  Edit(item: any) {
    this.invoiceService.setData(item);
    this.router.navigate(['invoice-add/Edit']);
  }

  Delete(item: any) {
    this.invoiceService.setData(item);
    this.router.navigate(['invoice-add/Delete']);
  }

}
