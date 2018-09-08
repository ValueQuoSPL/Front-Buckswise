import { Component, OnInit } from "@angular/core";
import { ChitFund } from "./chitfund.modal";
import { AccountService } from "../../shared";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { ChitFundService } from "./chitfund.service";

@Component({
  selector: "jhi-chitfund",
  templateUrl: "./chitfund.component.html",
  styles: []
})
export class ChitFundComponent implements OnInit {
  user: any;
  closeResult: string;
  commonid: number;
  conformkey: boolean;
  uid: any;
  getdata: any;
  chitfundDetails: any;
  chitfund: ChitFund = new ChitFund();

  constructor(
    private account: AccountService,
    private modalService: NgbModal,
    public activeModal: NgbActiveModal,
    public chitfundService: ChitFundService
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
        console.log("user info of chitfund", this.user);
        this.chitfund.userid = this.user.id;
        console.log("in fetchid method", this.chitfund.userid);
        this.uid = this.chitfund.userid;
        this.getChitByuid(this.uid);
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
  openChit(content) {
    console.log("chitModal modal open");
    this.modalService
      .open(content, { ariaLabelledBy: "chitModal" })
      .result.then(
        result => {
          this.closeResult = `Closed with: ${result}`;
          this.saveChit();
          // console.log('add income success');
        },
        reason => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }
  openEditchit(editChitModal, id) {
    this.commonid = id;
    console.log("editChitModal common id is", this.commonid);
    console.log("editChitModal modal open", id);
    this.getChitById(this.commonid);
    this.modalService
      .open(editChitModal, { ariaLabelledBy: "editChitModal" })
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
  getChitById(commonid) {
    this.chitfundService.getChitById(this.commonid).subscribe(res => {
      console.log("this is responce of getStockId ", res);
      this.getdata = res;
      this.chitfund.chit_name = this.getdata.chit_name;
      this.chitfund.chit_holder_name = this.getdata.chit_holder_name;
      this.chitfund.chit_start_date = this.getdata.chit_start_date;
      this.chitfund.chit_holder_name = this.getdata.chit_holder_name;
      this.chitfund.chit_value = this.getdata.chit_value;
      this.chitfund.tenure = this.getdata.tenure;
      this.chitfund.m_payment = this.getdata.m_payment;
      this.chitfund.current_value = this.getdata.current_value;
      this.chitfund.isCashed = this.getdata.isCashed;
      this.chitfund.notes = this.getdata.notes;
    });
  }
  opendeleteChit(id) {
    this.commonid = id;
    console.log("opendeleteStocks common id is", this.commonid);
    console.log("opendeleteStocks modal open", id);
    this.delete(this.commonid);
  }
  saveChit() {
    this.chitfundService.ChitFundDetails(this.chitfund).subscribe(data => {
      alert("Added new Future and objective details");
      this.getChitByuid(this.uid);
    });
  }
  getChitByuid(uid) {
    this.chitfundService.getChitByuid(this.uid).subscribe(res => {
      console.log("this is responce of getChitByuid", res);
      this.chitfundDetails = res;
      console.log("responce of getChitByuid service", this.chitfundDetails);
    });
    // this.getFAOByUid(this.uid7)
  }
  update(commonid) {
    console.log("inside update id is ", this.commonid);
    // this.getStockId(this.id)
    this.chitfund.id = this.commonid;
    // this.newid= this.stocks.id;
    // this.getStockId(this.newid);
    console.log("inside update", this.chitfund);
    this.chitfundService.UpdateChit(this.chitfund).subscribe(data => {
      alert("Added new chit details");
      this.getChitByuid(this.uid);
    });
  }
  delete(commonid) {
    this.conformkey = confirm("really Want to delete?");
    if (this.conformkey == true) {
      // this.conformkey = "You pressed OK!";
      console.log("inside delete id is ", this.commonid);
      // this.getStockId(this.id)
      this.chitfund.id = this.commonid;
      console.log("inside delete", this.chitfund);
      this.chitfundService.DeleteChit(this.chitfund.id).subscribe(data => {
        confirm("delete chit details");
        this.getChitByuid(this.uid);
      });
    } else {
      this.getChitByuid(this.uid);
    }
  }
}
