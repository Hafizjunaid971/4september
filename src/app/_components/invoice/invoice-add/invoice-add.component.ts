import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { InvoiceService } from 'src/app/_services/invoice.service';
import { Invoice, ProductInventory } from 'src/app/_models/invoice';
import { CustomerService } from 'src/app/_services/customer.service';
import { DatePipe } from '@angular/common';
import swal from 'sweetalert';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-invoice-add',
  templateUrl: './invoice-add.component.html',
  styleUrls: ['./invoice-add.component.css']
})
export class InvoiceAddComponent implements OnInit {

  ViewMode: boolean = false;
  EditMode: boolean = false;
  DeleteMode: boolean = false;
  AddMode: boolean = false;
  Invoice: Invoice = new Invoice();
  companyList: any = [];
  ProductInventory: ProductInventory = new ProductInventory();
  ProductInventoryList: Array<ProductInventory> = [];
  productList: any = [];
  CodeList: any = [];
  config = {
    format: "DD-MM-YYYY", drops: 'down', opens: 'right',
  };

  constructor(private router: Router, private invoiceService: InvoiceService, private spinner: NgxSpinnerService,
    private route: ActivatedRoute, private customerService: CustomerService, private datePipe: DatePipe) {
    this.route.data.subscribe(data => {
      if (data.param) {
        if (data.param === 'Add') {
          this.EditMode = false;
          this.DeleteMode = false;
          this.ViewMode = false;
          this.AddMode = true;

          var today = new Date();
          var dd = String(today.getDate()).padStart(2, '0');
          var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
          var yyyy = today.getFullYear();
          var timestamp = new Date().getUTCMilliseconds();
          this.Invoice.InvoiceDate = this.datePipe.transform(new Date(), "dd-MM-yyyy");
          this.Invoice.InvoiceNumber = dd + mm + yyyy + '-' + timestamp;
          this.Invoice.ProductInventoryList = [];
          this.Invoice.ProductInventoryList[0] = new ProductInventory();

          /* Get Customer List */
          this.customerService.getAllCustomer().subscribe(
            data => {
              this.companyList = data;
            },
            error => {
              console.log(error.error.message, 'Error Fetching Customer List');
            });

          /* Get Product Price List */
          this.invoiceService.getAllProduct().subscribe(
            data => {
              this.productList = data;
            },
            error => {
              console.log(error.error.message, 'Error Fetching Product List');
            });
        }
        else if (data.param === 'Edit') {
          this.Invoice = this.invoiceService.getData();
          this.EditMode = true;
          this.DeleteMode = false;
          this.ViewMode = false;
          this.AddMode = false;
        } else if (data.param === 'Delete') {
          this.Invoice = this.invoiceService.getData();
          this.EditMode = false;
          this.DeleteMode = true;
          this.ViewMode = false;
          this.AddMode = false;
        } else if (data.param === 'View') {
          this.Invoice = this.invoiceService.getData();
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
          if (this.Invoice.NetAmount - this.Invoice.PaymentDone > 0) {
            this.Invoice.IsInvoiceFullyPaid = false;
          } else {
            this.Invoice.IsInvoiceFullyPaid = true;
          }
          var currentUser = JSON.parse(localStorage.getItem('currentUser'));
          this.Invoice.CreatedBy = currentUser.UserId;
          this.Invoice.CreatedDate = new Date();
          this.invoiceService.add(item).subscribe(
            () => {
              this.spinner.hide();
              swal("", "Invoice Generate Successfully", "success")
                .then(() => {
                  this.router.navigate(['/invoice-list']);
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
          if (this.Invoice.NetAmount - this.Invoice.PaymentDone > 0) {
            this.Invoice.IsInvoiceFullyPaid = false;
          } else {
            this.Invoice.IsInvoiceFullyPaid = true;
          }
          var currentUser = JSON.parse(localStorage.getItem('currentUser'));
          this.Invoice.ModifiedBy = currentUser.UserId;
          this.Invoice.ModifiedDate = new Date();
          this.Invoice.CreatedDate = new Date(this.Invoice.CreatedDate);
          this.invoiceService.update(item._id, item).subscribe(
            () => {
              this.spinner.hide();
              swal("", "Invoice Update Successfully", "success")
                .then(() => {
                  this.router.navigate(['/invoice-list']);
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
          
          if (this.Invoice.NetAmount - this.Invoice.PaymentDone > 0) {
            swal("Invoice Payment is due", "You can't delete this invoice", "error");
            return;
          }
		  this.spinner.show();
          this.invoiceService.delete(item._id, item).subscribe(
            () => {
              this.spinner.hide();
              swal("", "Invoice Delete Successfully", "success")
                .then(() => {
                  this.router.navigate(['/invoice-list']);
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
    this.router.navigate(['/invoice-list']);
  }

  CalculatePaymentDue(invoice: any) {
    if (this.Invoice.NetAmount && this.Invoice.PaymentDone) {
      if (this.Invoice.PaymentDone > this.Invoice.NetAmount) {
        swal("", "Payment Done can not be greater than Net Amount", "error");
        this.Invoice.PaymentDone = null;
        this.Invoice.PaymentDue = null;
        return;
      }
      var result = this.Invoice.NetAmount - this.Invoice.PaymentDone;
      this.Invoice.PaymentDue = Math.round(result * 100) / 100;
    }
    else {
      this.Invoice.PaymentDone = null;
    }
  }

  AddProductInventoryListPanel() {
    const newItem = new ProductInventory();
    this.Invoice.ProductInventoryList.push(newItem);
    this.Invoice.PaymentDone = null;
    this.Invoice.PaymentDue = null;
  }

  RemoveProductInventoryListPanel(item: any, i: any) {
    if (this.Invoice.ProductInventoryList.length > 1) {
      if (item.Total)
        this.Invoice.TotalPayment -= item.Total;
      if (!this.Invoice.TotalPayment) this.Invoice.TotalPayment = null;
      this.Invoice.ProductInventoryList.splice(i, 1);
      this.CalculateNetAmount();
      this.Invoice.PaymentDone = null;
      this.Invoice.PaymentDue = null;
    } else {
      swal("","One Product Details is required","info");
    }
  }

  getCodeAgainstProduct(item: any) {
    if (!item.Product) {
      this.Invoice.TotalPayment -= item.Total;
      if (!this.Invoice.TotalPayment) this.Invoice.TotalPayment = null;
      this.CodeList = null;
      item.Code = null;
      item.Category = null;
      item.Variety = null;
      item.Size = null;
      item.Packing = null;
      item.TP = null;
      item.UnitPrice = null;
      item.InInventory = null;
      item.NoOfUnits = null;
      item.Total = null;
    }
    this.invoiceService.getCodeAgainstProduct(item.Product).subscribe(
      data => {
        if (Object.keys(data).length > 0) {
          item.Category = null;
          item.Variety = null;
          item.Size = null;
          item.Packing = null;
          item.TP = null;
          item.UnitPrice = null;
          item.InInventory = null;
          item.NoOfUnits = null;
          item.Total = null;
          this.CodeList = data;
        }
      },
      error => {
        console.log(error.error.message, 'Error');
      });
  }

  getProductDetailsAgainstCode(item: any, index: any) {

    if (!item.Code) {
      this.Invoice.TotalPayment -= item.Total;
      if (!this.Invoice.TotalPayment) this.Invoice.TotalPayment = null;

      item.Category = null;
      item.Variety = null;
      item.Size = null;
      item.Packing = null;
      item.TP = null;
      item.UnitPrice = null;
      item.InInventory = null;
      item.NoOfUnits = null;
      item.Total = null;
      return;
    }

    for (let i = 0; i < this.Invoice.ProductInventoryList.length; i++) {
      var value = this.Invoice.ProductInventoryList[i].Code;
      if (value == item.Code && i != index) {
        swal('','Code already selected', 'error');
        return;
      }
    }

    this.invoiceService.getProductDetailsAgainstCode(item.Code).subscribe(
      data => {
        if (Object.keys(data).length > 0) {
          item.Category = data[0].Category;
          item.Variety = data[0].Variety;
          item.Size = data[0].Size;
          item.Packing = data[0].Packing;
          item.TP = data[0].TP;
          item.UnitPrice = data[0].UnitPrice;
          item.InInventory = data[0].InInventory;
          if (item.InInventory == 0) {
            swal('','Selected product category variety is not available in Inventory', 'info');
          }
          item.NoOfUnits = null;
          item.Total = null;
        }

      },
      error => {
        console.log(error.error.message, 'Error');
      });
  }

  CalculateTotal(item: any) {
    if (item.InInventory == 0) {
      swal('','Select product is not available in Inventory', 'error');
      item.NoOfUnits = null;
      return;
    }
    if (item.NoOfUnits && item.TP && item.InInventory) {

      if (item.NoOfUnits > item.InInventory) {
        swal('','Following product units are less in inventory than the no. of units entered', 'error');
        item.NoOfUnits = null;
        return;
      }

      this.Invoice.TotalPayment -= item.Total;

      var result = item.NoOfUnits * item.TP;
      item.Total = Math.round(result * 100) / 100;

      if (this.Invoice.TotalPayment)
        this.Invoice.TotalPayment += item.Total;
      else
        this.Invoice.TotalPayment = item.Total;
    } else if (item.NoOfUnits == "") {
      this.Invoice.TotalPayment -= item.Total;
      if (!this.Invoice.TotalPayment) this.Invoice.TotalPayment = null;
      item.Total = null;
    }
  }

  GetPaymentDueStatus(company: any) {
    this.invoiceService.getPaymentDueStatus(company.CompanyName).subscribe(data => {
      if (data) {
        let dto: any;
        dto = data;
        if (dto.PaymentDue) {
          swal(`Selected customer has payment due of Invoice No. ${dto.InvoiceNumber}`, 'Please see details in Customer Invoices', 'info');
        }
      }
    });
  }

  CalculateNetAmount() {
    if (this.Invoice.TotalPayment && this.Invoice.Discount) {
      var result = (this.Invoice.TotalPayment * this.Invoice.Discount) / 100;
      this.Invoice.DiscountAmount = Math.round(result * 100) / 100;
      this.Invoice.NetAmount = this.Invoice.TotalPayment - this.Invoice.DiscountAmount;

    } else {
      this.Invoice.Discount = null;
      this.Invoice.DiscountAmount = null;
      this.Invoice.NetAmount = null;
    }
  }
}
