// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'jhi-subscriber',
//   templateUrl: './subscriber.component.html',
//   styles: []
// })
// export class SubscriberComponent implements OnInit {
import { Router, Route } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { JhiEventManager } from 'ng-jhipster';
import {PaymentComponent} from 'app/home/subscriber/payment/payment.component';
import { Account, LoginModalService, Principal } from 'app/shared';
import { PromoCodeModalService } from 'app/home/subscriber//promo-code/promo-code-modal.service';
import { PromoCodeService } from 'app/home/subscriber/promo-code';
import {
    NgbModal,
    ModalDismissReasons,
    NgbModalRef,
    NgbActiveModal
  } from '@ng-bootstrap/ng-bootstrap';

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

    constructor(
        private principal: Principal,
        private loginModalService: LoginModalService,
        private eventManager: JhiEventManager,
        private router: Router,
        private modalService: NgbModal,
        private promoCodeModalService: PromoCodeModalService,
        private promoCodeService: PromoCodeService,
        public activeModal: NgbActiveModal

    ) {}

    ngOnInit() {
        this.principal.identity().then(account => {
            this.account = account;
        });
        this.registerAuthenticationSuccess();
    }

    goToPayment() {
        this.payment = true;
    }

    getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
          return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
          return 'by clicking on a backdrop';
        } else {
          return `with: ${reason}`;
        }
      }

      openPromo(promoContent) {
        // console.log('income modal open');

        this.modalService
          .open(promoContent, { ariaLabelledBy: 'promoModal' })
          .result.then(
            result => {
              this.closeResult = `Closed with: ${result}`;
            // this.CheckPromocode();
              // // console.log('add income success');
            },
            reason => {
              this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
            }
          );
      }

    apply() {
        this.modalRef = this.promoCodeModalService.open();
        // console.log(this.modalRef);
        // this.clicked = true;
        // const response = this.promoCodeService.apply(this.promocode);
        // console.log(response);
        // if (response) {
        //     this.promocodeError = true;
        //     this.activeModal.dismiss('promocode success');
        // } else {
        //     this.promocode = null;
        //     this.promocodeError = true;
        // }
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
