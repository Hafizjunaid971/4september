// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-returndo-list',
//   templateUrl: './returndo-list.component.html',
//   styleUrls: ['./returndo-list.component.css']
// })
// export class ReturndoListComponent implements OnInit {

//   constructor() { }

//   ngOnInit() {
//   }

// }





import { Component, OnInit } from '@angular/core';
import { ReturndocustomerService } from 'src/app/_services/returndocustomer.service';

import { Router } from '@angular/router';
import { PagingService } from 'src/app/_services/paging.service';
import { AuthenticationService } from 'src/app/_services';

@Component({
  selector: 'app-returndo-list',
  templateUrl: './returndo-list.component.html',
  styleUrls: ['./returndo-list.component.css']
})
export class ReturndoListComponent implements OnInit {

  returndoList: any;
  pager: any = {};
  pagedItems: any[];
  searchText = '';

  constructor(public router: Router, private returndoService: ReturndocustomerService,
    private pagingService: PagingService) { }

  ngOnInit() {

    this.returndoService.getAllReturnDo().subscribe(
      data => {
        this.returndoList = data;
        this.setPage(1);
      },
      error => {
        console.log(error.error.message, 'Error');
      });
  }

  setPage(page: number) {
    // get pager object from service
    this.pager = this.pagingService.getPager(this.returndoList.length, page);

    // get current page of items
    this.pagedItems = this.returndoList.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }


  Add() {
    this.router.navigate(['returndo-add/Add']);
  }

  View(item: any) {
    this.returndoService.setData(item);
    this.router.navigate(['returndo-add/View']);
  }

  Edit(item: any) {
    this.returndoService.setData(item);
    this.router.navigate(['returndo-add/Edit']);
  }

  Delete(item: any) {
    this.returndoService.setData(item);
    this.router.navigate(['returndo-add/Delete']);
  }

}
