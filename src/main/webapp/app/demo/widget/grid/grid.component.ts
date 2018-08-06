import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'jhi-grid',
  templateUrl: './grid.component.html',
  styleUrls: [
    './grid.component.css'
  ]
})
export class GridComponent {

  TrappedBoxes = ['Trap-1', 'Trap-2', 'Trap-3'];
  SortableList = [
    '1',
    '2',
    '3',
    '4',
    '5'
  ];

  Add(): void {
    this.TrappedBoxes.push('new trapped');
  }

  onDragStart(): void {
    console.log('got drag start');
  }

  onDragMove(event: PointerEvent): void {
    console.log(`got drag move = X: ${Math.round(event.clientX)} Y:  ${Math.round(event.clientY)}`);
  }

  onDragEnd(): void {
    console.log('got drag end');
  }

}
