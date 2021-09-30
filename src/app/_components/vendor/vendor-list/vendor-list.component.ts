import { Component, OnInit } from '@angular/core';
import { VendorService } from 'src/app/_services/vendor.service';

import { Router } from '@angular/router';
import { PagingService } from 'src/app/_services/paging.service';
import { AuthenticationService } from 'src/app/_services';

@Component({
  selector: 'app-vendor-list',
  templateUrl: './vendor-list.component.html',
  styleUrls: ['./vendor-list.component.css']
})
export class VendorListComponent implements OnInit {

  vendorList: any;
  pager: any = {};
  pagedItems: any[];
  searchText = '';

  constructor(public router: Router, private vendorService: VendorService, 
    private pagingService: PagingService) { }

  ngOnInit() {

    this.vendorService.getAllVendor().subscribe(
      data => {
        this.vendorList = data;
        this.setPage(1);
      },
      error => {
        console.log(error.error.message, 'Error');
      });
  }

  setPage(page: number) {
    // get pager object from service
    this.pager = this.pagingService.getPager(this.vendorList.length, page);

    // get current page of items
    this.pagedItems = this.vendorList.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }


  Add() {
    this.router.navigate(['vendor-add/Add']);
  }

  View(item: any) {
    this.vendorService.setData(item);
    this.router.navigate(['vendor-add/View']);
  }

  Edit(item: any) {
    this.vendorService.setData(item);
    this.router.navigate(['vendor-add/Edit']);
  }

  Delete(item: any) {
    this.vendorService.setData(item);
    this.router.navigate(['vendor-add/Delete']);
  }

}
