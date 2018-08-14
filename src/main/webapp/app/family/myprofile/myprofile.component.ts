import { Component, OnInit } from "@angular/core";
import { Myprofile } from "../family.model";
import { MyprofileService } from "./myprofile.service";
import { Principal } from "../../shared";

@Component({
  selector: "jhi-myprofile",
  templateUrl: "./myprofile.component.html",
  styles: []
})
export class MyprofileComponent implements OnInit {
  myProfile: any;
  output: any;

  constructor(
    private principal: Principal,
    private MyProfileSer: MyprofileService
  ) {}
  ngOnInit() {
    this.myProfile = {};
    this.getMyProfile();
  }
  saveDetail() {
    this.MyProfileSer.save(this.myProfile).subscribe(
      responce => console.log(responce),
      error => console.log(error)
    );
  }
  getMyProfile() {
    this.MyProfileSer.getMyProfile().subscribe(res => {
      console.log(res);
      this.output = res;
      console.log("responce of myprofile service", this.output);
    });
  }
}
