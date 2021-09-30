import { Component, OnInit } from '@angular/core';
import { ReturnInvoice } from 'src/app/_models/returninvoice';
import { Router, ActivatedRoute } from '@angular/router';
import { ReturninviceService } from 'src/app/_services/returninvice.service';
import swal from 'sweetalert';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-return-invoice-add',
  templateUrl: './return-invoice-add.component.html',
  styleUrls: ['./return-invoice-add.component.css']
})
export class ReturnInvoiceAddComponent implements OnInit {

  ViewMode: boolean = false;
  AddMode: boolean = false;
  ShowData: boolean = false;
  ReturnInvoice: ReturnInvoice = new ReturnInvoice();

  constructor( private router: Router, private returnInvoiceService: ReturninviceService,
    private route: ActivatedRoute, private spinner: NgxSpinnerService) {

    this.route.data.subscribe(data => {
      if (data.param) {
        if (data.param === 'View') {
          this.ReturnInvoice = this.returnInvoiceService.getData();
          this.ViewMode = true;
          this.AddMode = false;
          this.ShowData = true;
        } else if (data.param === 'Add') {
          this.ViewMode = false;
          this.AddMode = true;
        }
      }
    });

  }

  ngOnInit() {
  }

  GetInvoiceData() {
    if (!this.ReturnInvoice.InvoiceNumber) {
      swal('','Please provide valid Invoice Number','error');
      return;
    }

    this.returnInvoiceService.getInvoiceDetails(this.ReturnInvoice.InvoiceNumber).subscribe(
      (data: any) => {
        console.log(data);

        if (data && data.length > 0) {
          this.ReturnInvoice.InvoiceDate = data[0].InvoiceDate;
          this.ReturnInvoice.InvoiceNumber = data[0].InvoiceNumber;
          this.ReturnInvoice.TotalPayment = data[0].TotalPayment;
          this.ReturnInvoice.Discount = data[0].Discount;
          this.ReturnInvoice.DiscountAmount = data[0].DiscountAmount;
          this.ReturnInvoice.NetAmount = data[0].NetAmount;
          this.ReturnInvoice.PaymentDone = data[0].PaymentDone;
          this.ReturnInvoice.PaymentDue = data[0].PaymentDue;
          this.ReturnInvoice.Company = data[0].Company.CompanyName;
          this.ReturnInvoice.ProductInventoryList = data[0].ProductInventoryList;
          this.ShowData = true;
        } else {
          swal('','No record found', 'info');
          this.ShowData = false;
        }
      },
      error => {
        swal('',error.error.message, 'error');
        this.ShowData = false;
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
          this.ReturnInvoice.CreatedBy = currentUser.UserId;
          this.ReturnInvoice.CreatedDate = new Date();
          this.returnInvoiceService.add(item).subscribe(
            () => {
              this.spinner.hide();
              swal("", "Return Invoice Generate Successfully", "success")
              .then(() => {
                this.router.navigate(['/return-invoice-list']);
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
    this.router.navigate(['/return-invoice-list']);
  }
}
