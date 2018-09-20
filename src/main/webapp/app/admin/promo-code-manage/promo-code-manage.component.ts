import { Component, OnInit } from "@angular/core";
import {
  NgbModal,
  ModalDismissReasons,
  NgbModalRef
} from "@ng-bootstrap/ng-bootstrap";
import { FormControl } from "@angular/forms";
import { JhiEventManager, JhiAlertService } from "ng-jhipster";
import { PromoCodeService } from "app/admin/promo-code-manage/promo-code.service";
import { HttpResponse } from "@angular/common/http";
import { EventEmitter } from "protractor";

class PromoCodeModel {
  id;
  plan;
  promocode;
  expiryDate;
  discount;
}

@Component({
  selector: "jhi-promo-code-manage",
  templateUrl: "./promo-code-manage.component.html",
  styleUrls: ["./promo.css"]
})
export class PromoCodeManageComponent implements OnInit {
  closeResult;
  promo: PromoCodeModel = new PromoCodeModel();
  promoDate = new FormControl(new Date());
  dynamicPromo: any = [];
  event: EventEmitter;

  PlanTypeArray = [{ name: "WISER" }, { name: "WISEST" }];

  constructor(
    private modalService: NgbModal,
    private eventManager: JhiEventManager,
    private promoService: PromoCodeService,
    private alertService: JhiAlertService
  ) {}

  ngOnInit() {
    this.loadAll();
    this.registerChange();
  }

  registerChange() {
    this.eventManager.subscribe("promoCodeListModification", response =>
      this.loadAll()
    );
  }

  private onSaveSuccess(result) {
    this.eventManager.broadcast({
      name: "promoCodeListModification",
      content: "OK"
    });
  }

  getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return "by pressing ESC";
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return "by clicking on a backdrop";
    } else {
      return `with: ${reason}`;
    }
  }

  openModal(content) {
    // console.log('income modal open');

    this.modalService
      .open(content, { ariaLabelledBy: "PromoModal" })
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
    this.promo.expiryDate = this.promoDate.value;
    console.log(this.promo);
    this.promoService
      .create(this.promo)
      .subscribe(response => this.onSaveSuccess(response));
    this.clear();
  }

  loadAll() {
    this.promoService
      .get()
      .subscribe(
        (res: HttpResponse<PromoCodeModel[]>) => this.onSuccess(res.body),
        (res: HttpResponse<any>) => this.onError(res.body)
      );
  }

  private onSuccess(data) {
    this.dynamicPromo = data;
    this.event.emit("promocodeAdded");
  }

  private onError(error) {
    this.alertService.error(error.error, error.message, null);
  }

  clear() {
    this.promo.id = null;
    this.promo.plan = null;
    this.promo.promocode = null;
    this.promo.expiryDate = null;
    this.promo.discount = null;
  }
}
