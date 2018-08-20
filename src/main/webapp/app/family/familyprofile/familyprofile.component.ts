import { log } from "util";
import { Component, OnInit } from "@angular/core";
import { FamilyprofileService } from "./familyprofile.service";
import { Principal } from "../../shared";
import { AccountService } from "../../shared";

@Component({
  selector: "jhi-familyprofile",
  templateUrl: "./familyprofile.component.html",
  styles: ["./familyprofile.component.html"]
})
export class FamilyprofileComponent implements OnInit {
  familyProfile: any;
  output: any;
  user: any;
  uid: number;
  isValid: boolean;

  constructor(
    private Familypro: FamilyprofileService,
    private account: AccountService
  ) {}

  ngOnInit() {
    this.familyProfile = {};
    console.log("inside family profile");
    this.FetchId();

    // this.getFamilyProfile();
  }
  saveFamilyProfile() {
    console.log("in family profile");
    this.familyProfile.uid = this.uid;
    console.log("save " + this.familyProfile.uid);

    this.Familypro.save(this.familyProfile).subscribe(
      responce => console.log(responce),
      error => console.log(error)
    );
  }
  getFamilyProfile() {
    this.Familypro.getFamilyProfile().subscribe(res => {
      console.log(res);
      this.output = res;
      console.log("responce of familyprofile service", this.output);
    });
  }
  FetchId(): Promise<any> {
    return this.account
      .get()
      .toPromise()
      .then(response => {
        this.user = response.body;
        console.log("user info of family", this.user);
        this.uid = this.user.id;
        console.log("in fetchid method", this.uid);
        // this.getFamilyProfilebyid(this.uid);
      });
  }
  getFamilyProfilebyid(uid) {
    this.Familypro.getFamilyProfileByUid(this.uid).subscribe(res => {
      console.log(res);
      this.output = res;
      console.log("responce of familyprofile service", this.output);
      if (this.output.uid === null) {
        this.isValid = true;
        console.log(this.isValid);
      } else {
        this.isValid = true;
        console.log(this.isValid);
      }
    });
  }
}
