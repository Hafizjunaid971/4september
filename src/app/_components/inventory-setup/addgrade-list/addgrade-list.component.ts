// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-addgrade-list',
//   templateUrl: './addgrade-list.component.html',
//   styleUrls: ['./addgrade-list.component.css']
// })
// export class AddgradeListComponent implements OnInit {

//   constructor() { }

//   ngOnInit() {
//   }

// }



import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import {AddgradeService  } from 'src/app/_services/addgrade.service';
import { PagingService } from 'src/app/_services/paging.service';
import { AuthenticationService } from 'src/app/_services/authentication.service';

@Component({
  selector: 'app-addgrade-list',
  templateUrl: './addgrade-list.component.html',
  styleUrls: ['./addgrade-list.component.css']
})
export class AddgradeListComponent implements OnInit {
  currentUser: any;

  addgradeseList: any;
  pager: any = {};
  pagedItems: any[];
  searchText = '';

  constructor(public router: Router, private addgraeService: AddgradeService, private authservices:AuthenticationService,
    private pagingService: PagingService) { }

  ngOnInit() {

    this.addgraeService.getAllADDGRADE().subscribe(
      data => {
        this.addgradeseList = data;
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
    this.pager = this.pagingService.getPager(this.addgradeseList.length, page);

    // get current page of items
    this.pagedItems = this.addgradeseList.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }


  Add() {
    this.router.navigate(['addgrade-add/Add']);
  }

  View(item: any) {
    this.addgraeService.setData(item);
    this.router.navigate(['addgrade-add/View']);
  }

  Edit(item: any) {
    this.addgraeService.setData(item);
    this.router.navigate(['addgrade-add/Edit']);
  }

  Delete(item: any) {
    this.addgraeService.setData(item);
    this.router.navigate(['addgrade-add/Delete']);
  }

}
