import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'jhi-goal-add-button',
  templateUrl: './goal-add-button.component.html',
  styles: []
})
export class GoalAddButtonComponent implements OnInit {
  assettype;
  constructor() {}

  ngOnInit() {}

  clear() {}
}

// openDialog(): void {
//   const dialogRef = this.dialog.open(GoalAddButtonComponent, {
//     width: '550px',
//     // data: {name: this.name, animal: this.animal}
//   });

//   dialogRef.afterClosed().subscribe(result => {
//     console.log('The dialog was closed');
//     this.animal = result;
//   });
// }
// onNoClick(): void {
//   this.dialogRef.close();
// }
