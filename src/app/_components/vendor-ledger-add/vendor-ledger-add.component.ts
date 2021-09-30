import { Component, OnInit } from '@angular/core';
import { VendorLedgerService } from 'src/app/_services/vendor-ledger.service';

//men add kia ha ye
import { Router, ActivatedRoute } from '@angular/router';

import { ProductService } from 'src/app/_services/product.service'
import {Product, ProductDetails } from 'src/app/_models/product';
//mene add kia ha ye
import { VendorLedger, Details } from 'src/app/_models/vendorledger';
import swal from 'sweetalert';
import { NgxSpinnerService } from 'ngx-spinner';
import { PurchaseInvoice } from '../../_models/purchaseinvoice';
import { CustomerService } from 'src/app/_services/customer.service';
import { GodownsetupService } from 'src/app/_services/godownsetup.service';
import { PriceListService} from 'src/app/_services/price-list.service';
import { PriceList } from '../../_models/price-list';

@Component({
  selector: 'app-vendor-ledger-add',
  templateUrl: './vendor-ledger-add.component.html',
  styleUrls: ['./vendor-ledger-add.component.css']
})
export class VendorLedgerAddComponent implements OnInit {

  Product: Product = new Product();

  VendorLedger: VendorLedger = new VendorLedger();
  // Details: Array<Details> = [];
  AddMode: boolean = false;
  ViewMode: boolean = false;
  EditMode: boolean = false;
  DeleteMode: boolean = false;
  vendorList: any = [];
  godownList: any = [];
  productList: any = [];
  priceList: any = [];
  PriceListDetails: any = ['1000'];
  debitCreditList: any = ['Debit', 'Credit'];
  vendor: any;
  config = {
    format: "YYYY-MM-DD", drops: 'down', opens: 'right',
  };

  constructor(private router: Router, private vendorLedgerService: VendorLedgerService, private spinner: NgxSpinnerService, private productservices: ProductService, private route: ActivatedRoute,
    private customerService: CustomerService, private godownsetupservices: GodownsetupService, private pricelistservice: PriceListService,) {

    this.route.data.subscribe(data => {
      if (data.param) {
        if (data.param === 'Add') {
          this.VendorLedger.Details = [];
          this.VendorLedger.Details[0] = new Details();
          this.EditMode = false;
          this.DeleteMode = false;
          this.ViewMode = false;
          this.AddMode = true;
//new ad
          this.customerService.getUniqueNumber('lotnumber').subscribe(
            (data: any) => {
              var serial = 'VIN' + '-V_LOT-' + data.data;
              this.VendorLedger.LotNumber = serial;
            },
            error => {
              console.log(error.error.message);
            });

        }

//yahan tak new add


        else if (data.param === 'Edit') {
          this.VendorLedger = this.vendorLedgerService.getData();
          this.EditMode = true;
          this.DeleteMode = false;
          this.ViewMode = false;
          this.AddMode = false;

        } else if (data.param === 'Delete') {
          this.VendorLedger = this.vendorLedgerService.getData();
          this.EditMode = false;
          this.DeleteMode = true;
          this.ViewMode = false;
          this.AddMode = false;
        } else if (data.param === 'View') {
          this.VendorLedger = this.vendorLedgerService.getData();
          this.EditMode = false;
          this.DeleteMode = false;
          this.ViewMode = true;
          this.AddMode = false;
        }
      }


      //het product List add
      // this.productservices.getAllProduct().subscribe(
      //   data => {
      //     this.productList = data;
      //   },
      //   error => {
      //     console.log(error.error.message, 'Error Fetching Product List');
      //   });

    });

   }

  ngOnInit() {
    this.vendorLedgerService.getAllVendor().subscribe(
      data => {
        this.vendorList = data;
      },
      error => {
        console.log(error.error.message, 'Error Fetching Vendor List');
      });



    //godown get
    this.godownsetupservices.getAllGodown().subscribe(
      data => {
        this.godownList = data;
      },
      error => {
        console.log(error.error.message, 'Error in fetching Godown List');
      }
    );

   


    //10 august
    this.pricelistservice.getAllPriceList().subscribe(
      data => {
        this.priceList = data;
        this.priceList.priceListDetails = data;
      },
      error => {
        console.log(error.error.message, 'Error fetching Price List')
      });

    // gofwon get yahn tak

    //new add mene kia
    this.productservices.getAllProduct().subscribe(
      data => {
        this.productList = data;
      },
      error => {
        console.log(error.error.message, 'Error Fetching Product List');
      });

      this.Product.ProductDetails = [];
      // this.Product.ProductDetails[] = new Details();

  }


  Save(item: any) {
    this.spinner.show();
    this.VendorLedger.Date = new Date(this.VendorLedger.Date);
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.VendorLedger.CreatedBy = currentUser.UserId;
    this.VendorLedger.CreatedDate = new Date();
    this.vendorLedgerService.add(item).subscribe(
      () => {
        this.spinner.hide();
        swal("", "Record Add Successfully", "success")
        .then(() => {
          this.router.navigate(['/vendorledger-list']);
        });
        // this.VendorLedger = new VendorLedger();
      },
      error => {
        this.spinner.hide();
        console.log(error.error.message, 'Error');
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
          // this.VendorLedger.Name.trim();
          var currentUser = JSON.parse(localStorage.getItem('currentUser'));
          this.VendorLedger.Date = new Date(this.VendorLedger.Date);
          this.VendorLedger.ModifiedBy = currentUser.UserId;
          this.VendorLedger.ModifiedDate = new Date();
          this.VendorLedger.CreatedDate = new Date(this.VendorLedger.CreatedDate);
          this.vendorLedgerService.update(item._id, item).subscribe(
            () => {
              this.spinner.hide();
              swal("", "Record Update Successfully", "success")
                .then(() => {
                  this.router.navigate(['/vendorledger-list']);
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
          this.vendorLedgerService.delete(item._id, item).subscribe(
            () => {
              this.spinner.hide();
              swal("", "Record Delete Successfully", "success")
                .then(() => {
                  this.router.navigate(['/vendorledger-list']);
                });
            },
            error => {
              this.spinner.hide();
              console.log(error.error.message, 'Error');
            });
        }
      });
  }
  AddDetails() {
    const newItem = new Details();
    this.VendorLedger.Details.push(newItem);
  }

  RemoveDetails(i: any) {
    if (this.VendorLedger.Details.length > 1) {
      this.VendorLedger.Details.splice(i, 1);
    } else {
      swal("One Item Detail is required");
    }
  }


  ValidateItemName(item: any, index: any) {
    for (let i = 0; i < this.VendorLedger.Details.length; i++) {
      var value = this.VendorLedger.Details[i].ItemName;
      // if (value == item.ItemName && i != index) {
      //   swal('','Item Name already inputted', 'error');
      //   item.ItemName = null;
      //   return;
      // }
    }
  }



  //my addition
  CalculateTotalFare(item: any) {
    if (item.Quantity && item.UnitPrice) {
      var result = parseFloat(item.Quantity) * parseFloat(item.UnitPrice);
      item.Total = Math.round(result * 100) / 100;

      // this.CalculatePayable();
    }
  }


  CalculateTotal(item: any) {

    if (item.Quantity && item.UnitPrice) {

      if (item.Total) {
        this.VendorLedger.GrossTotal -= item.Total;
        return;
      }

      var result = item.UnitPrice * item.Quantity;
      item.Total = Math.round(result * 100) / 100;

      if (this.VendorLedger.GrossTotal)
        this.VendorLedger.GrossTotal += item.Total;
      else
        this.VendorLedger.GrossTotal = item.Total;

    } else if (item.UnitPrice == "") {
      this.VendorLedger.GrossTotal -= item.Total;
      if (!this.VendorLedger.GrossTotal) this.VendorLedger.GrossTotal = null;
      item.Total = null;
    }
  }


  QuantityGodown(item: any) {

    if (item.Quantity && item.UnitPrice) {

      if (item.Total) {
        this.VendorLedger.GrossTotal -= item.Total;
        return;
      }

      var result = item.UnitPrice * item.Quantity;
      item.Total = Math.round(result * 100) / 100;

      if (this.VendorLedger.GrossTotal)
        this.VendorLedger.GrossTotal += item.Total;
      else
        this.VendorLedger.GrossTotal = item.Total;

    } else if (item.UnitPrice == "") {
      this.VendorLedger.GrossTotal -= item.Total;
      if (!this.VendorLedger.GrossTotal) this.VendorLedger.GrossTotal = null;
      item.Total = null;
    }
  }




  Back() {
    this.router.navigate(['/vendorledger-list']);
  }

}
