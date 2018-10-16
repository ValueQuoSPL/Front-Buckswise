import { Router, ActivatedRoute } from "@angular/router";
import {
  Component,
  OnInit,
  NgZone,
  AfterContentInit,
  DoCheck,
  AfterContentChecked,
  AfterViewChecked
} from "@angular/core";
import { JhiEventManager } from "ng-jhipster";
import { Account, LoginModalService, Principal } from "app/shared";
import { PromoCodeModalService } from "app/home/subscriber/promo-code/promo-code-modal.service";
import { PromoCodeService } from "app/home/subscriber/promo-code";
import { NgbModalRef, NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { UserPlanService } from "./userplan.service";
import { PromoCodeManageService } from "app/admin";

class Offer {
  payable;
  plan;
}

class UserPlan {
  uid;
  plan;
  paid;
  discount;
  promocode;
  applyDate;
  expiryDate;
}

@Component({
  selector: "jhi-subscriber",
  templateUrl: "./subscriber.component.html",
  styleUrls: ["subscriber.css"]
})
export class SubscriberComponent implements OnInit {
  uid;
  account: Account;
  modalRef: NgbModalRef;
  payment: boolean;
  applied = false;
  closeResult: string;
  clicked: boolean;
  promocode: any;
  promocodeError: boolean;
  offer: Offer = new Offer();
  user: UserPlan = new UserPlan();
  message;
  payable = 0;
  oldAmount;
  pay;
  plan;

  userPlan;
  promoCode;
  discount: number;
  dynamicPromo: any;

  isSubscribed = false;

  constructor(
    private zone: NgZone,
    private router: Router,
    private principal: Principal,
    private route: ActivatedRoute,
    public activeModal: NgbActiveModal,
    private eventManager: JhiEventManager,
    private userPlanService: UserPlanService,
    private promoCodeService: PromoCodeService,
    private loginModalService: LoginModalService,
    private promoCodeModalService: PromoCodeModalService
  ) {}

  ngOnInit() {
    this.principal.identity().then(account => {
      this.account = account;
      this.uid = account.id;
      this.get();
    });
    this.registerAuthenticationSuccess();
    this.promoCodeService.currentMessage.subscribe(message => {
      this.dynamicPromo = message;
      // console.log('promocode -> subscriber', this.dynamicPromo);
      this.discount = this.dynamicPromo.discount;
      if (this.discount > 0) {
        this.calculate(this.discount);
      }
    });
    const plan = this.route.snapshot.params["plan"];
    this.plan = plan;
    this.offer.plan = plan;

    if (this.plan === "FREE") {
      this.payable = 0;
      this.oldAmount = this.payable;
      this.offer.payable = this.payable;
    } else if (this.plan === "WISER") {
      this.payable = 1000;
      this.oldAmount = this.payable;
      this.offer.payable = this.payable;
    } else if (this.plan === "WISEST") {
      this.payable = 2000;
      this.oldAmount = this.payable;
      this.offer.payable = this.payable;
    }
  }

  get() {
    this.userPlanService.GetUserPlan(this.uid).subscribe(response => {
      this.userPlan = response;
      if (this.userPlan.length !== 0) {
        this.isSubscribed = true;
        // console.log('subscribed user', this.userPlan);
      } else {
        this.isSubscribed = false;
        // console.log('not subscribed user', this.userPlan);
      }
    });
  }

  calculate(discount) {
    const oldAmount = this.payable;
    let pay = this.payable;
    let off = discount;
    off = off / 100;
    pay = pay * off;
    this.pay = pay;
    this.payable = this.payable - pay;
    this.offer.payable = this.payable;

    if (this.payable !== oldAmount) {
      this.applied = true;
    } else {
      this.applied = false;
    }
  }

  goToPayment() {
    this.payment = true;

    this.saveUserPlan();
  }

  apply() {
    this.modalRef = this.promoCodeModalService.open();
  }

  registerAuthenticationSuccess() {
    this.eventManager.subscribe("authenticationSuccess", message => {
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
    this.router.navigate(["register"]);
  }

  saveUserPlan() {
    this.fillUserPlanData();
    console.log("post user plan", this.user);

    if (!this.isSubscribed) {
      this.userPlanService.SaveUserPlan(this.user).subscribe();
    } else {
      this.userPlanService.UpdateUserPlan(this.user).subscribe();
    }
  }

  fillUserPlanData() {
    this.user.uid = this.uid;
    this.user.applyDate = new Date();
    this.user.expiryDate = this.dynamicPromo.expiryDate;
    this.user.plan = this.plan;
    this.user.discount = this.discount;
    this.user.paid = this.payable;
    this.user.promocode = this.dynamicPromo.promocode;
  }
}
