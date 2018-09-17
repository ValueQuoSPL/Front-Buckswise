import { Component, OnInit } from '@angular/core';
import { Home } from './home.model';

@Component({
  selector: 'jhi-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnInit {
  homeout: Home = new Home();
  home;
  nameField;
  editField;
  valid;

  constructor() {}

  ngOnInit() {}

  onHomeGet() {}
  onHomeSave() {}
  resetHome() {}
  updateHome() {}
  onEditHomeField(type, content) {}
}
