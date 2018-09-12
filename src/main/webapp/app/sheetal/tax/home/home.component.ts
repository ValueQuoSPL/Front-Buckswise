import { Component, OnInit } from '@angular/core';
import { Home } from './home.model';

@Component({
  selector: 'jhi-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnInit {
  home: Home = new Home();
  constructor() {}

  ngOnInit() {}
}
