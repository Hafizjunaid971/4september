import { Component, OnInit } from '@angular/core';
import { ExpenseService } from 'src/app/_services/expense.service';
import { PagingService } from 'src/app/_services/paging.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-expense-invoice-list',
  templateUrl: './expense-invoice-list.component.html',
  styleUrls: ['./expense-invoice-list.component.css']
})
export class ExpenseInvoiceListComponent implements OnInit {

  expenseList: any;
  pager: any = {};
  pagedItems: any[];
  searchText = '';

  constructor(public router: Router, private expenseService: ExpenseService, private pagingService: PagingService) { }

  ngOnInit() {

    this.expenseService.getAllExpense().subscribe(
      data => {
        this.expenseList = data;
        this.setPage(1);
      },
      error => {
        console.log(error.error.message, 'Error');
      });
  }

  setPage(page: number) {
    // get pager object from service
    this.pager = this.pagingService.getPager(this.expenseList.length, page);

    // get current page of items
    this.pagedItems = this.expenseList.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }


  Add() {
    this.router.navigate(['expense-add/Add']);
  }

  View(item: any) {
    this.expenseService.setData(item);
    this.router.navigate(['expense-add/View']);
  }

  Edit(item: any) {
    this.expenseService.setData(item);
    this.router.navigate(['expense-add/Edit']);
  }

  Delete(item: any) {
    this.expenseService.setData(item);
    this.router.navigate(['expense-add/Delete']);
  }

}
