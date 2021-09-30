// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-godown-add',
//   templateUrl: './godown-add.component.html',
//   styleUrls: ['./godown-add.component.css']
// })
// export class GodownAddComponent implements OnInit {

//   constructor() { }

//   ngOnInit() {
//   }

// }


import { Component, OnInit } from '@angular/core';
import { GodownSetup } from 'src/app/_models/godownsetup';

import { Router, ActivatedRoute } from '@angular/router';
import { GodownsetupService } from 'src/app/_services/godownsetup.service';
import swal from 'sweetalert';
import { NgxSpinnerService } from 'ngx-spinner';

 @Component({
   selector: 'app-godown-add',
   templateUrl: './godown-add.component.html',
   styleUrls: ['./godown-add.component.css']
 })
 export class GodownAddComponent implements OnInit {

  GodownSetup: GodownSetup = new GodownSetup();
  AddMode: boolean = false;
  ViewMode: boolean = false;
  EditMode: boolean = false;
  DeleteMode: boolean = false;

  constructor( private router: Router, private godownService: GodownsetupService,
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
          this.GodownSetup = this.godownService.getData();
          this.EditMode = true;
          this.DeleteMode = false;
          this.ViewMode = false;
          this.AddMode = false;

        } else if (data.param === 'Delete') {
          this.GodownSetup = this.godownService.getData();
          this.EditMode = false;
          this.DeleteMode = true;
          this.ViewMode = false;
          this.AddMode = false;
        } else if (data.param === 'View') {
          this.GodownSetup = this.godownService.getData();
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
          this.GodownSetup.GDName.trim();
          var currentUser = JSON.parse(localStorage.getItem('currentUser'));
          this.GodownSetup.CreatedBy = currentUser.UserId;
          this.GodownSetup.CreatedDate = new Date();
          this.godownService.add(item).subscribe(
            () => {
              this.spinner.hide();
              swal("", "Record Add Successfully", "success")
                .then(() => {
                  this.router.navigate(['/godownsetup-list']);
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
          this.GodownSetup.GDName.trim();
          var currentUser = JSON.parse(localStorage.getItem('currentUser'));
          this.GodownSetup.ModifiedBy = currentUser.UserId;
          this.GodownSetup.ModifiedDate = new Date();
          this.GodownSetup.CreatedDate = new Date(this.GodownSetup.CreatedDate);
          this.godownService.update(item._id, item).subscribe(
            () => {
              this.spinner.hide();
              swal("", "Record Update Successfully", "success")
                .then(() => {
                  this.router.navigate(['/godownsetup-list']);
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
          this.godownService.delete(item._id, item).subscribe(
            () => {
              this.spinner.hide();
              swal("", "Record Delete Successfully", "success")
                .then(() => {
                  this.router.navigate(['/godownsetup-list']);
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
    this.router.navigate(['/godownsetup-list']);
  }

}
