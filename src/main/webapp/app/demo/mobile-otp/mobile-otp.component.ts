import { Component, OnInit } from "@angular/core";
import { MyloginService } from "app/demo/mylogin.service";
import { Mylogin } from "app/demo/mylogin.model";

@Component({
  selector: "jhi-mobile-otp",
  templateUrl: "./mobile-otp.component.html",
  styles: []
})
export class MobileOtpComponent implements OnInit {
  mylogin: Mylogin = new Mylogin();
  validnumber = "false";
  isVerify = "false";
  VerifyButtonClicked = "false";

  constructor(private myloginService: MyloginService) {}

  ngOnInit() {}

  submit(): void {
    this.validnumber = "true";
    this.myloginService.submit(this.mylogin).subscribe(data => {
      alert("OTP sent to your Mobile Successfully");
    });
    console.log(" submit complete");
  }

  verify() {
    this.VerifyButtonClicked = "true";
    if (this.mylogin.otp === this.mylogin.verifyotp) {
      console.log("otp verification successfull");
      this.isVerify = "true";
    } else {
      console.log("otp verification failed");
      this.isVerify = "false";
    }
  }
}
