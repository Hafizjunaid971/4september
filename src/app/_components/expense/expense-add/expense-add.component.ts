import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Expense } from 'src/app/_models/expense';
import swal from 'sweetalert';
import { ExpenseService } from 'src/app/_services/expense.service';

@Component({
  selector: 'app-expense-add',
  templateUrl: './expense-add.component.html',
  styleUrls: ['./expense-add.component.css']
})
export class ExpenseAddComponent implements OnInit {

  Expense: Expense = new Expense();
  AddMode: boolean = false;
  ViewMode: boolean = false;
  EditMode: boolean = false;
  DeleteMode: boolean = false;

  constructor(private router: Router, private expenseService: ExpenseService,
    private route: ActivatedRoute) {
    this.route.data.subscribe(data => {
      if (data.param) {
        if (data.param === 'Add') {
          this.EditMode = false;
          this.DeleteMode = false;
          this.ViewMode = false;
          this.AddMode = true;
        }
        else if (data.param === 'Edit') {
          this.Expense = this.expenseService.getData();
          this.EditMode = true;
          this.DeleteMode = false;
          this.ViewMode = false;
          this.AddMode = false;

        } else if (data.param === 'Delete') {
          this.Expense = this.expenseService.getData();
          this.EditMode = false;
          this.DeleteMode = true;
          this.ViewMode = false;
          this.AddMode = false;
        } else if (data.param === 'View') {
          this.Expense = this.expenseService.getData();
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
          this.Expense.Expense.trim();
          var currentUser = JSON.parse(localStorage.getItem('currentUser'));
          this.Expense.CreatedBy = currentUser.UserId;
          this.Expense.CreatedDate = new Date();
          this.expenseService.add(item).subscribe(
            () => {
              swal("", "Record Add Successfully", "success")
                .then(() => {
                  this.router.navigate(['/dashboard']);
                });
            },
            error => {
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
          this.Expense.Expense.trim();
          var currentUser = JSON.parse(localStorage.getItem('currentUser'));
          this.Expense.ModifiedBy = currentUser.UserId;
          this.Expense.ModifiedDate = new Date();
          this.Expense.CreatedDate = new Date(this.Expense.CreatedDate);
          this.expenseService.update(item._id, item).subscribe(
            () => {
              swal("", "Record Update Successfully", "success")
                .then(() => {
                  this.router.navigate(['/dashboard']);
                });
            },
            error => {
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

          this.expenseService.delete(item._id, item).subscribe(
            () => {
              swal("", "Record Delete Successfully", "success")
                .then(() => {
                  this.router.navigate(['/dashboard']);
                });
            },
            error => {
              console.log(error.error.message, 'Error');
            });
        }
      });
  }

  Back() {
    this.router.navigate(['/expense-list']);
  }

}
