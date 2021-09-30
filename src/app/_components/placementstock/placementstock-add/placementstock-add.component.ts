// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-placementstock-add',
//   templateUrl: './placementstock-add.component.html',
//   styleUrls: ['./placementstock-add.component.css']
// })
// export class PlacementstockAddComponent implements OnInit {

//   constructor() { }

//   ngOnInit() {
//   }

// }




import { Component, OnInit } from '@angular/core';
import { Product, ProductDetails } from 'src/app/_models/product';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/_services/product.service';
import { PriceListService } from 'src/app/_services/price-list.service';
import swal from 'sweetalert';
import { NgxSpinnerService } from 'ngx-spinner';

 @Component({
   selector: 'app-placementstock-add',
   templateUrl: './placementstock-add.component.html',
   styleUrls: ['./placementstock-add.component.css']
 })
 export class PlacementstockAddComponent implements OnInit {


  Product: Product = new Product();
  ProductDetails: any = [];abstract
  ViewMode: boolean = false;
  EditMode: boolean = false;
  DeleteMode: boolean = false;
  AddMode: boolean = false;
  ButtonShow: boolean = false;
  ShowTable: boolean = false;
  product: any = [];
  productList: any = [];

  constructor(private router: Router, private productService: ProductService,
    private priceListService: PriceListService, private route: ActivatedRoute, private spinner: NgxSpinnerService) {

    this.route.data.subscribe(data => {
      if (data.param) {
        if (data.param === 'Add') {
          this.priceListService.getAllPriceList().subscribe(
            data => {
              this.productList = data;
            },
            error => {
              console.log(error.error.message);
            });
          this.EditMode = false;
          this.DeleteMode = false;
          this.ViewMode = false;
          this.AddMode = true;
        }
        else if (data.param === 'Edit') {
          this.Product = this.productService.getData();
          this.productService.getProductDetails(this.Product.Name).subscribe(data => {
            this.ProductDetails = data;
            this.ShowTable = true;
            this.EditMode = true;
            this.DeleteMode = false;
            this.ViewMode = false;
            this.AddMode = false;
          });

        } else if (data.param === 'Delete') {
          this.Product = this.productService.getData();
          this.productService.getProductDetails(this.Product.Name).subscribe(data => {
            this.ProductDetails = data;
            this.ShowTable = true;
            this.EditMode = false;
            this.DeleteMode = true;
            this.ViewMode = false;
            this.AddMode = false;
          });
        } else if (data.param === 'View') {
          this.Product = this.productService.getData();
          this.productService.getProductDetails(this.Product.Name).subscribe(data => {
            this.ProductDetails = data;
            this.ShowTable = true;
            this.EditMode = false;
            this.DeleteMode = false;
            this.ViewMode = true;
            this.AddMode = false;
          });
        }
      }
    });
  }

  ngOnInit() {

  }

  AddProductDetails() {
    const newItem = new ProductDetails();
    this.ProductDetails.push(newItem);
  }

  RemoveProductDetails(i: any) {
    if (this.ProductDetails.length > 1) {
      this.ProductDetails.splice(i, 1);
    } else {
      swal("","One Product Inventory Details is required","info");
    }
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
          this.Product.CreatedBy = currentUser.UserId;
          this.Product.CreatedDate = new Date();
          this.Product.ProductDetails = this.ProductDetails;
          this.productService.add(this.Product).subscribe(
            () => {
              this.spinner.hide();
              swal("", "Record Add Successfully", "success")
                .then(() => {
                  this.router.navigate(['/product-list']);
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
          this.Product.ModifiedBy = currentUser.UserId;
          this.Product.ModifiedDate = new Date();
          this.Product.CreatedDate = new Date(this.Product.CreatedDate);
          this.Product.ProductDetails = this.ProductDetails;
          this.productService.update(item._id, item).subscribe(
            () => {
              this.spinner.hide();
              swal("", "Record Update Successfully", "success")
                .then(() => {
                  this.router.navigate(['/product-list']);
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
          this.Product.ProductDetails = this.ProductDetails;
          this.productService.delete(item._id, item).subscribe(
            () => {
              this.spinner.hide();
              swal("", "Record Delete Successfully", "success")
                .then(() => {
                  this.router.navigate(['/product-list']);
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
    this.router.navigate(['/product-list']);
  }

  // GetPriceList(item: any) {
  //   this.productService.checkProductAlreadyAdded(item.Name.Name).subscribe(
  //     data => {
  //       if (Object.keys(data).length > 0) {
  //         swal('Selected product inventory already added', 'Please use Edit option to add another product category', 'info');
  //         this.ShowTable = false;
  //         return;
  //       } else {
  //         this.ProductDetails = item.Name.PriceListDetails;
  //         this.ShowTable = true;
  //       }
  //     });
  // }

  // AddInventory(item: any) {
  //   if (item.AddInventory == "")
  //     item.InInventory = null
  //   else {
  //     if (!item.InInventory) item.InInventory = 0;
  //     var result = (isNaN(item.InInventory) ? 0 : parseInt(item.InInventory)) + parseInt(item.AddInventory);
  //     item.InInventory = result;
  //   }

  // }

}
