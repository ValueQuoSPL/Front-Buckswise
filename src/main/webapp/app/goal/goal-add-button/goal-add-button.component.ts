import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'jhi-goal-add-button',
  templateUrl: './goal-add-button.component.html',
  styles: []
})
export class GoalAddButtonComponent implements OnInit {
  dialogRef;
  assettype;

  constructor(
    private ActiveModal: NgbActiveModal,
    private modalService: NgbModal,
    public dialog: MatDialog
    ) {}

    ngOnInit() {}

    onNoClick() {
      console.log('inside onNoClick');
      this.dialogRef.close();
    }

    openDialog(): void {
      this.dialogRef = this.dialog.open(GoalAddButtonComponent, {
        width: '550px'
        // data: {name: this.name, animal: this.animal}
      });
    this.dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.animal = result;
    });
  }
  //   onNoClick(){
  //   console.log('inside onNoClick');
  //   this.dialogRef.close();
  // }
}
