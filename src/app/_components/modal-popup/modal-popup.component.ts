import {Component, Inject, Injectable} from  '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA, MatDialog} from  '@angular/material/dialog';

@Component({
  selector: 'app-modal-popup',
  templateUrl: './modal-popup.component.html',
  styleUrls: ['./modal-popup.component.css']
})
export class ModalPopupComponent {

  constructor(private  dialogRef:  MatDialogRef<ModalPopupComponent>, @Inject(MAT_DIALOG_DATA) public  data:  any) {
  }
  
  public closeMe() {
      this.dialogRef.close();
  }

}
