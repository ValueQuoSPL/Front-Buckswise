import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ViewContainerRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DraggableDirective } from 'app/demo/widget/draggable/draggable.directive';
import { DraggableRxDirective } from 'app/demo/widget/draggable/draggable-rx.directive';
import { MovableDirective } from 'app/demo/widget/draggable/movable.directive';
import { MovableAreaDirective } from 'app/demo/widget/draggable/movable-area.directive';
import { DraggableHelperDirective } from 'app/demo/widget/draggable/draggable-helper.directive';
import { SortableDirective } from 'app/demo/widget/draggable/sortable.directive';
import { SortableListDirective } from 'app/demo/widget/draggable/sortable-list.directive';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule
  ],
  declarations: [
    DraggableDirective,
    DraggableRxDirective,
    MovableDirective,
    MovableAreaDirective,
    DraggableHelperDirective,
    SortableDirective,
    SortableListDirective
  ],
  exports: [
    DraggableDirective,
    DraggableRxDirective,
    MovableDirective,
    MovableAreaDirective,
    DraggableHelperDirective,
    SortableDirective,
    SortableListDirective
  ],
  providers: [
  ]
})
export class DraggableModule { }
