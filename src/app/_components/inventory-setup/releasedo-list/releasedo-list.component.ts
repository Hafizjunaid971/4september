// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-releasedo-list',
//   templateUrl: './releasedo-list.component.html',
//   styleUrls: ['./releasedo-list.component.css']
// })
// export class ReleasedoListComponent implements OnInit {

//   constructor() { }

//   ngOnInit() {
//   }

// }






import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { DosetupService } from 'src/app/_services/dosetup.service';
import {AgentLedgerService } from 'src/app/_services/agent-ledger.service';
import { PagingService } from 'src/app/_services/paging.service';
import { AuthenticationService } from 'src/app/_services/authentication.service';

@Component({
  selector: 'app-releasedo-list',
  templateUrl: './releasedo-list.component.html',
  styleUrls: ['./releasedo-list.component.css']
})
export class ReleasedoListComponent implements OnInit {

  currentUser: any;

  dosetupList: any;
  dosetupopupList: any;
  pager: any = {};
  pagedItems: any[];
   searchText = '';
   searchText2 = '';
   searchText3 = '';
   searchText4 = '';

   constructor(public router: Router, private dosetupService: DosetupService, private authservices: AuthenticationService,
    private agentledgerservices: AgentLedgerService, private pagingService: PagingService) { }

  ngOnInit() {

    this.agentledgerservices.getAllDOSETUP().subscribe(
      data => {
        // debugger;
        this.dosetupList = data;
        this.setPage(1);
      },
      error => {
        console.log(error.error.message, 'Error');
      });

      this.dosetupService.getAllDOSETUP().subscribe(
        data => {
          this.dosetupopupList = data;
           this.setPage(1);
          console.log(data);
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
    this.pager = this.pagingService.getPager(this.dosetupList.length, page);

    // get current page of items
    this.pagedItems = this.dosetupList.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }


  Add() {
    this.router.navigate(['release-doagent-to-customer/Add']);
  }

  View(item: any) {
    this.dosetupService.setData(item);
    this.router.navigate(['release-doagent-to-customer/View']);
  }

  Edit(item: any) {
    this.dosetupService.setData(item);
    this.router.navigate(['release-doagent-to-customer/Edit']);
  }

  Delete(item: any) {
    this.dosetupService.setData(item);
    this.router.navigate(['release-doagent-to-customer/Delete']);
  }

}
