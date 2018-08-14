import { Component, OnInit } from "@angular/core";

@Component({
  selector: "jhi-simple",
  templateUrl: "./simple.component.html",
  styles: []
})
export class SimpleComponent implements OnInit {
  myObj = {
    resource: "",
    amount: ""
  };

  resource: any;
  amount: any;
  onSubmit: any;

  constructor() {}

  ngOnInit() {
    // console.log(this.myObj);
  }
}
