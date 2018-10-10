import { Component, OnInit } from "@angular/core";
import { Router, Route } from "@angular/router";
import { Principal, LoginModalService } from "app/shared";
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { Myprofile } from "app/family/family.modal";
import { FamilyserviceService } from "app/family/familyservice.service";
import { Familyprofile, Assumption } from "app/family/family.modal";
import { NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
@Component({
  selector: "jhi-family",
  templateUrl: "./family.component.html",
  styleUrls: ["./family.component.css"]
})
export class FamilyComponent implements OnInit {
  panelOpenState = false;
  step = 0;
  MyProfile: any = [];
  FamilyProfile: any = [];
  Assumption: any = [];
  myProfile: Myprofile = new Myprofile();
  familyProfile: Familyprofile = new Familyprofile();
  assumption: Assumption = new Assumption();
  servers: any;
  modalRef: NgbModalRef;

  constructor(
    private principal: Principal,
    private familyservice: FamilyserviceService,
    private router: Router,
    private loginModalService: LoginModalService
  ) {}

  ngOnInit() {
    //    this.principal.identity().then((account)  =>  {
    //        this.account  =  account;
    //    });
  }
  isAuthenticated() {
    return this.principal.isAuthenticated();
  }
  //    getClick()
  //    {
  //        this.router.navigate(['register']);
  //      }
  saveDetail(): void {
    //      console.log('inside save details');
    //      this.familyservice.saveDetails(this.myProfile)
    //     .subscribe(data  =>  {
    //        alert('Data saved successfully');
    //        console.log('Data saved successfully');

    //      });
    this.MyProfile.push({
      fname: this.myProfile.fname,
      mname: this.myProfile.mname,
      lname: this.myProfile.lname,
      dob: this.myProfile.dob,
      gender: this.myProfile.gender,
      maritalstatus: this.myProfile.maritalstatus,
      mobile: this.myProfile.mobile,
      almobile: this.myProfile.almobile,
      occupation: this.myProfile.occupation,
      company: this.myProfile.company,
      howknow: this.myProfile.howknow,
      address: this.myProfile.address,
      email: this.myProfile.email,
      pan: this.myProfile.pan,
      country: this.myProfile.country,
      state: this.myProfile.state,
      city: this.myProfile.city,
      pin: this.myProfile.pin
    }),
      this.familyservice
        .saveDetails(this.MyProfile)
        .subscribe(
          responce => console.log(responce),
          error => console.log(error)
        );
    console.log(this.myProfile.fname);
    console.log(this.myProfile.mname);
  }
  saveFPdetail(): void {
    this.FamilyProfile.push({
      relationship: this.familyProfile.relationship,
      fname: this.familyProfile.fsname,
      mname: this.familyProfile.mname,
      lname: this.familyProfile.lname,
      email: this.familyProfile.email,
      dob: this.familyProfile.dob,
      phonenum: this.familyProfile.phonenum,
      occup: this.familyProfile.occup,
      check: this.familyProfile.check
    });
    console.log("inside familyprofile details");
    this.familyservice.saveFPdetail(this.FamilyProfile).subscribe(data => {
      alert("Data saved successfully");
      console.log("Data saved successfully");
    });
  }
  saveAssumption(): void {
    this.Assumption.push({
      BRrateOfReturn: this.assumption.BRrateOfReturn,
      BRinflation: this.assumption.BRinflation,
      BRrealRateOfReturn: this.assumption.BRrealRateOfReturn,
      ARrateOfReturn: this.assumption.ARrateOfReturn,
      ARinflation: this.assumption.ARinflation,
      ARrealRateOfReturn: this.assumption.ARrealRateOfReturn,
      SurplusPercentInvest: this.assumption.SurplusPercentInvest,
      SurplusPercentInsurance: this.assumption.SurplusPercentInsurance,
      AgeOfRetirement: this.assumption.AgeOfRetirement,
      LifeExpentancy: this.assumption.LifeExpentancy
    });
    console.log("inside Assumption details");
    this.familyservice.saveAssumption(this.Assumption).subscribe(data => {
      alert("Data saved successfully");
      console.log("Data saved successfully");
    });
  }
  login() {
    this.modalRef = this.loginModalService.open();
  }
}
