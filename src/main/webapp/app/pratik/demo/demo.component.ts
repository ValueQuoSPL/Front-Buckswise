import { Component, OnInit } from '@angular/core';
import { Mylogin } from './mylogin.model';
import { MyloginService } from './mylogin.service';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { PromoCodeModalService } from 'app/home/subscriber/promo-code/promo-code-modal.service';

@Component({
  selector: 'jhi-demo',
  templateUrl: './demo.component.html',
  styles: []
})
export class DemoComponent implements OnInit {
  mylogin: Mylogin = new Mylogin();
  modalRef: NgbModalRef;

  windowRef: any;
  user;

  constructor(private myloginService: MyloginService,
              private promoCodeModalService: PromoCodeModalService) {}

  ngOnInit() {}

  submit1() {
    this.myloginService.submit(this.mylogin);
  }

  apply() {
    this.modalRef = this.promoCodeModalService.open();
  }
}
