// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-inventory-stock-list',
//   templateUrl: './inventory-stock-list.component.html',
//   styleUrls: ['./inventory-stock-list.component.css']
// })
// export class InventoryStockListComponent implements OnInit {

//   constructor() { }

//   ngOnInit() {
//   }

// }



import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {  AddstockinventoryService} from 'src/app/_services/addstockinventory.service';
import { PagingService } from 'src/app/_services/paging.service';
import { AuthenticationService } from 'src/app/_services/authentication.service';

@Component({
  selector: 'app-inventory-stock-list',
  templateUrl: './inventory-stock-list.component.html',
  styleUrls: ['./inventory-stock-list.component.css']
})
export class InventoryStockListComponent implements OnInit {
  public data: any;

  currentUser: any;

  pager: any = {};
  pagedItems: any[];
  inventorystockList: any = [];
  searchText = '';
  searchText2 = '';
  searchText3 = '';
  searchText4 = '';
  searchText5 = '';

  constructor(public router: Router, private addstockinventoryService: AddstockinventoryService, private authservices: AuthenticationService,
    private pagingService: PagingService) { }

  ngOnInit() {

    this.addstockinventoryService.getAllInventoryStock().subscribe(
      data => {
        this.inventorystockList = data;
        this.setPage(1);
      },
      error => {
        console.log(error.error.message, 'Error');
      });

 //auth colum coll
 var localUser = localStorage.getItem('currentUser');
 if (!localUser) {
   this.authservices.logout();
   this.router.navigate(['/login']);
 }else{
   this.currentUser = JSON.parse(localUser);
 }
  }

  setPage(page: number) {
    // get pager object from service
    this.pager = this.pagingService.getPager(this.inventorystockList.length, page);

    // get current page of items
    this.pagedItems = this.inventorystockList.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }

  Add() {
    this.router.navigate(['inventorystock-add/Add']);
  }

  View(item: any) {
    this.addstockinventoryService.setData(item);
    this.router.navigate(['inventorystock-add/View']);
  }

  Edit(item: any) {
    this.addstockinventoryService.setData(item);
    this.router.navigate(['inventorystock-add/Edit']);
  }

  Delete(item: any) {
    this.addstockinventoryService.setData(item);
    this.router.navigate(['inventorystock-add/Delete']);
  }

}
