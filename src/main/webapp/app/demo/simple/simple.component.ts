import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'jhi-simple',
  templateUrl: './simple.component.html',
  styles: []
})
export class SimpleComponent implements OnInit {

  myObj = {
    resource: '',
    amount: ''
  };

  constructor() { }

  ngOnInit() {

    // console.log(this.myObj);

  }

}
