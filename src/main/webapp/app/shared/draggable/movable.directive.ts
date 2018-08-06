import { Directive, OnInit, HostListener, HostBinding, Input, ElementRef, ViewContainerRef } from '@angular/core';
import { DraggableDirective } from './draggable.directive';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';

interface Position {
  x: number;
  y: number;
}

@Directive({
  selector: '[jhiMovable]'
})
export class MovableDirective extends DraggableDirective {

  // constructor(private draggable: DraggableDirective) { }

  // ngOnInit() {
  //   this.draggable.dragStart.subscribe(
  //     () => this.onDragStart()
  //   );
  // }
  @HostBinding('style.transform') get transform(): SafeStyle {
    return this.sanitizer.bypassSecurityTrustStyle(
      `translateX(${this.position.x}px) translateY(${this.position.y}px)`
    );
  }

  @HostBinding('class.movable') movable = true;

  public position: Position = {x: 0, y: 0};
  private startPosition: Position;

  // tslint:disable-next-line:no-input-rename
  @Input('appMovableReset') reset = false;

  constructor(private sanitizer: DomSanitizer,
    public element: ElementRef, public viewContainerRef: ViewContainerRef) {
    super(element);
  }

  @HostListener('dragStart', ['$event'])
    onDragStart(event) {
      this.startPosition = {
        x: event.clientX - this.position.x,
        y: event.clientY - this.position.y,
      };
      // console.log('start');
    }

  @HostListener('dragMove', ['$event'])
    onDragMove(event) {
      this.position.x = event.clientX - this.startPosition.x;
      this.position.y = event.clientY - this.startPosition.y;
      // console.log('moving...');
    }

  @HostListener('dragEnd', ['$event'])
    onDragEnd() {
      if (this.reset) {
        this.position = {x: 0, y: 0};
      }
      // console.log('end');
    }

}
