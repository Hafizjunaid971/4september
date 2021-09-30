import { Component, OnInit } from '@angular/core';
import { PriceList, PriceListDetails } from 'src/app/_models/price-list';
import { Router, ActivatedRoute } from '@angular/router';
import { PriceListService } from 'src/app/_services/price-list.service';
import swal from 'sweetalert';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-price-list-add',
  templateUrl: './price-list-add.component.html',
  styleUrls: ['./price-list-add.component.css']
})
export class PriceListAddComponent implements OnInit {

  PriceList: PriceList = new PriceList();
  PriceListDetails: Array<PriceListDetails> = [];
  ViewMode: boolean = false;
  EditMode: boolean = false;
  DeleteMode: boolean = false;
  AddMode: boolean = false;

  constructor(private router: Router, private pricelistService: PriceListService,
    private spinner: NgxSpinnerService,private route: ActivatedRoute) {
    this.route.data.subscribe(data => {
      if (data.param) {
        if (data.param === 'Add') {
          this.EditMode = false;
          this.DeleteMode = false;
          this.ViewMode = false;
          this.AddMode = true;
          this.PriceListDetails[0] = new PriceListDetails();
        }
        else if (data.param === 'Edit') {
          this.PriceList = this.pricelistService.getData();
          this.PriceListDetails = this.PriceList.PriceListDetails;
          this.EditMode = true;
          this.DeleteMode = false;
          this.ViewMode = false;
          this.AddMode = false;
        } else if (data.param === 'Delete') {
          this.PriceList = this.pricelistService.getData();
          this.PriceListDetails = this.PriceList.PriceListDetails;
          this.EditMode = false;
          this.DeleteMode = true;
          this.ViewMode = false;
          this.AddMode = false;
        } else if (data.param === 'View') {
          this.PriceList = this.pricelistService.getData();
          this.PriceListDetails = this.PriceList.PriceListDetails;
          this.EditMode = false;
          this.DeleteMode = false;
          this.ViewMode = true;
          this.AddMode = false;
        }
      }
    });
  }

  ngOnInit() {
  }

  AddPriceListDetails() {
    const newItem = new PriceListDetails();
    this.PriceListDetails.push(newItem);
  }

  RemovePriceListDetails(i: any) {
    if (this.PriceListDetails.length > 1) {
      this.PriceListDetails.splice(i, 1);
    } else {
      swal('',"One Product Details is required",'info');
    }
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
          this.spinner.show();
          this.PriceList.Name = this.PriceList.Name.trim();
          var currentUser = JSON.parse(localStorage.getItem('currentUser'));
          this.PriceList.CreatedBy = currentUser.UserId;
          this.PriceList.CreatedDate = new Date();
          this.PriceList.PriceListDetails = this.PriceListDetails;
          this.pricelistService.add(item).subscribe(
            () => {
              this.spinner.hide();
              swal("", "Record Add Successfully", "success")
                .then(() => {
                  this.router.navigate(['/price-list']);
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

      text: "Are you sure to update this record?",
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
          this.PriceList.Name = this.PriceList.Name.trim();
          var currentUser = JSON.parse(localStorage.getItem('currentUser'));
          this.PriceList.ModifiedBy = currentUser.UserId;
          this.PriceList.ModifiedDate = new Date();
          this.PriceList.CreatedDate = new Date(this.PriceList.CreatedDate);
          this.PriceList.PriceListDetails = this.PriceListDetails;
          this.pricelistService.update(item._id, item).subscribe(
            () => {
              this.spinner.hide();
              swal("", "Record Update Successfully", "success")
                .then(() => {
                  this.router.navigate(['/price-list']);
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

      text: "Are you sure to delete this record?",
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
          this.PriceList.PriceListDetails = this.PriceListDetails;
          this.pricelistService.delete(item._id, item).subscribe(
            () => {
              this.spinner.hide();
              swal("", "Record Delete Successfully", "success")
                .then(() => {
                  this.router.navigate(['/price-list']);
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
    this.router.navigate(['/price-list']);
  }

  validateProductName(product: any) {
    this.pricelistService.validateProductName(product).subscribe(
      data => {
        if (Object.keys(data).length > 0) {
          var productName = data[0].Name.toUpperCase();
          var product = this.PriceList.Name.toUpperCase();
          if (productName == product) {
            swal('', 'Product Name already added', 'error');
            this.PriceList.Name = null;
          }
        }
      },
      error => {
        console.log(error.error.message, 'Error');
      });
  }

  validateProductCode(item: any, index: any) {
    for (let i = 0; i < this.PriceListDetails.length; i++) {
      var value = this.PriceListDetails[i].Code;
      if (value == item.Code && i != index) {
        swal('', 'Duplicate Product code not allowed', 'error');
        item.Code = null;
        return;
      }
    }

    this.pricelistService.validateProductCode(item.Code).subscribe(
      data => {
        if (Object.keys(data).length > 0) {
          swal('', 'Duplicate Product code not allowed', 'error');
          item.Code = null;
        }
      },
      error => {
        console.log(error.error.message, 'Error');
      });
  }

}
