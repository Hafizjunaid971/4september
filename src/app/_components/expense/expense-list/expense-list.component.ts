import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { ExpenseService } from 'src/app/_services/expense.service';
import { PagingService } from 'src/app/_services/paging.service';

@Component({
  selector: 'app-expense-list',
  templateUrl: './expense-list.component.html',
  styleUrls: ['./expense-list.component.css']
})
export class ExpenseListComponent implements OnInit {

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
