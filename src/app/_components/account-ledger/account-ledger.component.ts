import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { AccountLedgerService } from 'src/app/_services/account-ledger.service';
import { PagingService } from 'src/app/_services/paging.service';
import { DatePipe } from '@angular/common';
import * as XLSX from 'xlsx';
import swal from 'sweetalert';

@Component({
  selector: 'app-account-ledger',
  templateUrl: './account-ledger.component.html',
  styleUrls: ['./account-ledger.component.css']
})
export class AccountLedgerComponent implements OnInit {

  @ViewChild('TABLE', { static: false }) TABLE: ElementRef;

  config = {
    format: "YYYY-MM-DD", drops: 'down',
    opens: 'right',
  };
  toDate: string;
  fromDate: string;
  customer: any;
  name: string = null;
  customerList: any = [];
  result: any = [];
  ShowTable: boolean = false;
  Export: boolean = false;
  DebitAmount = 0;
  CreditAmount = 0;
  OpeningBalance = 0;
  ClosingBalance = 0;
  RunningBalance = 0;
  list = [];

  pager: any = {};
  pagedItems: any[];

  constructor(private accountLedgerService: AccountLedgerService, private pagingService: PagingService, private datePipe: DatePipe) { }

  ngOnInit() {
    /* Get Customer List */
    this.accountLedgerService.getCustomerFromInvoice().subscribe(
      (data: any) => {
        if (data.length > 0) {
          var l1 = [];
          data.forEach((element: any) => {
            l1.push(element.Company);
          });

          const unique = [];

          l1.map((x: any) => unique.filter(a => a.Name == x.Name && a.CompanyName == x.CompanyName).length > 0 ? null : unique.push(x));

          this.customerList = unique;
        }
      },
      (error: any) => {
        console.log(error.error.message, 'Error Fetching Customer List');
      });
  }

  SetName() {
    if (this.customer)
      this.name = this.customer.Name;
    else
      this.name = null;
  }

  GetAccountLedger() {

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

    this.accountLedgerService.getAccountLedger(this.toDate, this.fromDate, this.name).subscribe((data: any) => {
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
            if (element.Flag === 'Quantity In') {
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

          this.setPage(1);
          this.ShowTable = true;
          this.Export = true;
        } else {
          swal('','No Record Found','info');
          this.ShowTable = false;
          this.Export = false;
        }
      } else {
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
    XLSX.writeFile(wb, 'Account-Ledger.xlsx');
  }

}
