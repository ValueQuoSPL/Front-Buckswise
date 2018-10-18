import { Component, OnInit } from "@angular/core";
import { Cash } from "./cash.modal";
import { AccountService } from "../../shared";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { CashService } from "./cash.service";

@Component({
  selector: "jhi-cash",
  templateUrl: "./cash.component.html",
  styles: []
})
export class CashComponent implements OnInit {
  user: any;
  closeResult: string;
  commonid: number;
  conformkey: boolean;
  getdata: any;
  uid: any;
  out: any;
  CashDetails: any;
  cash: Cash = new Cash();
  isSaving;
  cashsource: any;
  editcash: any;

  constructor(
    private account: AccountService,
    private modalService: NgbModal,
    public activeModal: NgbActiveModal,
    public cashservice: CashService
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
        this.cash.userid = this.user.id;
        this.uid = this.user.id;
        this.getCashDetailsByuid(this.uid);
      });
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
  openCash(content) {
    this.resetFieldValue();
    this.modalService
      .open(content, { ariaLabelledBy: "cashModal" })
      .result.then(
        result => {
          this.closeResult = `Closed with: ${result}`;
          this.saveCashDetails();
        },
        reason => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }
  openEditCash(editCashModal, id) {
    this.resetFieldValue();
    this.commonid = id;
    this.getCashId(this.commonid);
    this.modalService
      .open(editCashModal, { ariaLabelledBy: "editCashModal" })
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
  opendeleteCash(id) {
    this.commonid = id;
    this.delete(this.commonid);
  }
  saveCashDetails() {
    this.cash.userid = this.uid;
    this.cash.cashsource = this.cashsource;
    this.cashservice.CashDetails(this.cash).subscribe(data => {
      alert("Added new Future and objective details");
      this.getCashDetailsByuid(this.uid);
    });
  }
  getCashDetailsByuid(uid) {
    this.cashservice.getCashDetailsByuid(this.uid).subscribe(res => {
      this.CashDetails = res;
    });
  }
  getCashId(commonid) {
    this.cashservice.getCashById(this.commonid).subscribe(res => {
      this.getdata = res;
      this.editcash = this.getdata.cashsource;
      this.cashsource = this.getdata.cashsource;
      if (this.editcash === "Bank") {
        this.cashsource = this.getdata.cashsource;
        this.cash.cashsource = this.getdata.cashsource;
        this.cash.notes = this.getdata.notes;
        this.cash.amount = this.getdata.amount;
        this.cash.userid = this.getdata.userid;
        this.cash.bankname = this.getdata.bankname;
        this.cash.accoounttype = this.getdata.accoounttype;
        this.cash.accountname = this.getdata.accountname;
      } else if (this.editcash === "Hand Loan") {
        this.cashsource = this.getdata.cashsource;
        this.cash.cashsource = this.getdata.cashsource;
        this.cash.amount = this.getdata.amount;
        this.cash.notes = this.getdata.notes;
        this.cash.userid = this.getdata.userid;
        this.cash.intrestrate = this.getdata.intrestrate;
        this.cash.handloanname = this.getdata.handloanname;
      } else if (this.editcash === "Personal possession") {
        this.cashsource = this.getdata.cashsource;
        this.cash.userid = this.getdata.userid;
        this.cash.cashsource = this.getdata.cashsource;
        this.cash.amount = this.getdata.amount;
        this.cash.notes = this.getdata.notes;
      } else if (this.editcash === "Other Source") {
        this.cashsource = this.getdata.cashsource;
        this.cash.cashsource = this.getdata.cashsource;
        this.cash.cashsource = this.getdata.cashsource;
        this.cash.amount = this.getdata.amount;
        this.cash.notes = this.getdata.notes;
        this.cash.userid = this.getdata.userid;
      }
    });
  }
  update(commonid) {
    this.cash.id = this.commonid;
    this.cashservice.UpdateCash(this.cash).subscribe(data => {
      alert("Added new stocks details");
      this.getCashDetailsByuid(this.uid);
    });
  }
  delete(commonid) {
    this.conformkey = confirm("really Want to delete?");
    if (this.conformkey === true) {
      this.cash.id = this.commonid;
      this.cashservice.DeleteStock(this.cash.id).subscribe(data => {
        confirm("delete stocks details");
        this.getCashDetailsByuid(this.uid);
      });
    } else {
      this.getCashDetailsByuid(this.uid);
    }
  }
  resetFieldValue() {
    this.cash.cashsource = "";
    this.cash.id = null;
    this.cash.amount = null;
    this.cash.notes = "";
    this.cash.userid = null;
    this.cash.bankname = "";
    this.cash.intrestrate = "";
    this.cash.accoounttype = "";
    this.cash.accountname = "";
    this.cash.handloanname = "";
  }
}
