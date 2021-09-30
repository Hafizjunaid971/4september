

import { Component, OnInit } from '@angular/core';
import { DOSETUP, DOSETUPDETAILS } from 'src/app/_models/dosetup';

import { Router, ActivatedRoute } from '@angular/router';
import { DosetupService } from 'src/app/_services/dosetup.service';
import { CustomerService } from 'src/app/_services/customer.service';
import { MatDialog } from '@angular/material';

import { ModelPopupComponent} from '../model-popup/model-popup.component';

import swal from 'sweetalert';
import { NgxSpinnerService } from 'ngx-spinner';

 @Component({
   selector: 'app-releasedo-add',
   templateUrl: './releasedo-add.component.html',
   styleUrls: ['./releasedo-add.component.css']
 })
 export class ReleasedoAddComponent implements OnInit {


  DOSETUP: DOSETUP = new DOSETUP();
  AddMode: boolean = false;
  ViewMode: boolean = false;
  EditMode: boolean = false;
   DeleteMode: boolean = false;
   config = {
    format: "DD/MM/YYYY", drops: 'down', opens: 'right',
  };
   inventorystockList: any = [];
   customerList: any = [];
   PaymentHistoryList: any = [];


  constructor( private router: Router, private doService: DosetupService, private dialog: MatDialog, private customerservices: CustomerService,
    private route: ActivatedRoute, private spinner: NgxSpinnerService) {
    this.route.data.subscribe(data => {
      if (data.param) {
        if (data.param === 'Add') {
          this.EditMode = false;
          this.DeleteMode = false;
          this.ViewMode = false;
          this.AddMode = true;
          this.DOSETUP.DOSETUPDETAILS = [];
          this.DOSETUP.DOSETUPDETAILS[0] = new DOSETUPDETAILS();
          this.doService.getUniqueNumber('serialnumber').subscribe(
            (data: any) => {
              var serial = 'SNO' + '-00' + data.data;
              this.DOSETUP.serialnumber = serial;
            },
            error => {
              console.log(error.error.message);
            });
        }
        else if (data.param === 'Edit') {
          this.DOSETUP = this.doService.getData();
          this.EditMode = true;
          this.DeleteMode = false;
          this.ViewMode = false;
          this.AddMode = false;

        } else if (data.param === 'Delete') {
          this.DOSETUP = this.doService.getData();
          this.EditMode = false;
          this.DeleteMode = true;
          this.ViewMode = false;
          this.AddMode = false;
        } else if (data.param === 'View') {
          this.DOSETUP = this.doService.getData();
          this.EditMode = false;
          this.DeleteMode = false;
          this.ViewMode = true;
          this.AddMode = false;
        }
      }
    });
  }

   ngOnInit() {

    this.doService.getAllInventoryStock().subscribe(
      data => {
        this.inventorystockList = data;
        console.log(data);
      },
      error => {
        console.log(error.error.message, 'Error');
      });

      this.customerservices.getAllCustomer().subscribe(
        data => {
          this.customerList = data;
        },
        error => {
          console.log(error.error.message, 'Error');
        });


        this.doService.getAllDOSETUP().subscribe(
          data => {
            this.inventorystockList = data;
            console.log(data);
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
          // this.DOSETUP.SNO.trim();
          this.DOSETUP.serialnumber.trim();

          var currentUser = JSON.parse(localStorage.getItem('currentUser'));
          this.DOSETUP.CreatedBy = currentUser.UserId;
          this.DOSETUP.CreatedDate = new Date();
          this.doService.add(item).subscribe(
            () => {
              this.spinner.hide();
              swal("", "Record Add Successfully", "success")
                .then(() => {
                  this.router.navigate(['/release-doagent-to-customer']);
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
          // this.DOSETUP.SNO.trim();
          this.DOSETUP.serialnumber.trim();

          var currentUser = JSON.parse(localStorage.getItem('currentUser'));
          this.DOSETUP.ModifiedBy = currentUser.UserId;
          this.DOSETUP.ModifiedDate = new Date();
          this.DOSETUP.CreatedDate = new Date(this.DOSETUP.CreatedDate);
          this.doService.update(item._id, item).subscribe(
            () => {
              this.spinner.hide();
              swal("", "Record Update Successfully", "success")
                .then(() => {
                  this.router.navigate(['/release-doagent-to-customer']);
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
          this.doService.delete(item._id, item).subscribe(
            () => {
              this.spinner.hide();
              swal("", "Record Delete Successfully", "success")
                .then(() => {
                  this.router.navigate(['/release-doagent-to-customer']);
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
    this.router.navigate(['/release-doagent-to-customer']);
  }

  CalculatePaymentDue() {

    if (this.DOSETUP.Quantity3 && this.DOSETUP.DOSETUPDETAILS[0].Quantity2) {
      if (this.DOSETUP.DOSETUPDETAILS[0].Quantity2 > this.DOSETUP.Quantity3) {
        swal('', 'Quantity can not be greater than Quantity', 'error');
        this.DOSETUP.DOSETUPDETAILS[0].Quantity2 = null;
        this.DOSETUP.DOSETUPDETAILS[0].Denomation = null;
        return;
      }
      var result = this.DOSETUP.Quantity3 - this.DOSETUP.DOSETUPDETAILS[0].Quantity2;
      this.DOSETUP.DOSETUPDETAILS[0].Denomation = Math.round(result * 100) / 100;
      // var result = this.DOSETUP.DOSETUPDETAILS[0].Denomation - this.DOSETUP.DOSETUPDETAILS[1].Quantity2;
      // this.DOSETUP.DOSETUPDETAILS[1].Denomation = Math.round(result * 100) / 100;

    }


    //2nd step

     if (this.DOSETUP.DOSETUPDETAILS[0].Denomation && this.DOSETUP.DOSETUPDETAILS[1].Quantity2) {
      if (this.DOSETUP.DOSETUPDETAILS[1].Quantity2 > this.DOSETUP.DOSETUPDETAILS[0].Denomation) {
        swal('', 'Quantity can not be greater than Quantity', 'error');
        this.DOSETUP.DOSETUPDETAILS[1].Quantity2 = null;
        this.DOSETUP.DOSETUPDETAILS[1].Denomation = null;
        return;
      }

      var result = this.DOSETUP.DOSETUPDETAILS[0].Denomation - this.DOSETUP.DOSETUPDETAILS[1].Quantity2;
      this.DOSETUP.DOSETUPDETAILS[1].Denomation = Math.round(result * 100) / 100;

    }
    else {
      this.DOSETUP.DOSETUPDETAILS[0].Quantity2 = null;
    }

  }

  AddPanel() {
    const newItem = new DOSETUPDETAILS();
    this.DOSETUP.DOSETUPDETAILS.push(newItem);
  }

  RemovePanel(item: any, i: any) {
    if (this.DOSETUP.DOSETUPDETAILS.length > 1) {
      this.DOSETUP.DOSETUPDETAILS.splice(i, 1);
      this.CalculatePayable();
    } else {
      swal("", "Detail is required", "info");
    }
  }


  CalculateTotalFare(item: any) {
    if (item.Quantity2 ) {
      var result = parseFloat(item.Quantity2);
      item.Denomation = Math.round(result * 100) / 100;

      this.CalculatePayable();
    }
  }


  CalculatePayable() {
    var total = 0;
    var total1 = 0;
    for (let index = 0; index < this.DOSETUP.DOSETUPDETAILS.length; index++) {
      const element = this.DOSETUP.DOSETUPDETAILS[index];
      total += element.Denomation;
      total1 =this.DOSETUP.Quantity3 - total;


    }
    if(total > this.DOSETUP.Quantity3){
      swal('', 'Quantity can not be greater than Quantity', 'error');
      this.DOSETUP.Quantity2 = null;
      this.DOSETUP.Denomation = null;
      return;
    }
    this.DOSETUP.Rao = total;

    this.DOSETUP.Payble = total1;

    // this.WorkOrder.Receivable = null;
    // this.WorkOrder.Advance = null;
  }




  View(item: any) {

    this.dialog.open(ModelPopupComponent, {
      data: {
        info: item
      }
    });
  }


}

