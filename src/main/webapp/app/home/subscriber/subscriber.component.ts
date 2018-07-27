// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'jhi-subscriber',
//   templateUrl: './subscriber.component.html',
//   styles: []
// })
// export class SubscriberComponent implements OnInit {
import { Router, Route } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';
import {PaymentComponent} from 'app/home/subscriber/payment/payment.component';

import { Account, LoginModalService, Principal } from 'app/shared';

@Component({
    selector: 'jhi-subscriber',
    templateUrl: './subscriber.component.html',
    styleUrls: [ ]

})
export class SubscriberComponent implements OnInit {
    account: Account;
    modalRef: NgbModalRef;

    constructor(
        private principal: Principal,
        private loginModalService: LoginModalService,
        private eventManager: JhiEventManager,
        private router: Router
    ) {
    }

    ngOnInit() {
        this.principal.identity().then((account) => {
            this.account = account;
        });
        this.registerAuthenticationSuccess();
    }

    registerAuthenticationSuccess() {
        this.eventManager.subscribe('authenticationSuccess', (message) => {
            this.principal.identity().then((account) => {
                this.account = account;
            });
        });
    }

    isAuthenticated() {
        return this.principal.isAuthenticated();
    }

    login() {
        this.modalRef = this.loginModalService.open();
    }
    register() {
        this.router.navigate(['register']);
    }
}
