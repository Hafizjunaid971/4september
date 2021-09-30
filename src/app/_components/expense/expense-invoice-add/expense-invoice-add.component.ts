import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert';
import { ExpenseService } from 'src/app/_services/expense.service';
import { ExpenseInvoice } from 'src/app/_models/expense';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-expense-invoice-add',
  templateUrl: './expense-invoice-add.component.html',
  styleUrls: ['./expense-invoice-add.component.css']
})
export class ExpenseInvoiceAddComponent implements OnInit {

  ExpenseInvoice: ExpenseInvoice = new ExpenseInvoice();
  expenseList: any = [];
  debitCreditList: any = ['Debit', 'Credit'];
  vendor: any;
  config = {
    format: "YYYY-MM-DD", drops: 'down', opens: 'right',
  };

  constructor(private expenseService: ExpenseService, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.expenseService.getAllExpense().subscribe(
      data => {
        this.expenseList = data;
      },
      error => {
        console.log(error.error.message, 'Error Fetching Vendor List');
      });
  }

  Save(item: any) {
    this.spinner.show();
    this.ExpenseInvoice.Date = new Date(this.ExpenseInvoice.Date);
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.ExpenseInvoice.CreatedBy = currentUser.UserId;
    this.ExpenseInvoice.CreatedDate = new Date();
    this.expenseService.addexpenseinvoice(item).subscribe(
      () => {
        this.spinner.hide();
        swal("", "Record Add Successfully", "success");
        this.ExpenseInvoice = new ExpenseInvoice();
      },
      error => {
        this.spinner.hide();
        console.log(error.error.message, 'Error');
      });
  }

}
