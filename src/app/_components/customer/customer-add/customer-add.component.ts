import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CustomerService } from 'src/app/_services/customer.service';
import { Customer } from 'src/app/_models/customer';
import swal from 'sweetalert';
import { InvoiceService } from 'src/app/_services/invoice.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { CommonService } from 'src/app/_services/common.service';

@Component({
  selector: 'app-customer-add',
  templateUrl: './customer-add.component.html',
  styleUrls: ['./customer-add.component.css']
})
export class CustomerAddComponent implements OnInit {

  Customer: Customer = new Customer();
  AddMode: boolean = false;
  ViewMode: boolean = false;
  EditMode: boolean = false;
  DeleteMode: boolean = false;

  constructor(private router: Router, private customerService: CustomerService,private commonService: CommonService,
    private route: ActivatedRoute, private invoiceService: InvoiceService, private spinner: NgxSpinnerService) {
    this.route.data.subscribe(data => {
      if (data.param) {
        if (data.param === 'Add') {
          this.EditMode = false;
          this.DeleteMode = false;
          this.ViewMode = false;
          this.AddMode = true;
          this.customerService.getUniqueNumber('customerno').subscribe(
            (data: any) => {
              var serial = 'CUS' + '-000' + data.data;
              this.Customer.CustomerID = serial;
            },
            error => {
              console.log(error.error.message);
            });

        }
        else if (data.param === 'Edit') {
          this.Customer = this.customerService.getData();
          this.EditMode = true;
          this.DeleteMode = false;
          this.ViewMode = false;
          this.AddMode = false;

        } else if (data.param === 'Delete') {
          this.Customer = this.customerService.getData();
          this.EditMode = false;
          this.DeleteMode = true;
          this.ViewMode = false;
          this.AddMode = false;
        } else if (data.param === 'View') {
          this.Customer = this.customerService.getData();
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
          this.Customer.Name.trim();
          var currentUser = JSON.parse(localStorage.getItem('currentUser'));
          this.Customer.CreatedBy = currentUser.UserId;



          this.customerService.add(item).subscribe(
            () => {
              this.spinner.hide();
              swal("", "Record Add Successfully", "success")
                .then(() => {
                  this.router.navigate(['/customer-list']);
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
          this.Customer.Name.trim();
          var currentUser = JSON.parse(localStorage.getItem('currentUser'));
          this.Customer.ModifiedBy = currentUser.UserId;
          this.customerService.update(item._id, item).subscribe(
            () => {
              this.spinner.hide();
              swal("", "Record Update Successfully", "success")
                .then(() => {
                  this.router.navigate(['/customer-list']);
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
          this.invoiceService.getPaymentDueStatus(this.Customer.CompanyName).subscribe(data => {
            if (data) {
              let dto: any;
              dto = data;
              if (dto.PaymentDue) {
                this.spinner.hide();
                swal("Customer has payment due", "Please see details in Customer Invoices", "error");
                return;
              } else {
                this.customerService.delete(item).subscribe(
                  () => {
                    this.spinner.hide();
                    swal("", "Record Delete Successfully", "success")
                      .then(() => {
                        this.router.navigate(['/customer-list']);
                      });
                  },
                  error => {
                    this.spinner.hide();
                    console.log(error.error.message, 'Error');
                  });
              }
            }
          });
        }
      });
  }

  Back() {
    this.router.navigate(['/customer-list']);
  }

}
