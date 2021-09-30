// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-do-popup',
//   templateUrl: './do-popup.component.html',
//   styleUrls: ['./do-popup.component.css']
// })
// export class DoPopupComponent implements OnInit {

//   constructor() { }

//   ngOnInit() {
//   }

// }


import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

 @Component({
   selector: 'app-do-popup',
   templateUrl: './do-popup.component.html',
   styleUrls: ['./do-popup.component.css']
 })
 export class DoPopupComponent {
  pagedItems: any[];
  constructor(private dialogRef: MatDialogRef<DoPopupComponent>, @Inject(MAT_DIALOG_DATA) public  data:  any) {
    console.log(data);
  }

  public closeMe() {
      this.dialogRef.close();
  }

}
