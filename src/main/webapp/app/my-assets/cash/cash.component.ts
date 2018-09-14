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
        console.log("user info of cash", this.user);
        this.cash.userid = this.user.id;
        console.log("in fetchid method", this.cash.userid);
        this.uid = this.cash.userid;
        // this.getMyProfilebyid(this.uid);
        // this. getAltInvestment(this.uid)
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
    console.log("cashModal modal open");
    this.modalService
      .open(content, { ariaLabelledBy: "cashModal" })
      .result.then(
        result => {
          this.closeResult = `Closed with: ${result}`;
          this.saveCashDetails();
          // console.log('add income success');
        },
        reason => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }
  openEditCash(editCashModal, id) {
    this.commonid = id;
    console.log("editCashModal common id is", this.commonid);
    console.log("editCashModal modal open", id);
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
    console.log("opendeleteStocks common id is", this.commonid);
    console.log("opendeleteStocks modal open", id);
    this.delete(this.commonid);
  }
  saveCashDetails() {
    this.cashservice.CashDetails(this.cash).subscribe(data => {
      alert("Added new Future and objective details");
      this.getCashDetailsByuid(this.uid);
    });
  }
  getCashDetailsByuid(uid) {
    this.cashservice.getCashDetailsByuid(this.uid).subscribe(res => {
      console.log("this is responce of getCashDetailsByuid", res);
      this.CashDetails = res;
      console.log("responce of getCashDetailsByuid service", this.CashDetails);
    });
    // this.getsavePropertyByuid(this.uid5);
  }
  getCashId(commonid) {
    this.cashservice.getCashById(this.commonid).subscribe(res => {
      console.log("this is responce of getStockId ", res);
      this.getdata = res;
      this.cash.cash_source = this.getdata.cash_source;
      this.cash.amount = this.getdata.amount;
      this.cash.notes = this.getdata.notes;
    });
  }
  update(commonid) {
    console.log("inside update id is ", this.commonid);
    // this.getStockId(this.id)
    this.cash.id = this.commonid;
    // this.newid= this.stocks.id;
    // this.getStockId(this.newid);
    console.log("inside update", this.cash);
    this.cashservice.UpdateCash(this.cash).subscribe(data => {
      alert("Added new stocks details");
      this.getCashDetailsByuid(this.uid);
    });
  }
  delete(commonid) {
    this.conformkey = confirm("really Want to delete?");
    if (this.conformkey === true) {
      // this.conformkey = 'You pressed OK!';
      console.log("inside delete id is ", this.commonid);
      // this.getStockId(this.id)
      this.cash.id = this.commonid;
      console.log("inside delete", this.cash);
      this.cashservice.DeleteStock(this.cash.id).subscribe(data => {
        confirm("delete stocks details");
        this.getCashDetailsByuid(this.uid);
      });
    } else {
      this.getCashDetailsByuid(this.uid);
    }
  }
}
