import { Component, OnInit } from '@angular/core';
import { Vendor } from 'src/app/_models/vendor';
import {Product} from 'src/app/_models/product'
import { PriceListService} from 'src/app/_services/price-list.service';

import { Router, ActivatedRoute } from '@angular/router';
import { VendorService } from 'src/app/_services/vendor.service';
import {ProductService} from 'src/app/_services/product.service';
import swal from 'sweetalert';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-vendor-add',
  templateUrl: './vendor-add.component.html',
  styleUrls: ['./vendor-add.component.css']
})
export class VendorAddComponent implements OnInit {

  Vendor: Vendor = new Vendor();
  AddMode: boolean = false;
  ViewMode: boolean = false;
  EditMode: boolean = false;
  DeleteMode: boolean = false;
  productList: any = [];
  ShowTable: boolean = false;
  VendorDeals: any = [];
  priceList: any = [];


  constructor( private router: Router, private vendorService: VendorService, private productservices: ProductService,
    private route: ActivatedRoute, private pricelistservice: PriceListService, private spinner: NgxSpinnerService) {
    this.route.data.subscribe(data => {
      if (data.param) {
        if (data.param === 'Add') {
          this.EditMode = false;
          this.DeleteMode = false;
          this.ViewMode = false;
          this.AddMode = true;
        }
        else if (data.param === 'Edit') {
          this.Vendor = this.vendorService.getData();
          this.EditMode = true;
          this.DeleteMode = false;
          this.ViewMode = false;
          this.AddMode = false;

        } else if (data.param === 'Delete') {
          this.Vendor = this.vendorService.getData();
          this.EditMode = false;
          this.DeleteMode = true;
          this.ViewMode = false;
          this.AddMode = false;
        } else if (data.param === 'View') {
          this.Vendor = this.vendorService.getData();
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
    this.productservices.getAllProduct().subscribe(
      data => {
        this.productList = data;
      },
      error => {
        console.log(error.error.message, 'Error Fetching Vendor List');
      });

      this.pricelistservice.getAllPriceList().subscribe(
        data => {
          this.priceList = data;
          this.priceList.priceListDetails = data;
        },
        error => {
          console.log(error.error.message, 'Error fetching Price List')
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
          this.Vendor.Name.trim();
          this.Vendor.CompanyName.trim();
          var currentUser = JSON.parse(localStorage.getItem('currentUser'));
          this.Vendor.CreatedBy = currentUser.UserId;
          this.Vendor.CreatedDate = new Date();
          this.vendorService.add(item).subscribe(
            () => {
              this.spinner.hide();
              swal("", "Record Add Successfully", "success")
                .then(() => {
                  this.router.navigate(['/vendor-list']);
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
          this.Vendor.Name.trim();
          var currentUser = JSON.parse(localStorage.getItem('currentUser'));
          this.Vendor.ModifiedBy = currentUser.UserId;
          this.Vendor.ModifiedDate = new Date();
          this.Vendor.CreatedDate = new Date(this.Vendor.CreatedDate);
          this.vendorService.update(item._id, item).subscribe(
            () => {
              this.spinner.hide();
              swal("", "Record Update Successfully", "success")
                .then(() => {
                  this.router.navigate(['/vendor-list']);
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
          this.vendorService.delete(item._id, item).subscribe(
            () => {
              this.spinner.hide();
              swal("", "Record Delete Successfully", "success")
                .then(() => {
                  this.router.navigate(['/vendor-list']);
                });
            },
            error => {
              this.spinner.hide();
              console.log(error.error.message, 'Error');
            });
        }
      });
  }
  getCodeAgainstProduct(){

  }


  SetProductType(item: any) {
    if (item.VendorDealsIn) {


        this.productservices.getAllProduct().subscribe((data: any) => {
          if (data.length > 0) {
            this.productList = data;
          }
        }, error => {
          console.log(error.error.message);
        });

    } else {
      item.VehicleAccount = null;
      item.VehicleNo = null;
    }
  }

  // GetPriceList(item: any) {
  //   this.productservices.checkProductAlreadyAdded(item.Name.Name).subscribe(
  //     data => {
  //       if (Object.keys(data).length > 0) {
  //         swal('Selected product inventory already added', 'Please use Edit option to add another product category', 'info');
  //         return;
  //       } else {
  //         this.VendorDeals = item.Name.VendorDealsIn;
  //       }
  //     });
  // }

  Back() {
    this.router.navigate(['/vendor-list']);
  }

}
