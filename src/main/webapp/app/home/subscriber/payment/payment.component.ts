import { Component, OnInit, Input } from '@angular/core';
import { User } from 'app/home/subscriber/payment/payment.model';
import { PaymentService } from 'app/home/subscriber/payment/payment.service';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
// import { SuccessComponent } from '../../success/success.component';
import { JhiEventManager } from 'ng-jhipster';

@Component({
  selector: 'jhi-payment',
  templateUrl: './payment.component.html',
  styles: []
})
export class PaymentComponent implements OnInit {
  user: User = new User();
  public paymentDetail: any = [];

  @Input() offer;

  constructor(
    private paymentService: PaymentService,
    private http: HttpClient
  ) {}

  submitUser() {
    this.paymentService.submitUser(this.user).subscribe(data => {
      console.log(this.user);
      this.paymentDetail.push(data);
      console.log(this.paymentDetail);
    });
  }

  ngOnInit() {
    this.user.sUrl = 'http://localhost:8080/sucess';
    this.user.fUrl = 'http://localhost:8080/fail';
    console.log(this.offer);
    this.user.amount = this.offer.payable;
    this.user.productInfo = this.offer.plan;
  }
}
