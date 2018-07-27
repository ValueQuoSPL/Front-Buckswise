import { Component, OnInit } from '@angular/core';
import { Mylogin } from 'app/demo/mylogin.model';
import { MyloginService } from 'app/demo/mylogin.service';

@Component({
  selector: 'jhi-demo',
  templateUrl: './demo.component.html',
  styles: []
})
export class DemoComponent implements OnInit {

  mylogin: Mylogin = new Mylogin();
  validnumber = 'false';
  isVerify = 'false';
  VerifyButtonClicked = 'false';
  windowRef: any;
  user;

  constructor(private myloginService: MyloginService) { }

  ngOnInit() {
  }

  submit1() {
    this.myloginService.submit(this.mylogin);
  }

  submit(): void {
    this.validnumber = 'true';
    this.myloginService.submit(this.mylogin)
    .subscribe(
      (data) => { alert('OTP sent to your Mobile Successfully'); }
    );
    console.log(' submit complete');
  }

    verify() {
      this.VerifyButtonClicked = 'true';
      if ( this.mylogin.otp === this.mylogin.verifyotp ) {
        console.log('otp verification successfull');
        this.isVerify = 'true';
      } else {
        console.log('otp verification failed');
        this.isVerify = 'false';
      }
  }
}
