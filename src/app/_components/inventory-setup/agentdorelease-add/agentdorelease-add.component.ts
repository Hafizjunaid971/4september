
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DosetupService } from 'src/app/_services/dosetup.service';
import { PagingService } from 'src/app/_services/paging.service';
import { MatDialog } from '@angular/material';
// import { ModalPopupComponent } from '../modal-popup/modal-popup.component';
import { AuthenticationService } from 'src/app/_services';
import {DoPopupComponent } from '../do-popup/do-popup.component';
import {ModelPopupComponent } from '../model-popup/model-popup.component';
 @Component({
   selector: 'app-agentdorelease-add',
   templateUrl: './agentdorelease-add.component.html',
   styleUrls: ['./agentdorelease-add.component.css']
 })
 export class AgentdoreleaseAddComponent implements OnInit {

  pager: any = {};
  pagedItems: any[];
  inventorystockList: any = [];
  animal: string;
  name: string;
  searchText = '';

  constructor(private dialog: MatDialog, public router: Router, private doService: DosetupService,
    private pagingService: PagingService) { }

  ngOnInit() {
   this.doService.getAllDOSETUP().subscribe(
      data => {
        this.inventorystockList = data;
         this.setPage(1);
        console.log(data);
      },
      error => {
        console.log(error.error.message, 'Error');
      });

  }


  setPage(page: number) {
    // get pager object from service
    this.pager = this.pagingService.getPager(this.inventorystockList.length, page);

    // get current page of items
    this.pagedItems = this.inventorystockList.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }

  View(item: any) {

    this.dialog.open(DoPopupComponent, {
      data: {
        info: item
      }
    });
  }


  View1(item: any) {

    this.dialog.open(ModelPopupComponent, {
      data: {
        info: item
      }
    });
  }

}

