import { Component, OnInit } from "@angular/core";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { LiabilitiesService } from "app/my-assets/liabilities/liabilities.service";
import { AccountService, Principal, LoginModalService } from "app/shared";
import { FormControl } from "../../../../../../node_modules/@angular/forms";
import { Loan } from "app/pratik/spending/spending.model";
import { NgbModalRef } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "jhi-liabilities",
  templateUrl: "./liabilities.component.html",
  styleUrls: ["./liabilities.component.css"]
})
export class LiabilitiesComponent implements OnInit {
  steps = 0;
  closeResult: string;

  uid: any;
  account: Account;
  loan: any = [];
  shortLiability: any = [];
  longLiability: any = [];
  loanDate = new FormControl(new Date());
  repDate = new FormControl(new Date());
  tempArray: any = [];
  tempLongArray: any = [];
  loann: Loan = new Loan();
  modalRef: NgbModalRef;

  LoanTypeArray = [
    { name: "Home Loan" },
    { name: "Personal Loan" },
    { name: "Auto Loan" },
    { name: "Educational Loan" },
    { name: "Property Loan" },
    { name: "Gold Loan" },
    { name: "Hand Loan" }
  ];

  InterestTypeArray = [
    { name: "Fixed" },
    { name: "Floating" },
    { name: "Fixed-Floating" }
  ];
  constructor(
    private modalService: NgbModal,
    private liabilitiesService: LiabilitiesService,
    private accountService: AccountService,
    private principal: Principal,
    private loginModalService: LoginModalService
  ) {}

  ngOnInit() {
    this.getUserid();
    this.principal.identity().then(account => {
      this.account = account;
    });
  }
  getUserid() {
    console.log("inside get uid");
    // retrieve the userIdentity data from the server, update the identity object, and then resolve.
    return this.accountService
      .get()
      .toPromise()
      .then(response => {
        const account = response.body;
        if (account) {
          this.uid = account.id;
          console.log("from income userid is : ", this.uid);
          // this.onIncomeGet(this.uid);
          this.getLoanandDebt(this.uid);
        } else {
          console.log("cannot get user details check login ");
        }
      })
      .catch(err => {});
  }
  getLoanandDebt(uid) {
    this.liabilitiesService.getloan(this.uid).subscribe(data => {
      this.loan = data;
      console.log("return from loandebts", this.loan);
      this.divideLiability(this.loan);
    });
  }

  divideLiability(data) {
    console.log(data);
    for (let index = 0; index < data.length; index++) {
      const element = data[index].tenure;
      console.log(element);
      if (element <= 5) {
        // console.log(this.shortLiability.amount);
        this.shortLiability.push({
          amount: data[index].amount,
          appName: data[index].appName,
          checkType: data[index].checkType,
          id: data[index].id,
          itype: data[index].itype,
          ldate: data[index].ldate,
          lenderName: data[index].lenderName,
          ltype: data[index].ltype,
          outstandingpricipal: data[index].outstandingpricipal,
          rdate: data[index].rdate,
          roi: data[index].roi,
          tenure: data[index].tenure
        });
      } else {
        this.longLiability.push({
          amount: data[index].amount,
          appName: data[index].appName,
          checkType: data[index].checkType,
          id: data[index].id,
          itype: data[index].itype,
          ldate: data[index].ldate,
          lenderName: data[index].lenderName,
          ltype: data[index].ltype,
          outstandingpricipal: data[index].outstandingpricipal,
          rdate: data[index].rdate,
          roi: data[index].roi,
          tenure: data[index].tenure
        });
        console.log(this.longLiability);
      }
    }
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

  // income
  openShortTerm(id, incomeContent) {
    console.log("income modal open");
    this.fillModal(id);
    this.modalService
      .open(incomeContent, { ariaLabelledBy: "incomeModal" })
      .result.then(
        result => {
          this.closeResult = `Closed with: ${result}`;
          this.setLoan(id);
        },
        reason => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  openLongTerm(id, incomeContent) {
    console.log(id);
    this.fillModalData(id);
    this.modalService
      .open(incomeContent, { ariaLabelledBy: "incomeModal" })
      .result.then(
        result => {
          this.closeResult = `Closed with: ${result}`;
          this.setLoann(id);
        },
        reason => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }
  fillModal(id) {
    this.tempArray = this.shortLiability;
    for (let i = 0; i < this.tempArray.length; i++) {
      if (this.tempArray[i].id === id) {
        this.loann.loan_type = this.tempArray[i].ltype;
        this.loann.lender = this.tempArray[i].lenderName;
        this.loann.applicant = this.tempArray[i].appName;
        this.loann.amnt = this.tempArray[i].amount;
        this.loann.ldate = this.tempArray[i].ldate;
        this.loann.check = this.tempArray[i].checkType;
        this.loann.tenure = this.tempArray[i].tenure;
        this.loann.intrest_type = this.tempArray[i].itype;
        this.loann.roi = this.tempArray[i].roi;
        this.loann.rdate = this.tempArray[i].rdate;
      }
    }
  }
  setLoan(id) {
    for (let i = 0; i < this.shortLiability.length; i++) {
      if (this.shortLiability[i].id === id) {
        this.shortLiability[i].id = this.loann.id;
        this.shortLiability[i].ltype = this.loann.loan_type;
        this.shortLiability[i].lenderName = this.loann.lender;
        this.shortLiability[i].appName = this.loann.applicant;
        this.shortLiability[i].amount = this.loann.amnt;
        this.shortLiability[i].ldate = this.loann.ldate;
        this.shortLiability[i].checkType = this.loann.check;
        this.shortLiability[i].tenure = this.loann.tenure;
        this.shortLiability[i].itype = this.loann.intrest_type;
        this.shortLiability[i].roi = this.loann.roi;
        this.shortLiability[i].rdate = this.loann.rdate;
      }
    }
    this.UpdateLoan(id);
  }

  fillModalData(id) {
    this.tempLongArray = this.longLiability;
    for (let i = 0; i < this.tempLongArray.length; i++) {
      if (this.tempLongArray[i].id === id) {
        this.loann.loan_type = this.tempLongArray[i].ltype;
        this.loann.lender = this.tempLongArray[i].lenderName;
        this.loann.applicant = this.tempLongArray[i].appName;
        this.loann.amnt = this.tempLongArray[i].amount;
        this.loann.ldate = this.tempLongArray[i].ldate;
        this.loann.check = this.tempLongArray[i].checkType;
        this.loann.tenure = this.tempLongArray[i].tenure;
        this.loann.intrest_type = this.tempLongArray[i].itype;
        this.loann.roi = this.tempLongArray[i].roi;
        this.loann.rdate = this.tempLongArray[i].rdate;
      }
    }
  }
  setLoann(id) {
    for (let i = 0; i < this.longLiability.length; i++) {
      if (this.longLiability[i].id === id) {
        this.longLiability[i].id = this.loann.id;
        this.longLiability[i].ltype = this.loann.loan_type;
        this.longLiability[i].lenderName = this.loann.lender;
        this.longLiability[i].appName = this.loann.applicant;
        this.longLiability[i].amount = this.loann.amnt;
        this.longLiability[i].ldate = this.loann.ldate;
        this.longLiability[i].checkType = this.loann.check;
        this.longLiability[i].tenure = this.loann.tenure;
        this.longLiability[i].itype = this.loann.intrest_type;
        this.longLiability[i].roi = this.loann.roi;
        this.longLiability[i].rdate = this.loann.rdate;
      }
    }
    this.UpdateLoan(id);
  }
  UpdateLoan(id) {
    this.loann.id = id;
    this.loann.userid = this.uid;
    this.liabilitiesService.updateloan(this.loann, this.uid).subscribe();
  }
  isAuthenticated() {
    return this.principal.isAuthenticated();
  }
  login() {
    this.modalRef = this.loginModalService.open();
  }
}
