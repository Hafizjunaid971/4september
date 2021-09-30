// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-inventory-stock-add',
//   templateUrl: './inventory-stock-add.component.html',
//   styleUrls: ['./inventory-stock-add.component.css']
// })
// export class InventoryStockAddComponent implements OnInit {

//   constructor() { }

//   ngOnInit() {
//   }

// }




import { Component, OnInit } from '@angular/core';
import { AddInventoryStock } from 'src/app/_models/addinventorystock';

import { Router, ActivatedRoute } from '@angular/router';
import {AddstockinventoryService } from 'src/app/_services/addstockinventory.service';
import swal from 'sweetalert';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-inventory-stock-add',
  templateUrl: './inventory-stock-add.component.html',
  styleUrls: ['./inventory-stock-add.component.css']
})
export class InventoryStockAddComponent implements OnInit {

  AddInventoryStock: AddInventoryStock = new AddInventoryStock();
  AddMode: boolean = false;
  ViewMode: boolean = false;
  EditMode: boolean = false;
  DeleteMode: boolean = false;
  addgradeList: any = [];
  godownList: any = [];
  userList: any = [];

  constructor( private router: Router, private addstockinventoryService: AddstockinventoryService,
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
          this.AddInventoryStock = this.addstockinventoryService.getData();
          this.EditMode = true;
          this.DeleteMode = false;
          this.ViewMode = false;
          this.AddMode = false;

        } else if (data.param === 'Delete') {
          this.AddInventoryStock = this.addstockinventoryService.getData();
          this.EditMode = false;
          this.DeleteMode = true;
          this.ViewMode = false;
          this.AddMode = false;
        } else if (data.param === 'View') {
          this.AddInventoryStock = this.addstockinventoryService.getData();
          this.EditMode = false;
          this.DeleteMode = false;
          this.ViewMode = true;
          this.AddMode = false;
        }
      }
    });
  }

  ngOnInit() {

    this.addstockinventoryService.getAllADDGRADE().subscribe(
      data => {
       this.addgradeList = data;
      },
      error => {
        console.log(error.error.message, 'Error');
      });

      this.addstockinventoryService.getAllGodown().subscribe(
        data => {
         this.godownList = data;
        },
        error => {
          console.log(error.error.message, 'Error');
        });

        this.addstockinventoryService.getAllUser().subscribe(
          data => {
            this.userList = data;
          },
          error => {
            console.log(error.error.message, 'Error Fetching User List');
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
          this.spinner.show()
          this.AddInventoryStock.LOTNumber.trim();
          var currentUser = JSON.parse(localStorage.getItem('currentUser'));
          this.AddInventoryStock.CreatedBy = currentUser.UserId;
          this.AddInventoryStock.CreatedDate = new Date();
          this.addstockinventoryService.add(item).subscribe(
            () => {
              this.spinner.hide();
              swal("", "Record Add Successfully", "success")
                .then(() => {
                  this.router.navigate(['/inventorystock-list']);
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
          this.AddInventoryStock.LOTNumber.trim();
          var currentUser = JSON.parse(localStorage.getItem('currentUser'));
          this.AddInventoryStock.ModifiedBy = currentUser.UserId;
          this.AddInventoryStock.ModifiedDate = new Date();
          this.AddInventoryStock.CreatedDate = new Date(this.AddInventoryStock.CreatedDate);
          this.addstockinventoryService.update(item._id, item).subscribe(
            () => {
              this.spinner.hide();
              swal("", "Record Update Successfully", "success")
                .then(() => {
                  this.router.navigate(['/inventorystock-list']);
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
          this.addstockinventoryService.delete(item._id, item).subscribe(
            () => {
              this.spinner.hide();
              swal("", "Record Delete Successfully", "success")
                .then(() => {
                  this.router.navigate(['/inventorystock-list']);
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
    this.router.navigate(['/inventorystock-list']);
  }

}
