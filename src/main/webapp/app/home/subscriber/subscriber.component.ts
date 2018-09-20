import { Router, Route, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';
import {PaymentComponent} from 'app/home/subscriber/payment/payment.component';
import { Account, LoginModalService, Principal } from 'app/shared';
import { PromoCodeModalService } from 'app/home/subscriber//promo-code/promo-code-modal.service';
import { PromoCodeService } from 'app/home/subscriber/promo-code';
import { NgbModalRef, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { PromoCodeManageService } from 'app/admin';

@Component({
    selector: 'jhi-subscriber',
    templateUrl: './subscriber.component.html',
    styleUrls: ['subscriber.css']

})
export class SubscriberComponent implements OnInit {
    account: Account;
    modalRef: NgbModalRef;
    payment: boolean;
    applied: boolean;
    closeResult: string;
    clicked: boolean;
    promocode: any;
    promocodeError: boolean;

    message;
    payable = 1000;
    oldAmount = this.payable;
    pay;
    plan;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private principal: Principal,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager,
        private promoCodeService: PromoCodeService,
        private loginModalService: LoginModalService,
        private promoCodeModalService: PromoCodeModalService,
    ) {}

    ngOnInit() {
        this.principal.identity().then(account => {
            this.account = account;
        });
        this.registerAuthenticationSuccess();
        this.promoCodeService.currentMessage.subscribe(
            message => this.calculate(message)
            );
        const plan = this.route.snapshot.params['plan'];
        this.plan = plan;
        // console.log(this.plan);
        if (this.plan === 'free') {
            console.log('free');
            this.payable = 0;
        } else if (this.plan === 'wiser') {
            console.log('wiser');
            this.payable = 1000;
        } else if (this.plan === 'wisest') {
            console.log('wisest');
            this.payable = 2000;
        }

    }

    calculate(discount) {
        let pay = this.payable;
        const oldAmount = this.payable;
        let off = discount;
        off = off / 100 ;
        console.log(off);
        pay = pay * off;
        this.pay = pay;
        console.log(pay);
        this.payable = this.payable - pay;
        console.log(this.payable);

        if (this.payable !== oldAmount) {
            this.applied = true;
        } else {
            this.applied = false;
        }
    }

    goToPayment() {
        this.payment = true;
    }

    apply() {
        this.modalRef = this.promoCodeModalService.open();
      }

    registerAuthenticationSuccess() {
        this.eventManager.subscribe('authenticationSuccess', message => {
            this.principal.identity().then(account => {
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
