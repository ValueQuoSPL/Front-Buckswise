import { Component, OnInit } from "@angular/core";
import { User } from "app/home/subscriber/payment/payment.model";
import { PaymentService } from "app/home/subscriber/payment/payment.service";
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
// import { SuccessComponent } from '../../success/success.component';
import { JhiEventManager } from "ng-jhipster";

@Component({
  selector: "jhi-payment",
  templateUrl: "./payment.component.html",
  styles: []
})
export class PaymentComponent implements OnInit {
  // user: User = new User();
  public paymentDetail = [];
  user: any;
  // public key: string;
  // public hashString: string;
  // public hash: string;
  // public txnid: string;
  // tslint:disable-next-line:no-shadowed-variable
  constructor(
    private paymentService: PaymentService,
    private http: HttpClient
  ) {}

  submitUser() {
    this.paymentService.submitUser(this.user).subscribe(data => {
      this.paymentDetail = data;
      console.log(this.paymentDetail);
    });
  }

  ngOnInit() {}
}
