import { Component, OnInit } from "@angular/core";
import { AltInvest } from "./alternateinvestment.modal";
import { AccountService } from "../../shared";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { AlternateService } from "./alternateinvest.service";
@Component({
  selector: "jhi-alternative",
  templateUrl: "./alternateinvest.component.html",
  styles: []
})
export class AlternativeComponent implements OnInit {
  user: any;
  closeResult: string;
  commonid: number;
  conformkey: boolean;
  uid: any;
  getdata: any;
  out: any;
  alternateinvest: any;
  altInvest: AltInvest = new AltInvest();
  isSaving;

  constructor(
    private account: AccountService,
    private modalService: NgbModal,
    public activeModal: NgbActiveModal,
    public alternateservice: AlternateService
  ) {}

  ngOnInit() {
    this.FetchId();
  }
  FetchId(): Promise<any> {
    return this.account
      .get()
      .toPromise()
      .then(response => {
        this.user = response.body;
        console.log("user info of altInvest", this.user);
        this.altInvest.userId = this.user.id;
        console.log("in fetchid method", this.altInvest.userId);
        this.uid = this.altInvest.userId;
        this.getAltInvestment(this.uid);
      });
  }
  openAlt(altModal) {
    this.resetFieldValue();
    this.modalService
      .open(altModal, { ariaLabelledBy: "altModal" })
      .result.then(
        result => {
          this.closeResult = `Closed with: ${result}`;
          this.AltInvestment();
        },
        reason => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }
  openEditAltInvest(editAltModal, id) {
    this.commonid = id;
    this.getAltInvestById(this.commonid);
    this.modalService
      .open(editAltModal, { ariaLabelledBy: "editAltModal" })
      .result.then(
        result => {
          this.closeResult = `Closed with: ${result}`;
          this.update(this.commonid);
        },
        reason => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }
  openDeleteAltInvest(id) {
    this.commonid = id;
    this.delete(this.commonid);
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return "by pressing ESC";
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return "by clicking on a backdrop";
    } else {
      return `with: ${reason}`;
    }
  }
  AltInvestment() {
    this.alternateservice.AltInvestDetails(this.altInvest).subscribe(data => {
      alert("Added new Future and objective details");
      this.getAltInvestment(this.uid);
    });
  }
  getAltInvestment(uid) {
    this.alternateservice.getAltInvestmentByuid(this.uid).subscribe(res => {
      this.alternateinvest = res;
    });
  }
  getAltInvestById(commonid) {
    this.alternateservice.getAltInvestById(this.commonid).subscribe(res => {
      this.getdata = res;
      this.altInvest.num = this.getdata.num;
      this.altInvest.amount_invested = this.getdata.amount_invested;
      this.altInvest.fund_name = this.getdata.fund_name;
      this.altInvest.p_date = this.getdata.p_date;
      this.altInvest.market_value = this.getdata.market_value;
      this.altInvest.as_of_date = this.getdata.as_of_date;
      this.altInvest.notes = this.getdata.notes;
      this.altInvest.investor_name = this.getdata.investor_name;
      this.altInvest.investment_type = this.getdata.investment_type;
    });
  }
  update(commonid) {
    console.log("inside update id is ", this.commonid);
    this.altInvest.id = this.commonid;
    this.alternateservice.UpdateAltInvest(this.altInvest).subscribe(data => {
      alert("Added new altInvest details");
      this.getAltInvestment(this.uid);
    });
  }
  delete(commonid) {
    this.conformkey = confirm("really Want to delete?");
    if (this.conformkey === true) {
      console.log("inside delete id is ", this.commonid);
      this.altInvest.id = this.commonid;
      this.alternateservice
        .DeleteAltInvest(this.altInvest.id)
        .subscribe(data => {
          confirm("delete altInvest details");
          this.getAltInvestment(this.uid);
        });
    } else {
      this.getAltInvestment(this.uid);
    }
  }
  resetFieldValue() {
    this.altInvest.num = null;
    this.altInvest.amount_invested = null;
    this.altInvest.fund_name = "";
    this.altInvest.p_date = "";
    this.altInvest.market_value = null;
    this.altInvest.as_of_date = "";
    this.altInvest.notes = "";
    this.altInvest.investor_name = "";
    this.altInvest.investment_type = "";
  }
}
