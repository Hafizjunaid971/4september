// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-party-list',
//   templateUrl: './party-list.component.html',
//   styleUrls: ['./party-list.component.css']
// })
// export class PartyListComponent implements OnInit {

//   constructor() { }

//   ngOnInit() {
//   }

// }




import { Component, OnInit } from '@angular/core';
import { PartyService } from 'src/app/_services/party.service';

import { Router } from '@angular/router';
import { PagingService } from 'src/app/_services/paging.service';
import { AuthenticationService } from 'src/app/_services';

@Component({
  selector: 'app-party-list',
  templateUrl: './party-list.component.html',
  styleUrls: ['./party-list.component.css']
})
export class PartyListComponent implements OnInit {

  partyList: any;
  pager: any = {};
  pagedItems: any[];
  searchText = '';

  constructor(public router: Router, private partyService: PartyService,
    private pagingService: PagingService) { }

  ngOnInit() {

    this.partyService.getAllParty().subscribe(
      data => {
        this.partyList = data;
        this.setPage(1);
      },
      error => {
        console.log(error.error.message, 'Error');
      });
  }

  setPage(page: number) {
    // get pager object from service
    this.pager = this.pagingService.getPager(this.partyList.length, page);

    // get current page of items
    this.pagedItems = this.partyList.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }


  Add() {
    this.router.navigate(['party-add/Add']);
  }

  View(item: any) {
    this.partyService.setData(item);
    this.router.navigate(['party-add/View']);
  }

  Edit(item: any) {
    this.partyService.setData(item);
    this.router.navigate(['party-add/Edit']);
  }

  Delete(item: any) {
    this.partyService.setData(item);
    this.router.navigate(['party-add/Delete']);
  }

}
