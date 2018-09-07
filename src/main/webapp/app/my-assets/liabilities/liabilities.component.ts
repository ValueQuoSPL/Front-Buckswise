import { Component, OnInit } from "@angular/core";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { LiabilitiesService } from "app/my-assets/liabilities/liabilities.service";
import { AccountService, Principal } from "app/shared";
import { FormControl } from "../../../../../../node_modules/@angular/forms";
import { Loan } from "app/pratik";

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
  getloan: any = [];
  getloan2: any = [];
  loanDate = new FormControl(new Date());
  repDate = new FormControl(new Date());
  loan: Loan = new Loan();
  loanArray: any = [];

  //  Dropdown Arrays
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
    private principal: Principal
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
  // filling laon data to view page.
  editLoan(id) {
    this.loanArray = this.getloan;
    for (let i = 0; i < this.loanArray.length; i++) {
      if (this.loanArray[i].id === id) {
        this.loan.loan_type = this.loanArray[i].ltype;
        this.loan.lender = this.loanArray[i].lenderName;
        this.loan.applicant = this.loanArray[i].appName;
        this.loan.amnt = this.loanArray[i].amount;
        this.loan.ldate = this.loanArray[i].ldate;
        this.loan.check = this.loanArray[i].checkType;
        this.loan.tenure = this.loanArray[i].tenure;
        this.loan.intrest_type = this.loanArray[i].itype;
        this.loan.roi = this.loanArray[i].roi;
        this.loan.rdate = this.loanArray[i].rdate;
      }
    }
  }

  // edit from modal and reflect to view page
  fillLoan(id) {
    for (let i = 0; i < this.getloan.length; i++) {
      if (this.getloan[i].id === id) {
        this.getloan[i].id = this.loan.id;
        this.getloan[i].ltype = this.loan.loan_type;
        this.getloan[i].lenderName = this.loan.lender;
        this.getloan[i].appName = this.loan.applicant;
        this.getloan[i].amount = this.loan.amnt;
        this.getloan[i].ldate = this.loan.ldate;
        this.getloan[i].checkType = this.loan.check;
        this.getloan[i].tenure = this.loan.tenure;
        this.getloan[i].itype = this.loan.intrest_type;
        this.getloan[i].roi = this.loan.roi;
        this.getloan[i].rdate = this.loan.rdate;
      }
    }
  }

  getLoanandDebt(uid) {
    this.liabilitiesService.getloan(this.uid).subscribe(data => {
      this.getloan = data;
      // console.log('return from loandebts' + this.getloan);
    });
  }

  updateLoan(uid, id) {
    this.loan.userid = this.uid;
    this.loan.id = id;
    console.log(this.loan);
    this.liabilitiesService.updateloan(this.loan, this.uid).subscribe(data => {
      alert("Your data saved");
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
  // loan
  openLoan(id, loanModal) {
    this.editLoan(id);
    this.modalService
      .open(loanModal, { ariaLabelledBy: "loanModal" })
      .result.then(
        result => {
          this.closeResult = `Closed with: ${result}`;
          this.fillLoan(id);
          this.updateLoan(this.uid, id);
        },
        reason => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  // income
  openShortTerm(incomeContent) {
    console.log("income modal open");

    this.modalService
      .open(incomeContent, { ariaLabelledBy: "incomeModal" })
      .result.then(
        result => {
          this.closeResult = `Closed with: ${result}`;
          this.saveShortTerm();
          // console.log('add income success');
        },
        reason => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  saveShortTerm() {}
}
