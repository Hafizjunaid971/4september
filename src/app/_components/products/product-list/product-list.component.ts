import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/_services/product.service';
import { Router } from '@angular/router';

import { PagingService } from 'src/app/_services/paging.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  productList: any;
  pager: any = {};
  pagedItems: any[];
  seachProductInventory = '';

  constructor(public router: Router, private productService: ProductService, 
    private pagingService: PagingService) { }

  ngOnInit() {

    this.productService.getAllProduct().subscribe(
      data => {
        if (Object.keys(data).length > 0) {
          var filterValues = this.getUnique(data);

          this.productList = filterValues;
          this.setPage(1);
        }
      },
      error => {
        console.log(error.error.message, 'Error');
      });
  }

  getUnique(array: any) {
    const result = [];
    const map = new Map();
    for (const item of array) {
      if (!map.has(item.Name)) {
        map.set(item.Name, true);    // set any value to Map
        result.push({
          Name: item.Name
        });
      }
    }

    return result;
  }

  setPage(page: number) {
    // get pager object from service
    this.pager = this.pagingService.getPager(this.productList.length, page);

    // get current page of items
    this.pagedItems = this.productList.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }

  Add() {
    this.router.navigate(['product-add/Add']);
  }

  View(item: any) {
    this.productService.setData(item);
    this.router.navigate(['product-add/View']);
  }

  Edit(item: any) {
    this.productService.setData(item);
    this.router.navigate(['product-add/Edit']);
  }

  Delete(item: any) {
    this.productService.setData(item);
    this.router.navigate(['product-add/Delete']);
  }

}
