import { Component, OnInit, AfterViewInit, Renderer, ElementRef } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { Register } from 'app/account/register/register.service';
import { LoginModalService, EMAIL_ALREADY_USED_TYPE, LOGIN_ALREADY_USED_TYPE } from 'app/shared';

import { UserMgmtComponent } from 'app/admin';
import { ITEMS_PER_PAGE, Principal, User, UserService } from 'app/shared';
import { Router } from '@angular/router';

@Component({
    selector: 'jhi-register',
    templateUrl: './register.component.html',
    styleUrls: [
        'register.component.css'
    ]
})
export class RegisterComponent implements OnInit, AfterViewInit {

    confirmPassword: string;
    doNotMatch: string;
    error: string;
    errorEmailExists: string;
    errorUserExists: string;
    registerAccount: any;
    success: boolean;
    modalRef: NgbModalRef;
    submitEvent = false;
    userMailOtp;
    systemMailOtp ;
    VerifyButtonClicked = false;
    isVerify = false;

    userMgmt: UserMgmtComponent;
    users: User[];

    constructor(
        private loginModalService: LoginModalService,
        private registerService: Register,
        private elementRef: ElementRef,
        private renderer: Renderer,
        private userService: UserService,
        private router: Router
    ) {}

    ngOnInit() {
        this.success = false;
        this.registerAccount = {};
    }

    ngAfterViewInit() {
        this.renderer.invokeElementMethod(this.elementRef.nativeElement.querySelector('#login'), 'focus', []);
    }

    register() {
        this.submitEvent = true;
        if (this.registerAccount.password !== this.confirmPassword) {
            this.doNotMatch = 'ERROR';
        } else {
            this.doNotMatch = null;
            this.error = null;
            this.errorUserExists = null;
            this.errorEmailExists = null;
            this.registerAccount.langKey = 'en';
            this.registerService.save(this.registerAccount)
                .subscribe(
                    data  => {
                        this.systemMailOtp = data;
                        this.success = true;
                    },
                    response => {
                        this.processError(response);
                    }
                );
            }
        // console.log('calling findUser()');
        // this.findUser();
        // this.registerAccount.activated = true;
        // this.registerService.activateUser(this.registerAccount);
    }

    verify() {
        // this.VerifyButtonClicked = true;
        // if (this.userMailOtp === this.systemMailOtp) {
        //     console.log('success');
        //     this.isVerify = true;
        //     // this.registerService.activate(this.registerAccount.langKey);
        //     // console.log('key for user', this.registerAccount.langKey);

        // } else {
        //     console.log('failed');
        //     this.isVerify = false;
        // }
        this.router.navigate(['activate'], { queryParams: { key: this.userMailOtp } });
    }
    findUser() {
        console.log('calling loadAll()');
        this.loadAll();
        console.log('users : ', this.users);
        for (const user of this.users) {
            console.log('inside for');
            console.log(user.email);
            if (user.email === this.registerAccount.email) {
                console.log('user found ', user.email);
                // this.userMgmt.setActive(user, true);
            }
        }
    }

    loadAll() {
        console.log('inside loadAll()');

        // this.registerService.query().subscribe(
        //         (res: HttpResponse<User[]>) => this.onSuccess(res.body, res.headers),
        //         (res: HttpResponse<any>) => this.onError(res.body)
        // );
        this.registerService.getUsers().subscribe(data => this.users = data );

        console.log('calling loadAll() of user management');
        this.userMgmt.loadAll();
        console.log('complete loadAll() of user management');

    }
    onSuccess(data, headers) {
        console.log('getting user data ', data);
        console.log('getting user data ', headers);
        this.users = data;
    }
    onError(error) {
        console.log('ERROR: getting user data ', error);
    }

    openLogin() {
        this.modalRef = this.loginModalService.open();
    }

    private processError(response: HttpErrorResponse) {
        this.success = null;
        if (response.status === 400 && response.error.type === LOGIN_ALREADY_USED_TYPE) {
            this.errorUserExists = 'ERROR';
        } else if (response.status === 400 && response.error.type === EMAIL_ALREADY_USED_TYPE) {
            this.errorEmailExists = 'ERROR';
        } else {
            this.error = 'ERROR';
        }
    }
}
