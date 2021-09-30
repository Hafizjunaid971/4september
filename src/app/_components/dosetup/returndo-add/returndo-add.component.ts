// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-returndo-add',
//   templateUrl: './returndo-add.component.html',
//   styleUrls: ['./returndo-add.component.css']
// })
// export class ReturndoAddComponent implements OnInit {

//   constructor() { }

//   ngOnInit() {
//   }

// }




import { Component, OnInit } from '@angular/core';
import {RETURNDO } from 'src/app/_models/returndo';

import { Router, ActivatedRoute } from '@angular/router';
import { ReturndocustomerService } from 'src/app/_services/returndocustomer.service';
import {DosetupService } from 'src/app/_services/dosetup.service';
import swal from 'sweetalert';
import { NgxSpinnerService } from 'ngx-spinner';

 @Component({
   selector: 'app-returndo-add',
   templateUrl: './returndo-add.component.html',
   styleUrls: ['./returndo-add.component.css']
 })
 export class ReturndoAddComponent implements OnInit {
  RETURNDO: RETURNDO = new RETURNDO();
  AddMode: boolean = false;
  ViewMode: boolean = false;
  EditMode: boolean = false;
  DeleteMode: boolean = false;
   dosetupList: any = [];
   inventstockList: any = [];
  config = {
    format: "DD/MM/YYYY", drops: 'down', opens: 'right',
  };
  constructor( private router: Router, private returndoService: ReturndocustomerService, private dosetupservices: DosetupService,
    private route: ActivatedRoute, private spinner: NgxSpinnerService) {
    this.route.data.subscribe(data => {
      if (data.param) {
        if (data.param === 'Add') {
          this.EditMode = false;
          this.DeleteMode = false;
          this.ViewMode = false;
          this.AddMode = true;
        }
        else if (data.param === 'Edit') {
          this.RETURNDO = this.returndoService.getData();
          this.EditMode = true;
          this.DeleteMode = false;
          this.ViewMode = false;
          this.AddMode = false;

        } else if (data.param === 'Delete') {
          this.RETURNDO = this.returndoService.getData();
          this.EditMode = false;
          this.DeleteMode = true;
          this.ViewMode = false;
          this.AddMode = false;
        } else if (data.param === 'View') {
          this.RETURNDO = this.returndoService.getData();
          this.EditMode = false;
          this.DeleteMode = false;
          this.ViewMode = true;
          this.AddMode = false;
        }
      }
    });
  }

   ngOnInit() {

    this.dosetupservices.getAllDOSETUP().subscribe(
      data => {
       this.dosetupList = data;
      },
      error => {
        console.log(error.error.message, 'Error');
      });

      this.returndoService.getAllInventoryStock().subscribe(
        data => {
         this.inventstockList = data;
        },
        error => {
          console.log(error.error.message, 'Error');
        });

  }

  Save(item: any) {
    swal({
      text: "Are you sure to save this record?",
      icon: "warning",
      dangerMode: true,
      buttons: {
        cancel: "Cancel",
        ok: "OK"
      }
    } as any)
      .then((willDelete) => {
        if (willDelete) {
          this.spinner.show()
          // this.RETURNDO.ReturnQuantity.trim();

          var currentUser = JSON.parse(localStorage.getItem('currentUser'));
          this.RETURNDO.CreatedBy = currentUser.UserId;
          this.RETURNDO.CreatedDate = new Date();
          this.returndoService.add(item).subscribe(
            () => {
              this.spinner.hide();
              swal("", "Record Add Successfully", "success")
                .then(() => {
                  this.router.navigate(['/returndo-list']);
                });
            },
            error => {
              this.spinner.hide();
              console.log(error.error.message, 'Error');
            });
        }
      });
  }

  Update(item: any) {
    swal({
      text: "Are you sure to save this record?",
      icon: "warning",
      dangerMode: true,
      buttons: {
        cancel: "Cancel",
        ok: "OK"
      }
    } as any)
      .then((willDelete) => {
        if (willDelete) {
          this.spinner.show();
          // this.RETURNDO.ReturnQuantity.trim();
          var currentUser = JSON.parse(localStorage.getItem('currentUser'));
          this.RETURNDO.ModifiedBy = currentUser.UserId;
          this.RETURNDO.ModifiedDate = new Date();
          this.RETURNDO.CreatedDate = new Date(this.RETURNDO.CreatedDate);
          this.returndoService.update(item._id, item).subscribe(
            () => {
              this.spinner.hide();
              swal("", "Record Update Successfully", "success")
                .then(() => {
                  this.router.navigate(['/returndo-list']);
                });
            },
            error => {
              this.spinner.hide();
              console.log(error.error.message, 'Error');
            });
        }
      });
  }

  Delete(item: any) {
    swal({
      text: "Are you sure to save this record?",
      icon: "warning",
      dangerMode: true,
      buttons: {
        cancel: "Cancel",
        ok: "OK"
      }
    } as any)
      .then((willDelete) => {
        if (willDelete) {
          this.spinner.show();
          this.returndoService.delete(item._id, item).subscribe(
            () => {
              this.spinner.hide();
              swal("", "Record Delete Successfully", "success")
                .then(() => {
                  this.router.navigate(['/returndo-list']);
                });
            },
            error => {
              this.spinner.hide();
              console.log(error.error.message, 'Error');
            });
        }
      });
  }

  Back() {
    this.router.navigate(['/returndo-list']);
  }




  CalculateStock() {


    if (this.RETURNDO.AddInventoryStock.Quantity && this.RETURNDO.ReturnQuantity) {
      // if (this.RETURNDO.ReturnQuantity > this.RETURNDO.AddInventoryStock.Quantity) {
      //   swal('', 'Quantity can not be greater than Quantity', 'error');
      //   this.RETURNDO.ReturnQuantity = null;
      //   this.RETURNDO.ReturnBalance = null;
      //   return;
      // }
      var result = this.RETURNDO.AddInventoryStock.Quantity + this.RETURNDO.ReturnQuantity;
      this.RETURNDO.ReturnBalance = Math.round(result * 100) / 100;
    }
    else {
      this.RETURNDO.ReturnQuantity = null;
    }
  }



}
