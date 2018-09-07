import { Component, OnInit } from '@angular/core';
import { Mylogin } from './mylogin.model';
import { MyloginService } from './mylogin.service';

@Component({
  selector: 'jhi-demo',
  templateUrl: './demo.component.html',
  styles: []
})
export class DemoComponent implements OnInit {

  mylogin: Mylogin = new Mylogin();

  windowRef: any;
  user;

  constructor(private myloginService: MyloginService) { }

  ngOnInit() {
  }

  submit1() {
    this.myloginService.submit(this.mylogin);
  }

}
