// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-addgrade',
//   templateUrl: './addgrade.component.html',
//   styleUrls: ['./addgrade.component.css']
// })
// export class AddgradeComponent implements OnInit {

//   constructor() { }

//   ngOnInit() {
//   }

// }



import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AddGrade } from 'src/app/_models/addgrade';
import swal from 'sweetalert';
import { AddgradeService} from 'src/app/_services/addgrade.service';


@Component({
  selector: 'app-addgrade',
  templateUrl: './addgrade.component.html',
  styleUrls: ['./addgrade.component.css']
})
export class AddgradeComponent implements OnInit {

  AddGrade: AddGrade = new AddGrade();
  AddMode: boolean = false;
  ViewMode: boolean = false;
  EditMode: boolean = false;
  DeleteMode: boolean = false;

  constructor(private router: Router, private addgradeService: AddgradeService,
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
          this.AddGrade = this.addgradeService.getData();
          this.EditMode = true;
          this.DeleteMode = false;
          this.ViewMode = false;
          this.AddMode = false;

        } else if (data.param === 'Delete') {
          this.AddGrade = this.addgradeService.getData();
          this.EditMode = false;
          this.DeleteMode = true;
          this.ViewMode = false;
          this.AddMode = false;
        } else if (data.param === 'View') {
          this.AddGrade = this.addgradeService.getData();
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
          this.AddGrade.GradeName.trim();
          var currentUser = JSON.parse(localStorage.getItem('currentUser'));
          this.AddGrade.CreatedBy = currentUser.UserId;
          this.AddGrade.CreatedDate = new Date();
          this.addgradeService.add(item).subscribe(
            () => {
              swal("", "Record Add Successfully", "success")
                .then(() => {
                  this.router.navigate(['/addgrade-list']);
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
          this.AddGrade.GradeName.trim();
          var currentUser = JSON.parse(localStorage.getItem('currentUser'));
          this.AddGrade.ModifiedBy = currentUser.UserId;
          this.AddGrade.ModifiedDate = new Date();
          this.AddGrade.CreatedDate = new Date(this.AddGrade.CreatedDate);
          this.addgradeService.update(item._id, item).subscribe(
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

          this.addgradeService.delete(item._id, item).subscribe(
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
    this.router.navigate(['/addgrade-list']);
  }

}
