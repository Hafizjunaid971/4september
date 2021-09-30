import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PriceListService } from 'src/app/_services/price-list.service';
import { PagingService } from 'src/app/_services/paging.service';
import { AuthenticationService } from 'src/app/_services';

@Component({
  selector: 'app-price-list',
  templateUrl: './price-list.component.html',
  styleUrls: ['./price-list.component.css']
})
export class PriceListComponent implements OnInit {

  priceList: any;
  pager: any = {};
  pagedItems: any[];
  searchText = '';

  constructor(public router: Router, private pricelistService: PriceListService, 
    private pagingService: PagingService) { }

  ngOnInit() {
    
    this.pricelistService.getAllPriceList().subscribe(
      data => {
       this.priceList = data;
       this.setPage(1);
      },
      error => {
        console.log(error.error.message, 'Error');
      });
  }

  setPage(page: number) {
    // get pager object from service
    this.pager = this.pagingService.getPager(this.priceList.length, page);

    // get current page of items
    this.pagedItems = this.priceList.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }

  Add() {
    this.router.navigate(['price-list-add/Add']);
  }

  View(item: any) {
    this.pricelistService.setData(item);
    this.router.navigate(['price-list-add/View']);
  }

  Edit(item: any) {
    this.pricelistService.setData(item);
    this.router.navigate(['price-list-add/Edit']);
  }

  Delete(item: any) {
    this.pricelistService.setData(item);
    this.router.navigate(['price-list-add/Delete']);
  } 

}
