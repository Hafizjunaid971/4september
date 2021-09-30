// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-issuedosetup-list',
//   templateUrl: './issuedosetup-list.component.html',
//   styleUrls: ['./issuedosetup-list.component.css']
// })
// export class IssuedosetupListComponent implements OnInit {

//   constructor() { }

//   ngOnInit() {
//   }

// }



import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { DosetupService } from 'src/app/_services/dosetup.service';
import { PagingService } from 'src/app/_services/paging.service';

 @Component({
   selector: 'app-issuedosetup-list',
   templateUrl: './issuedosetup-list.component.html',
   styleUrls: ['./issuedosetup-list.component.css']
 })
 export class IssuedosetupListComponent implements OnInit {

  dosetupList: any;
  pager: any = {};
  pagedItems: any[];
   searchText = '';
   searchText2 = '';
   searchText3 = '';
   searchText4 = '';
   searchText5 = '';


  constructor(public router: Router, private dosetupService: DosetupService, private pagingService: PagingService) { }

  ngOnInit() {

    this.dosetupService.getAllDOSETUP().subscribe(
      data => {
        this.dosetupList = data;
        this.setPage(1);
      },
      error => {
        console.log(error.error.message, 'Error');
      });
  }

  setPage(page: number) {
    // get pager object from service
    this.pager = this.pagingService.getPager(this.dosetupList.length, page);

    // get current page of items
    this.pagedItems = this.dosetupList.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }


  Add() {
    this.router.navigate(['dosetup-add/Add']);
  }

  View(item: any) {
    this.dosetupService.setData(item);
    this.router.navigate(['dosetup-add/View']);
  }

  Edit(item: any) {
    this.dosetupService.setData(item);
    this.router.navigate(['dosetup-add/Edit']);
  }

  Delete(item: any) {
    this.dosetupService.setData(item);
    this.router.navigate(['dosetup-add/Delete']);
  }

}
