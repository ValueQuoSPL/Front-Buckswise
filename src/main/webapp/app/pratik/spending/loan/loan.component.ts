import { Component, OnInit, Inject } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { AccountService, Principal } from 'app/shared';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { Loan } from 'app/pratik/spending/spending.model';
import { LoanService } from 'app/pratik/spending/spending.service';

@Component({
  selector: 'jhi-loan',
  templateUrl: './loan.component.html',
  styleUrls: ['../spending.component.css']
})
export class LoanComponent implements OnInit {
  uid;
  amount;
  expense;
  resource;
  nameField;
  editField;
  closeResult;
  dataChanged: boolean;
  isLoanData: boolean;
  changesSaved: boolean;
  dynamicLoanArray: any = [];
  loanDate = new FormControl(new Date());
  repDate = new FormControl(new Date());
  loan: Loan = new Loan();

  LoanTypeArray = [
    { name: 'Home Loan' },
    { name: 'Personal Loan' },
    { name: 'Auto Loan' },
    { name: 'Educational Loan' },
    { name: 'Property Loan' },
    { name: 'Gold Loan' },
    { name: 'Hand Loan' }
  ];

  InterestTypeArray = [
    { name: 'Fixed' },
    { name: 'Floating' },
    { name: 'Fixed-Floating' }
  ];
  getloan: any;

  constructor(
    private loanService: LoanService,
    private principal: Principal,
    private modalService: NgbModal,
    private accountService: AccountService
  ) {}

  ngOnInit() {
    // console.log('inside loan Init()');
    this.getUserid();
    // loan
    this.loan.check = false;
  }

  isAuthenticated() {
    return this.principal.isAuthenticated();
  }

  clear() {
    this.resource = '';
    this.amount = '';
    this.expense = '';

    this.loan.amnt = '';
    this.loan.applicant = '';
    this.loan.check = false;
    this.loan.intrest_type = '';
    this.loan.ldate = '';
    this.loan.lender = '';
    this.loan.loan_type = '';
    this.loan.rdate = '';
    this.loan.roi = '';
    this.loan.tenure = '';
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  getUserid() {
    return this.accountService
      .get()
      .toPromise()
      .then(response => {
        const account = response.body;
        if (account) {
          this.uid = account.id;
          // console.log('from loan userid is : ', this.uid);
          this.getLoanandDebt(this.uid);
        } else {
          console.log('cannot get user details check login ');
        }
      })
      .catch(err => {});
  }

  openLoan(loanModal) {
    this.modalService
      .open(loanModal, { ariaLabelledBy: 'loanModal' })
      .result.then(
        result => {
          this.closeResult = `Closed with: ${result}`;
          this.AddLoan();
        },
        reason => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  AddLoan() {
    this.dynamicLoanArray.push({
      ltype: this.loan.loan_type,
      lender: this.loan.lender,
      app: this.loan.applicant,
      amnt: this.loan.amnt,
      ldate: this.loanDate.value,
      check: this.loan.check,
      tenure: this.loan.tenure,
      itype: this.loan.intrest_type,
      roi: this.loan.roi,
      rdate: this.repDate.value
    });
    this.clear();
  }

  onLoanSave(): void {
    this.isLoanData = true;
    this.loan.userid = this.uid;
    this.loan.loanModelArray = this.dynamicLoanArray;
    this.loanService
      .PutLoan(this.loan.loanModelArray, this.uid)
      .subscribe(data => {
        alert('Loan Added successfully');
      });
  }

  getLoanandDebt(uid) {
    this.loanService.GetLoan(this.uid).subscribe(data => {
      this.dynamicLoanArray = data;
      // console.log('return from loandebts' + this.dynamicLoanArray);
      if (this.dynamicLoanArray.length === 0) {
        this.isLoanData = false;
      } else {
        this.isLoanData = true;
      }
    });
  }

  onEditLoan(id, loanModal) {
    this.editLoan(id);
    this.modalService
      .open(loanModal, { ariaLabelledBy: 'loanModal' })
      .result.then(
        result => {
          this.closeResult = `Closed with: ${result}`;
          this.fillLoan(id);
          // this.updateLoan(this.uid, id);
        },
        reason => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  editLoan(id) {
    for (let i = 0; i < this.dynamicLoanArray.length; i++) {
      if (this.dynamicLoanArray[i].id === id) {
        this.loan.loan_type = this.dynamicLoanArray[i].ltype;
        this.loan.lender = this.dynamicLoanArray[i].lenderName;
        this.loan.applicant = this.dynamicLoanArray[i].appName;
        this.loan.amnt = this.dynamicLoanArray[i].amount;
        this.loan.ldate = this.dynamicLoanArray[i].ldate;
        this.loan.check = this.dynamicLoanArray[i].checkType;
        this.loan.tenure = this.dynamicLoanArray[i].tenure;
        this.loan.intrest_type = this.dynamicLoanArray[i].itype;
        this.loan.roi = this.dynamicLoanArray[i].roi;
        this.loan.rdate = this.dynamicLoanArray[i].rdate;
      }
    }
  }

  fillLoan(id) {
    for (let i = 0; i < this.getloan.length; i++) {
      if (this.dynamicLoanArray[i].id === id) {
        this.dynamicLoanArray[i].id = this.loan.id;
        this.dynamicLoanArray[i].ltype = this.loan.loan_type;
        this.dynamicLoanArray[i].lenderName = this.loan.lender;
        this.dynamicLoanArray[i].appName = this.loan.applicant;
        this.dynamicLoanArray[i].amount = this.loan.amnt;
        this.dynamicLoanArray[i].ldate = this.loan.ldate;
        this.dynamicLoanArray[i].checkType = this.loan.check;
        this.dynamicLoanArray[i].tenure = this.loan.tenure;
        this.dynamicLoanArray[i].itype = this.loan.intrest_type;
        this.dynamicLoanArray[i].roi = this.loan.roi;
        this.dynamicLoanArray[i].rdate = this.loan.rdate;
      }
    }
  }
  updateLoan() {
    this.loan.userid = this.uid;
    // this.loan.id = id;
    // console.log(this.loan);
    this.loanService.PutLoan(this.loan, this.uid).subscribe(data => {
      alert('Your data saved');
    });
  }

  RemoveLoan(index, id) {
    this.loanService.DeleteLoan(id).subscribe(responce => {
      // console.log(responce);
    });
    this.dynamicLoanArray.splice(index, 1);
  }
}
