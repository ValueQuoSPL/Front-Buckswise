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
  eightycResponse: any = [];
  eightyc: Eightyc = new Eightyc();
  uid: any;
  modalRef: NgbModalRef;
  nameField: any;
  editField;
  closeResult: string;
  changesSaved: boolean;
  dataChanged: boolean;
  eightycResponseput: any = [];

  constructor(
    private modalService: NgbModal,
    private eightycService: EightycService,
    private Accountservice: AccountService
  ) {}
  // // for eightyc

  ngOnInit() {
    this.FetchID();
    this.changesSaved = true;
  }

  FetchID(): Promise<any> {
    // console.log('FetchID in eightyc');
    return this.Accountservice.get()
      .toPromise()
      .then(response => {
        this.user = response.body;
        // console.log('user info', this.user);
        this.eightyc.uid = this.user.id;
        // console.log('uid in fetchid ightyc', this.eightyc.uid);
        this.uid = this.eightyc.uid;
        // console.log('uid', this.uid);
        this.onEightycGet(this.uid);
      });
  }

  // // eightyc call function
  onEightycSave() {
    this.eightycService.save(this.eightyc).subscribe(response => {
      alert("Your data saved successfully");
      this.changesSaved = true;
      // console.log(response);
    });
    this.valid = true;
  }
  updateEightyc() {
    console.log(" in update method eightyc", this.eightyc);
    this.eightycService.PutEightyc(this.eightyc).subscribe(data => {
      alert("Your data update");
      this.changesSaved = true;
    });
  }
  // // EightyC Reset
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
    console.log("in eightycget ts uid", this.uid);
    this.eightycService.geteightyc(this.uid).subscribe(res => {
      console.log(res);
      this.eightycResponse = res;
      console.log("eightyc data in eightycResponse", this.eightycResponse);
      for (let index = 0; index < this.eightycResponse.length; index++) {
        const element = this.eightycResponse[index];
        this.eightyc.fixed = element.fixed;
        this.eightyc.tution = element.tution;
        this.eightyc.nsc = element.nsc;
        this.eightyc.nss = element.nss;
        this.eightyc.post = element.post;
        this.eightyc.reinvest = element.reinvest;
        this.eightyc.licpremium = element.licpremium;
        this.eightyc.equity = element.equity;
        this.eightyc.pf = element.pf;
        this.eightyc.ppf = element.ppf;
        this.eightyc.other = element.other;
        this.eightyc.ulip = element.ulip;
        this.eightyc.uid = element.uid;
        this.eightyc.id = element.id;
        console.log("eightycResponse id", this.eightyc.id);
      }
      if (this.eightycResponse.length === 0) {
        this.valid = false;
        console.log("in if valid value", this.valid);
      } else {
        this.valid = true;
        console.log("in else valid value", this.valid);
      }
    });

    //  // console.log('in main ts', id);
    // this.eightycService.geteightyc(this.uid).subscribe(res => {
    //   // console.log(res);
    //   this.eightycResponse = res;
    //   console.log(this.eightycResponse);
    // });
  }
  onEditEightycField(nameField, eightycEditContent) {
    // console.log('inside edit eightyc');
    this.nameField = nameField;
    // console.log('inside edit eightyc', nameField);
    if (nameField === "Fixed Deposit in Schedule Bank") {
      this.nameField = "Amount";
      this.editField = this.eightycResponse[0].fixed;
    } else if (nameField === "Tution Fees") {
      this.nameField = "Amount";
      this.editField = this.eightycResponse[0].tution;
    } else if (nameField === "Deposite in NSC") {
      this.nameField = "Amount";
      this.editField = this.eightycResponse[0].nsc;
    } else if (nameField === "Deposite in NSS") {
      this.nameField = "Amount";
      this.editField = this.eightycResponse[0].nss;
    } else if (nameField === "Post Office saving Scheme") {
      this.nameField = "Amount";
      this.editField = this.eightycResponse[0].post;
    } else if (nameField === "Interest on NSC Reinvested") {
      this.nameField = "Amount";
      this.editField = this.eightycResponse[0].reinvest;
    } else if (nameField === "Life Insurance Premium") {
      this.nameField = "Amount";
      this.editField = this.eightycResponse[0].licpremium;
    } else if (nameField === "Equity linked Savings Scheme") {
      this.nameField = "Amount";
      this.editField = this.eightycResponse[0].equity;
    } else if (nameField === "Provident Fund") {
      this.nameField = "Amount";
      this.editField = this.eightycResponse[0].pf;
    } else if (nameField === "Public Provident Fund") {
      this.nameField = "Amount";
      this.editField = this.eightycResponse[0].ppf;
    } else if (nameField === "Others") {
      this.nameField = "Amount";
      this.editField = this.eightycResponse[0].other;
    } else if (nameField === "ULIP of UTI/LIC") {
      this.nameField = "Amount";
      this.editField = this.eightycResponse[0].ulip;
    }
    this.modalService
      .open(eightycEditContent, { ariaLabelledBy: "eightycEditContent" })
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
    // console.log('inside fill edit eightyc');
    if (nameField === "Fixed Deposit in Schedule Bank") {
      this.eightyc.fixed = this.editField;
      this.eightycResponse[0].fixed = this.eightyc.fixed;
      // this.editField = '';
    } else if (nameField === "Tution Fees") {
      this.eightyc.tution = this.editField;
      this.eightycResponse[0].tution = this.eightyc.tution;
      //  this.editField = '';
    } else if (nameField === "Deposite in NSC") {
      this.eightyc.nsc = this.editField;
      this.eightycResponse[0].nsc = this.eightyc.nsc;
      //  this.editField = '';
    } else if (nameField === "Deposite in NSS") {
      this.eightyc.nss = this.editField;
      this.eightycResponse[0].nss = this.eightyc.nss;
      // this.editField = '';
    } else if (nameField === "Post Office saving Scheme") {
      this.eightyc.post = this.editField;
      this.eightycResponse[0].post = this.eightyc.post;
      // this.editField = '';
    } else if (nameField === "Interest on NSC Reinvested") {
      this.eightyc.reinvest = this.editField;
      this.eightycResponse[0].reinvest = this.eightyc.reinvest;
      //  this.editField = '';
    } else if (nameField === "Life Insurance Premium") {
      this.eightyc.licpremium = this.editField;
      this.eightycResponse[0].licpremium = this.eightyc.licpremium;
      //  this.editField = '';
    } else if (nameField === "Equity linked Savings Scheme") {
      this.eightyc.equity = this.editField;
      this.eightycResponse[0].equity = this.eightyc.equity;
      // this.editField = '';
    } else if (nameField === "Provident Fund") {
      this.eightyc.pf = this.editField;
      this.eightycResponse[0].pf = this.eightyc.pf;
      // this.editField = '';
    } else if (nameField === "Public Provident Fund") {
      this.eightyc.ppf = this.editField;
      this.eightycResponse[0].ppf = this.eightyc.ppf;
      // this.editField = '';
    } else if (nameField === "Others") {
      this.eightyc.other = this.editField;
      this.eightycResponse[0].other = this.eightyc.other;
      // this.editField = '';
    } else if (nameField === "ULIP of UTI/LIC") {
      this.eightyc.ulip = this.editField;
      this.eightycResponse[0].ulip = this.eightyc.ulip;
      // this.editField = '';
    }
  }
}
