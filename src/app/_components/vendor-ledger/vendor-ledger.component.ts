import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { VendorLedgerService } from 'src/app/_services/vendor-ledger.service';
import {PurchaseinvoiceService} from 'src/app/_services/purchaseinvoice.service'
import { DatePipe } from '@angular/common';
import swal from 'sweetalert';
import { PagingService } from 'src/app/_services/paging.service';
import * as XLSX from 'xlsx';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-vendor-ledger',
  templateUrl: './vendor-ledger.component.html',
  styleUrls: ['./vendor-ledger.component.css']
})
export class VendorLedgerComponent implements OnInit {

  public data: any;

  @ViewChild('TABLE', { static: false }) TABLE: ElementRef;

  config = {
    format: "YYYY-MM-DD", drops: 'down', opens: 'right',
  };
  toDate: string;
  fromDate: string;
  vendor: any;
  name: string = null;
  vendorList: any = [];
  purchaseinvoiceList: any =[];
  result: any = [];
  ShowTable: boolean = false;
  Export: boolean = false;
  Quantity: any;
  UnitPrice: any;
  Total: any;
  DebitAmount = 0;
  CreditAmount = 0;
  OpeningBalance = 0;
  ClosingBalance = 0;
  RunningBalance = 0;
  list = [];

  pager: any = {};
  pagedItems: any[];

  constructor(private vendorLedgerService: VendorLedgerService, private pagingService: PagingService
    , private datePipe: DatePipe, private spinner: NgxSpinnerService, private purchaseinvoiceservices: PurchaseinvoiceService) { }

  ngOnInit() {
    /* Get Customer List */
    this.vendorLedgerService.getVendorFromVendorLedger().subscribe(
      (data: any) => {
        if (data.length > 0) {
          const unique = [];
          data.map((x: any) => unique.filter(a => a.Vendor == x.Vendor).length > 0 ? null : unique.push(x));
          this.vendorList = unique;
        }
      },
      error => {
        console.log(error.error.message, 'Error Fetching Vendor List');
      });



      this.purchaseinvoiceservices.getAllPurchaseInvoice().subscribe(
        data => {
          this.purchaseinvoiceList = data;
        },
        error => {
          console.log(error.error.message, 'Error Fetching invoice list List');
        });

        // this.VendorLedger.Details = [];

  }

  GetVendorLedger() {

    var a = this.toDate.split('-');
    var a1 = a[1] + '-' + a[2] + '-' + a[0];

    var b = this.fromDate.split('-');
    var b1 = b[1] + '-' + b[2] + '-' + b[0];

    if (new Date(a1) > new Date(b1)) {
      swal('','To Date can not be greater than From Date','error');
      return;
    } else {
      var diff = Math.floor((Date.parse(this.fromDate) - Date.parse(this.toDate)) / 86400000);
      if (diff > 30) {
        swal('','To Date and From Date can not be greater than 30 Days','error');
        return;
      }
    }
this.spinner.show();
    this.vendorLedgerService.getVendorLedger(this.toDate, this.fromDate, this.vendor.Vendor).subscribe((data: any) => {
      if (data.length > 0) {

        this.DebitAmount = 0;
        this.CreditAmount = 0;
        this.OpeningBalance = 0;
        this.ClosingBalance = 0;
        this.RunningBalance = 0;

        if (data[0].length > 0)
          this.DebitAmount = data[0][0].amount;

        if (data[1].length > 0)
          this.CreditAmount = data[1][0].amount;

        this.OpeningBalance = this.DebitAmount - this.CreditAmount;

        if (data[2].length > 0) {
          this.result = data[2];
          this.result.forEach((element: any, key: any) => {
            element.Date = this.datePipe.transform(element.Date, "dd/MM/yyyy");
            if (key === 0)
              element.OpeningBalance = this.OpeningBalance;
            else
              element.OpeningBalance = null;
            if (element.DebitCredit === 'Debit') {
              element.DebitAmount = element.Amount;
              this.RunningBalance += this.OpeningBalance;
              this.RunningBalance += element.Amount;
              element.Balance = this.RunningBalance;
            }
            else {
              element.CreditAmount = element.Amount;
              if (this.RunningBalance == 0)
                this.RunningBalance = this.OpeningBalance
              this.RunningBalance -= element.Amount;
              element.Balance = this.RunningBalance;
            }

            if (Object.is(this.result.length - 1, key)) {
              this.ClosingBalance = this.RunningBalance;
              element.ClosingBalance = this.ClosingBalance;
            } else
              element.ClosingBalance = null;

          });
this.spinner.hide();
          this.setPage(1);
          this.ShowTable = true;
          this.Export = true;
        } else {
          this.spinner.hide();
          swal('','No Record Found','info');
          this.ShowTable = false;
          this.Export = false;
        }
      } else {
        this.spinner.hide();
        swal('','No Record Found','info');
        this.ShowTable = false;
        this.Export = false;
      }
    });

  }

  setPage(page: number) {
    // get pager object from service
    this.pager = this.pagingService.getPager(this.result.length, page);

    // get current page of items
    this.pagedItems = this.result.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }

  ExportToExcel() {
    var config = { raw: true, type: 'string' };
    var ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.TABLE.nativeElement, config);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'Vendor-Ledger.xlsx');
  }

}
