import { Component, OnInit } from '@angular/core';
import { Other } from './other.model';

@Component({
  selector: 'jhi-other',
  templateUrl: './other.component.html',
  styles: []
})
export class OtherComponent implements OnInit {
  otherout: Other = new Other();
  other;
  nameField;
  editField;
  valid;

  constructor() {}

  ngOnInit() {}
  onOtherSave() {}
  onOtherGet() {}
  resetOther() {}
  updateEightyd() {}
  onEditOtherField(type, content) {}
}
