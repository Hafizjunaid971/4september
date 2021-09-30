import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService } from 'src/app/_services/customer.service';
import { PagingService } from 'src/app/_services/paging.service';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {

  customerList: any;
  pager: any = {};
  pagedItems: any[];
  searchText = '';
  searchText2 = '';
  searchText3 = '';
  searchText4 = '';

  constructor(public router: Router, private customerService: CustomerService, private pagingService: PagingService) { }

  ngOnInit() {

    this.customerService.getAllCustomer().subscribe(
      data => {
        this.customerList = data;
        this.setPage(1);
      },
      error => {
        console.log(error.error.message, 'Error');
      });
  }

  setPage(page: number) {
    // get pager object from service
    this.pager = this.pagingService.getPager(this.customerList.length, page);

    // get current page of items
    this.pagedItems = this.customerList.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }


  Add() {
    this.router.navigate(['customer-add/Add']);
  }

  View(item: any) {
    this.customerService.setData(item);
    this.router.navigate(['customer-add/View']);
  }

  Edit(item: any) {
    this.customerService.setData(item);
    this.router.navigate(['customer-add/Edit']);
  }

  Delete(item: any) {
    this.customerService.setData(item);
    this.router.navigate(['customer-add/Delete']);
  }

}
