// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-model-popup',
//   templateUrl: './model-popup.component.html',
//   styleUrls: ['./model-popup.component.css']
// })
// export class ModelPopupComponent implements OnInit {

//   constructor() { }

//   ngOnInit() {
//   }

// }




import {Component, Inject} from  '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from  '@angular/material/dialog';

 @Component({
   selector: 'app-model-popup',
   templateUrl: './model-popup.component.html',
   styleUrls: ['./model-popup.component.css']
 })
 export class ModelPopupComponent {

  constructor(private  dialogRef:  MatDialogRef<ModelPopupComponent>, @Inject(MAT_DIALOG_DATA) public  data:  any) {
  }

  public closeMe() {
      this.dialogRef.close();
  }

}
