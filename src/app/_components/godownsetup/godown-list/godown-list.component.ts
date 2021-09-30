// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-godown-list',
//   templateUrl: './godown-list.component.html',
//   styleUrls: ['./godown-list.component.css']
// })
// export class GodownListComponent implements OnInit {

//   constructor() { }

//   ngOnInit() {
//   }

// }


import { Component, OnInit } from '@angular/core';
import { GodownsetupService } from 'src/app/_services/godownsetup.service';

import { Router } from '@angular/router';
import { PagingService } from 'src/app/_services/paging.service';
import { AuthenticationService } from 'src/app/_services';

 @Component({
   selector: 'app-godown-list',
   templateUrl: './godown-list.component.html',
   styleUrls: ['./godown-list.component.css']
 })
 export class GodownListComponent implements OnInit {

  GodownSetupList: any;
  pager: any = {};
  pagedItems: any[];
  searchText = '';

  constructor(public router: Router, private godownService: GodownsetupService,
    private pagingService: PagingService) { }

  ngOnInit() {

    this.godownService.getAllGodown().subscribe(
      data => {
        this.GodownSetupList = data;
        this.setPage(1);
      },
      error => {
        console.log(error.error.message, 'Error');
      });
  }

  setPage(page: number) {
    // get pager object from service
    this.pager = this.pagingService.getPager(this.GodownSetupList.length, page);

    // get current page of items
    this.pagedItems = this.GodownSetupList.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }


  Add() {
    this.router.navigate(['godownsetup-add/Add']);
  }

  View(item: any) {
    this.godownService.setData(item);
    this.router.navigate(['godownsetup-add/View']);
  }

  Edit(item: any) {
    this.godownService.setData(item);
    this.router.navigate(['godownsetup-add/Edit']);
  }

  Delete(item: any) {
    this.godownService.setData(item);
    this.router.navigate(['godownsetup-add/Delete']);
  }

}
