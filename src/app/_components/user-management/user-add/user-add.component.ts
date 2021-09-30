// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-user-add',
//   templateUrl: './user-add.component.html',
//   styleUrls: ['./user-add.component.css']
// })
// export class UserAddComponent implements OnInit {

//   constructor() { }

//   ngOnInit() {
//   }

// }

import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/_services';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/_models';
import swal from 'sweetalert';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent implements OnInit {

  User: User = new User();
  AddMode: boolean = false;
  ViewMode: boolean = false;
  EditMode: boolean = false;
  DeleteMode: boolean = false;
  RightsList: any = ['Add', 'Edit', 'Delete', 'View'];
  AgentType: any = ['User', 'Agent'];


  constructor( private router: Router, private userService: UserService,
    private route: ActivatedRoute, private spinner: NgxSpinnerService) {
    this.route.data.subscribe(data => {
      if (data.param) {
        if (data.param === 'Add') {
          this.EditMode = false;
          this.DeleteMode = false;
          this.ViewMode = false;
          this.AddMode = true;
        }
        else if (data.param === 'Edit') {
          this.User = this.userService.getData();
          this.EditMode = true;
          this.DeleteMode = false;
          this.ViewMode = false;
          this.AddMode = false;

        } else if (data.param === 'Delete') {
          this.User = this.userService.getData();
          this.EditMode = false;
          this.DeleteMode = true;
          this.ViewMode = false;
          this.AddMode = false;
        } else if (data.param === 'View') {
          this.User = this.userService.getData();
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
          this.spinner.show()
          this.User.UserId.trim();
          this.User.Password.trim();
          var currentUser = JSON.parse(localStorage.getItem('currentUser'));
          this.User.CreatedBy = currentUser.UserId;
          this.userService.add(item).subscribe(
            () => {
              this.spinner.hide();
              swal("", "New User Add Successfully", "success")
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
          this.User.UserId.trim();
          this.User.Password.trim();
          var currentUser = JSON.parse(localStorage.getItem('currentUser'));
          this.User.ModifiedBy = currentUser.UserId;
          this.userService.update(item._id, item).subscribe(
            () => {
              this.spinner.hide();
              swal("", "User Update Successfully", "success")
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
          this.userService.delete(item._id, item).subscribe(
            () => {
              this.spinner.hide();
              swal("", "User Delete Successfully", "success")
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
    this.router.navigate(['/user-list']);
  }

}

