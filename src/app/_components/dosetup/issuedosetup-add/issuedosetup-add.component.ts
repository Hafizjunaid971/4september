// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-issuedosetup-add',
//   templateUrl: './issuedosetup-add.component.html',
//   styleUrls: ['./issuedosetup-add.component.css']
// })
// export class IssuedosetupAddComponent implements OnInit {

//   constructor() { }

//   ngOnInit() {
//   }

// }






import { Component, OnInit } from '@angular/core';
import { DOSETUP, DOSETUPDETAILS } from 'src/app/_models/dosetup';

import { Router, ActivatedRoute } from '@angular/router';
import { DosetupService } from 'src/app/_services/dosetup.service';
import { CustomerService } from 'src/app/_services/customer.service';
import {StockcounterService } from 'src/app/_services/stockcounter.service';
import swal from 'sweetalert';
import { NgxSpinnerService } from 'ngx-spinner';

 @Component({
   selector: 'app-issuedosetup-add',
   templateUrl: './issuedosetup-add.component.html',
   styleUrls: ['./issuedosetup-add.component.css']
 })
 export class IssuedosetupAddComponent implements OnInit {


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
   stockList: any = [];



   constructor(private router: Router, private doService: DosetupService, private customerservices: CustomerService,
    private stockservices:StockcounterService,
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
          this.DOSETUP.DOSETUPDETAILS = [];
          this.DOSETUP.DOSETUPDETAILS[0] = new DOSETUPDETAILS();

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
          this.DOSETUP.DOSETUPDETAILS = [];
          this.DOSETUP.DOSETUPDETAILS[0] = new DOSETUPDETAILS();
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


     //stock services
     this.stockservices.getAllStock().subscribe(
      data => {
        this.stockList = data;
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
          this.DOSETUP.serialnumber.trim();
          var currentUser = JSON.parse(localStorage.getItem('currentUser'));
          this.DOSETUP.CreatedBy = currentUser.UserId;
          this.DOSETUP.CreatedDate = new Date();
          this.DOSETUP.serialnumber;


          // var serial = '9';

          // this.DOSETUP.serialnumber = serial;


          this.doService.add(item).subscribe(
            () => {
              this.spinner.hide();
              swal("", "Record Add Successfully", "success")
                .then(() => {
                  this.router.navigate(['/dosetup-list']);
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
          this.DOSETUP.SNO.trim();
          var currentUser = JSON.parse(localStorage.getItem('currentUser'));
          this.DOSETUP.ModifiedBy = currentUser.UserId;
          this.DOSETUP.ModifiedDate = new Date();
          this.DOSETUP.CreatedDate = new Date(this.DOSETUP.CreatedDate);
          this.doService.update(item._id, item).subscribe(
            () => {
              this.spinner.hide();
              swal("", "Record Update Successfully", "success")
                .then(() => {
                  this.router.navigate(['/dosetup-list']);
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
                  this.router.navigate(['/dosetup-list']);
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
    this.router.navigate(['/dosetup-list']);
  }



  CalculatePaymentDue() {

    if (this.DOSETUP.Quantity && this.DOSETUP.Quantity2) {
      if (this.DOSETUP.Quantity2 > this.DOSETUP.Quantity) {
        swal('', 'Quantity can not be greater than Quantity', 'error');
        this.DOSETUP.Quantity2 = null;
        this.DOSETUP.Denomation = null;
        return;
      }
      var result = this.DOSETUP.Quantity - this.DOSETUP.Quantity2;
      this.DOSETUP.Denomation = Math.round(result * 100) / 100;
    }
    else {
      this.DOSETUP.Quantity2 = null;
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

  CalculatePayable() {
    var total = 0;
    for (let index = 0; index < this.DOSETUP.DOSETUPDETAILS.length; index++) {
      const element = this.DOSETUP.DOSETUPDETAILS[index];
      total += element.Denomation;
    }

  }





  CalculateStock() {
    // if (!this.DOSETUP.Quantity3 && this.PaymentHistoryList.length > 0) {
    //   this.DOSETUP.Denomation2 = this.PaymentHistoryList[this.PaymentHistoryList.length - 1].Denomation2;
    //   return;
    // }

    // if (this.DOSETUP.Denomation2 && this.PaymentHistoryList.length > 0) {
    //   if (parseFloat(this.DOSETUP.Quantity3.toString()) > parseFloat(this.DOSETUP.Denomation2.toString())) {
    //     swal('', 'Quantity can not be greater than PQuantity Due', 'error');
    //     this.DOSETUP.Quantity3 = null;
    //     this.DOSETUP.Denomation2 = this.PaymentHistoryList[this.PaymentHistoryList.length - 1].Denomation2;
    //     return;
    //   }
    //   else {
    //     var x = this.PaymentHistoryList.map(o => o.Quantity3).reduce((a, c) => { return parseFloat(a) + parseFloat(c) });
    //     var result = parseFloat(this.DOSETUP.AddInventoryStock.Quantity.toString()) - (parseFloat(this.DOSETUP.Quantity3.toString()) + parseFloat(x));
    //     this.DOSETUP.Denomation2 = Math.round(result * 100) / 100;
    //     return;
    //   }
    // }

    if (this.DOSETUP.AddInventoryStock.Quantity && this.DOSETUP.Quantity3) {
      if (this.DOSETUP.Quantity3 > this.DOSETUP.AddInventoryStock.Quantity) {
        swal('', 'Quantity can not be greater than Quantity', 'error');
        this.DOSETUP.Quantity3 = null;
        this.DOSETUP.Denomation2 = null;
        return;
      }
      var result = this.DOSETUP.AddInventoryStock.Quantity - this.DOSETUP.Quantity3;
      this.DOSETUP.Denomation2 = Math.round(result * 100) / 100;
    }
    else {
      this.DOSETUP.Quantity3 = null;
    }
  }




}
