import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InvoiceService } from 'src/app/_services/invoice.service';
import { PagingService } from 'src/app/_services/paging.service';
import { MatDialog } from '@angular/material';
import { ModalPopupComponent } from '../modal-popup/modal-popup.component';
import { AuthenticationService } from 'src/app/_services';

@Component({
  selector: 'app-customer-invoices',
  templateUrl: './customer-invoices.component.html',
  styleUrls: ['./customer-invoices.component.css']
})
export class CustomerInvoicesComponent implements OnInit {

  pager: any = {};
  pagedItems: any[];
  invoiceList: any = [];
  searchText = '';
  searchText2 = '';
  searchText3 = '';
  searchText4 = '';

  constructor(private dialog: MatDialog, public router: Router, private invoiceService: InvoiceService,
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

  View(item: any) {

    this.dialog.open(ModalPopupComponent, {
      data: {
        info: item
      }
    });
  }

}
