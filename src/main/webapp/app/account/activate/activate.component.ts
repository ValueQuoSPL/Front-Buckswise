import { Component, OnInit } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { ActivatedRoute, Router } from '@angular/router';
import { ActivateService } from 'app/account/activate/activate.service';
import { LoginModalService } from 'app/shared';

import { MyloginService } from 'app/account/mobile-otp/mylogin.service';
import { Mylogin } from 'app/account/mobile-otp/mylogin.model';

@Component({
    selector: 'jhi-activate',
    templateUrl: './activate.component.html'
})
export class ActivateComponent implements OnInit {
    error: string;
    success: string;
    final: boolean;
    modalRef: NgbModalRef;
    key;
    mylogin: Mylogin = new Mylogin();
    validnumber = 'false';
    isVerify = 'false';
    VerifyButtonClicked = 'false';

    constructor(
        private activateService: ActivateService,
        private loginModalService: LoginModalService,
        private route: ActivatedRoute,
        private myloginService: MyloginService,
        private router: Router
    ) {
    }

    ngOnInit() {
        // console.log(this.route.queryParams);
        this.route.queryParams.subscribe(params => {
            this.key = params['key'];
        });
    }

    AfterOtpValidation() {
        this.activateService.get(this.key).subscribe(() => {
            this.error = null;
            this.success = 'OK';
        }, () => {
            this.success = null;
            this.error = 'ERROR';
        });
        this.final = true;

    }

    login() {
        this.modalRef = this.loginModalService.open();
        this.router.navigate(['/']);
    }

    submit(): void {
        this.validnumber = 'true';
        this.myloginService.submit(this.mylogin)
        .subscribe(
          data => { alert('OTP sent to your Mobile Successfully'); }
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
