import { Component, OnInit } from "@angular/core";
import { Eightyc } from "./eightyc.model";
import { EightycService } from "./eightyc.service";
import { AccountService } from "app/shared";
import {
  NgbModalRef,
  NgbModal,
  ModalDismissReasons
} from "@ng-bootstrap/ng-bootstrap";
@Component({
  selector: "jhi-eightyc",
  templateUrl: "./eightyc.component.html",
  styles: []
})
export class EightycComponent implements OnInit {
  user: any;
  userID: any;
  valid = true;
  out: any;
  eightyc: Eightyc = new Eightyc();
  uid: any;
  modalRef: NgbModalRef;
  nameField: any;
  editField;
  closeResult: string;
  changesSaved: boolean;
  dataChanged: boolean;

  constructor(
    private modalService: NgbModal,
    private eightycService: EightycService,
    private Accountservice: AccountService
  ) {}
  // // for eightyc

  ngOnInit() {
    this.FetchID();
  }
  FetchID(): Promise<any> {
    console.log("FetchID in eightyc");
    return this.Accountservice.get()
      .toPromise()
      .then(response => {
        this.user = response.body;
        console.log("user info", this.user);
        this.eightyc.uid = this.user.id;
        console.log("uid in fetchid ightyc", this.eightyc.uid);
        this.uid = this.eightyc.uid;
        console.log("uid", this.uid);
        // this.onEightycGet(this.uid);
      });
  }
  // // eightyc call function
  onEightycSave() {
    this.eightycService
      .save(this.eightyc)
      .subscribe(response => console.log(response));
  }
  // EightyC Reset
  resetEightyc() {
    this.eightyc.fixed = 0;
    this.eightyc.tution = 0;
    this.eightyc.nsc = 0;
    this.eightyc.nss = 0;
    this.eightyc.post = 0;
    this.eightyc.reinvest = 0;
    this.eightyc.licpremium = 0;
    this.eightyc.equity = 0;
    this.eightyc.pf = 0;
    this.eightyc.ppf = 0;
    this.eightyc.other = 0;
    this.eightyc.tutionfee = 0;
    this.eightyc.ulip = 0;
  }
  onEightycGet(uid) {
    //  console.log('in main ts', id);
    this.eightycService.geteightyc(uid).subscribe(res => {
      console.log(res);
      this.out = res;
      console.log(this.out);
    });
  }
  onEditEightycField(nameField, modal) {
    console.log("inside edit eightyc");
    this.nameField = nameField;
    console.log("inside edit eightyc", nameField);
    if (nameField === "Fixed Deposit in Schedule Bank") {
      this.nameField = "Amount";
      this.editField = this.out.fixed;
    } else if (nameField === "Tution Fees") {
      this.nameField = "Amount";
      this.editField = this.out.tution;
    } else if (nameField === "Deposite in NSC") {
      this.nameField = "Amount";
      this.editField = this.out.nsc;
    } else if (nameField === "Deposite in NSS") {
      this.nameField = "Amount";
      this.editField = this.out.nss;
    } else if (nameField === "Post Office saving Scheme") {
      this.nameField = "Amount";
      this.editField = this.out.post;
    } else if (nameField === "Interest on NSC Reinvested") {
      this.nameField = "Amount";
      this.editField = this.out.reinvest;
    } else if (nameField === "Life Insurance Premium") {
      this.nameField = "Amount";
      this.editField = this.out.licpremium;
    } else if (nameField === "Equity linked Savings Scheme") {
      this.nameField = "Amount";
      this.editField = this.out.equity;
    } else if (nameField === "Provident Fund") {
      this.nameField = "Amount";
      this.editField = this.out.pf;
    } else if (nameField === "Public Provident Fund") {
      this.nameField = "Amount";
      this.editField = this.out.ppf;
    } else if (nameField === "Others") {
      this.nameField = "Amount";
      this.editField = this.out.other;
    } else if (nameField === "ULIP of UTI/LIC") {
      this.nameField = "Amount";
      this.editField = this.out.ulip;
    }
    this.modalService
      .open(modal, { ariaLabelledBy: "eightycEditContent" })
      .result.then(
        result => {
          this.closeResult = `Closed with: ${result}`;
          this.FillEditEightyc(nameField);
        },
        reason => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
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
  FillEditEightyc(nameField) {
    console.log("inside fill edit eightyc");
    if (nameField === "Fixed Deposit in Schedule Bank") {
      this.out.fixed = this.editField;
      this.editField = "";
    } else if (nameField === "Tution Fees") {
      this.out.tution = this.editField;
      this.editField = "";
    } else if (nameField === "Deposite in NSC") {
      this.out.nsc = this.editField;
      this.editField = "";
    } else if (nameField === "Deposite in NSS") {
      this.out.nss = this.editField;
      this.editField = "";
    } else if (nameField === "Post Office saving Scheme") {
      this.out.post = this.editField;
      this.editField = "";
    } else if (nameField === "Interest on NSC Reinvested") {
      this.out.reinvest = this.editField;
      this.editField = "";
    } else if (nameField === "Life Insurance Premium") {
      this.out.licpremium = this.editField;
      this.editField = "";
    } else if (nameField === "Equity linked Savings Scheme") {
      this.out.equity = this.editField;
      this.editField = "";
    } else if (nameField === "Provident Fund") {
      this.out.pf = this.editField;
      this.editField = "";
    } else if (nameField === "Public Provident Fund") {
      this.out.ppf = this.editField;
      this.editField = "";
    } else if (nameField === "Others") {
      this.out.other = this.editField;
      this.editField = "";
    } else if (nameField === "ULIP of UTI/LIC") {
      this.out.ulip = this.editField;
      this.editField = "";
    }
  }
}
