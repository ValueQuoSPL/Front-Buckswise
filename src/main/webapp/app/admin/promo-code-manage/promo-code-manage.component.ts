import { Component, OnInit } from '@angular/core';
import {
  NgbModal,
  ModalDismissReasons,
  NgbModalRef
} from '@ng-bootstrap/ng-bootstrap';
import { FormControl } from '@angular/forms';
import { PromoCodeModule } from 'app/pratik/promo-code';
class PromoCodeModel {
  id;
  plan;
  promocode;
  expiry_date;
  discount;
}

@Component({
  selector: 'jhi-promo-code-manage',
  templateUrl: './promo-code-manage.component.html',
  styleUrls: ['./promo.css']
})
export class PromoCodeManageComponent implements OnInit {
  closeResult;
  promo: PromoCodeModel = new PromoCodeModel();
  promoDate = new FormControl(new Date());
  dynamicPromo: any = [];

  PlanTypeArray = [
    { name: 'WISER'},
    { name: 'WISEST'},
  ];

  constructor(
    private modalService: NgbModal,

  ) { }

  ngOnInit() {
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

  openModal(content) {
    // console.log('income modal open');

    this.modalService
      .open(content, { ariaLabelledBy: 'PromoModal' })
      .result.then(
        result => {
          this.closeResult = `Closed with: ${result}`;
          this.AddPromo();
          // // console.log('add income success');
        },
        reason => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  AddPromo() {
    console.log(this.promo);
    this.dynamicPromo.push({
      plan: this.promo.plan,
      promocode: this.promo.promocode,
      expiry_date: this.promoDate.value,
      discount: this.promo.discount
    });
    console.log(this.dynamicPromo);
    this.clear();
  }

  clear() {
    this.promo.id = null;
    this.promo.plan = null;
    this.promo.promocode = null;
    this.promo.expiry_date = null;
    this.promo.discount = null;
  }
}
