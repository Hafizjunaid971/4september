import { Component, OnInit } from '@angular/core';
import { PurchaseInvoice, Details } from 'src/app/_models/purchaseinvoice';
import { PurchaseinvoiceService } from 'src/app/_services/purchaseinvoice.service';
import { VendorService } from 'src/app/_services/vendor.service';
import { NgxSpinnerService } from 'ngx-spinner';
import swal from 'sweetalert';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-puchase-invoice-add',
  templateUrl: './puchase-invoice-add.component.html',
  styleUrls: ['./puchase-invoice-add.component.css']
})
export class PuchaseInvoiceAddComponent implements OnInit {

  PurchaseInvoice: PurchaseInvoice = new PurchaseInvoice();
  ViewMode: boolean = false;
  EditMode: boolean = false;
  DeleteMode: boolean = false;
  AddMode: boolean = false;
  vendorList: any = [];
  debitCreditList: any = ['Debit', 'Credit'];
  vendor: any;
  config = {
    format: "DD/MM/YYYY", drops: 'down', opens: 'right',
  };

  constructor(private PurchaseInvoiceService: PurchaseinvoiceService, private spinner: NgxSpinnerService, private vendorService: VendorService,
    private router: Router, private route: ActivatedRoute) {
    this.route.data.subscribe(data => {
      if (data.param) {
        if (data.param === 'Add') {
          this.PurchaseInvoice.Details = [];
          this.PurchaseInvoice.Details[0] = new Details();
          this.EditMode = false;
          this.DeleteMode = false;
          this.ViewMode = false;
          this.AddMode = true;
        }
        else if (data.param === 'Edit') {
          this.PurchaseInvoice = this.PurchaseInvoiceService.getData();
          this.EditMode = true;
          this.DeleteMode = false;
          this.ViewMode = false;
          this.AddMode = false;

        } else if (data.param === 'Delete') {
          this.PurchaseInvoice = this.PurchaseInvoiceService.getData();
          this.EditMode = false;
          this.DeleteMode = true;
          this.ViewMode = false;
          this.AddMode = false;
        } else if (data.param === 'View') {
          this.PurchaseInvoice = this.PurchaseInvoiceService.getData();
          this.EditMode = false;
          this.DeleteMode = false;
          this.ViewMode = true;
          this.AddMode = false;
        }
      }
    });
  }

  ngOnInit() {
    this.vendorService.getAllVendor().subscribe(
      data => {
        this.vendorList = data;
      },
      error => {
        console.log(error.error.message, 'Error Fetching Vendor List');
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
          this.spinner.show();
          var currentUser = JSON.parse(localStorage.getItem('currentUser'));
          this.PurchaseInvoice.Date = new Date(this.PurchaseInvoice.Date);
          this.PurchaseInvoice.CreatedBy = currentUser.UserId;
          this.PurchaseInvoice.CreatedDate = new Date();
          this.PurchaseInvoiceService.add(item).subscribe(
            () => {
              this.spinner.hide();
              swal("", "Record Add Successfully", "success")
                .then(() => {
                  this.router.navigate(['/dashboard']);
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
          var currentUser = JSON.parse(localStorage.getItem('currentUser'));
          this.PurchaseInvoice.Date = new Date(this.PurchaseInvoice.Date);
          this.PurchaseInvoice.ModifiedBy = currentUser.UserId;
          this.PurchaseInvoice.ModifiedDate = new Date();
          this.PurchaseInvoice.CreatedDate = new Date(this.PurchaseInvoice.CreatedDate);
          this.PurchaseInvoiceService.update(item._id, item).subscribe(
            () => {
              this.spinner.hide();
              swal("", "Record Update Successfully", "success")
                .then(() => {
                  this.router.navigate(['/dashboard']);
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
          this.PurchaseInvoiceService.delete(item._id, item).subscribe(
            () => {
              this.spinner.hide();
              swal("", "Record Delete Successfully", "success")
                .then(() => {
                  this.router.navigate(['/dashboard']);
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
    this.router.navigate(['/purchaseinvoice-list']);
  }

  AddDetails() {
    const newItem = new Details();
    this.PurchaseInvoice.Details.push(newItem);
  }

  RemoveDetails(item: any, i: any) {
    if (this.PurchaseInvoice.Details.length > 1) {
      this.CalculateTotal(item);
      this.PurchaseInvoice.Details.splice(i, 1);
    } else {
      swal('', "One Item Detail is required", 'info');
    }
  }

  ValidateItemName(item: any, index: any) {
    for (let i = 0; i < this.PurchaseInvoice.Details.length; i++) {
      var value = this.PurchaseInvoice.Details[i].ItemName;
      if (value == item.ItemName && i != index) {
        swal('', 'Item Name already inputted', 'error');
        item.ItemName = null;
        return;
      }
    }
  }

  CalculateTotal(item: any) {

    if (item.Quantity && item.UnitPrice) {

      if (item.Total) {
        this.PurchaseInvoice.GrossTotal -= item.Total;
        return;
      }

      var result = item.UnitPrice * item.Quantity;
      item.Total = Math.round(result * 100) / 100;

      if (this.PurchaseInvoice.GrossTotal)
        this.PurchaseInvoice.GrossTotal += item.Total;
      else
        this.PurchaseInvoice.GrossTotal = item.Total;

    } else if (item.UnitPrice == "") {
      this.PurchaseInvoice.GrossTotal -= item.Total;
      if (!this.PurchaseInvoice.GrossTotal) this.PurchaseInvoice.GrossTotal = null;
      item.Total = null;
    }
  }

}
