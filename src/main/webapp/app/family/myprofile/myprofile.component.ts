import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { first } from "rxjs/operator/first";
import { last } from "rxjs/operators";

@Component({
  selector: "jhi-myprofile",
  templateUrl: "./myprofile.component.html",
  styles: ["./myprofile.component.css"]
})
export class MyprofileComponent implements OnInit {
  myprofileArray = [];
  fname: string;
  mname: string;
  lname: string;
  occupation: string;
  company: string;
  success: boolean;
  registerAccount: any;
  register: any;

  constructor(private router: Router) {}

  ngOnInit() {
    this.success = false;
    this.registerAccount = {};
  }
  btnClick = function() {
    this.router.navigateByUrl("/register");
  };
  insert() {
    this.myprofileArray.push({
      fname: this.fname,
      mname: this.mname,
      lname: this.lname
    });
    console.log(this.fname);
    console.log(this.mname);
    console.log(this.lname);
  }
}
