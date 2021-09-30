// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-user-list',
//   templateUrl: './user-list.component.html',
//   styleUrls: ['./user-list.component.css']
// })
// export class UserListComponent implements OnInit {

//   constructor() { }

//   ngOnInit() {
//   }

// }


import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/_services';
import { PagingService } from 'src/app/_services/paging.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  userList: any;
  pager: any = {};
  pagedItems: any[];
  searchText = '';
  searchText2 = '';

  constructor(public router: Router, private userService: UserService, private pagingService: PagingService) { }

  ngOnInit() {

    this.userService.getAllUser().subscribe(
      data => {
        this.userList = data;
        this.setPage(1);
      },
      error => {
        console.log(error.error.message, 'Error');
      });
  }

  setPage(page: number) {
    // get pager object from service
    this.pager = this.pagingService.getPager(this.userList.length, page);

    // get current page of items
    this.pagedItems = this.userList.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }


  Add() {
    this.router.navigate(['user-add/Add']);
  }

  View(item: any) {
    this.userService.setData(item);
    this.router.navigate(['user-add/View']);
  }

  Edit(item: any) {
    this.userService.setData(item);
    this.router.navigate(['user-add/Edit']);
  }

  Delete(item: any) {
    this.userService.setData(item);
    this.router.navigate(['user-add/Delete']);
  }

}
