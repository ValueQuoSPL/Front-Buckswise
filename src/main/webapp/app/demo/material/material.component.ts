import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'jhi-material',
  templateUrl: './material.component.html',
  styleUrls: ['./material.css']
})
export class MaterialComponent implements OnInit {

  panelOpenState = false;
  animal: string;
  name: string;

  constructor(public dialog: MatDialog) { }

  ngOnInit() {}

  openDialog(): void {
    const dialogRef = this.dialog.open(IncomeDialog, {
      width: '250px',
      data: {name: this.name, animal: this.animal}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }

}

@Component({
  selector: 'income-dialog',
  templateUrl: './income-dialog.html',
})
export class IncomeDialog {
  constructor(
    public dialogRef: MatDialogRef<IncomeDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
