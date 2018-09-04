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
  tempLoanArray: any = [];
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

  constructor(
    private loanService: LoanService,
    private principal: Principal,
    private modalService: NgbModal,
    private accountService: AccountService
  ) {}

  ngOnInit() {
    // // console.log('inside loan Init()');
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
      this.clear();
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      this.clear();
      return 'by clicking on a backdrop';
    } else {
      this.clear();
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
          // // console.log('from loan userid is : ', this.uid);
          this.getLoanandDebt();
        } else {
          // console.log('cannot get user details check login ');
        }
      })
      .catch(err => {});
  }

  getLoanandDebt() {
    this.loanService.GetLoan(this.uid).subscribe((response: any[]) => {
      // // console.log(response);
      this.dynamicLoanArray = response;
      // console.log(this.dynamicLoanArray);
      if (this.dynamicLoanArray.length === 0) {
        this.isLoanData = false;
        // // console.log(this.isLoanData);
      } else {
        this.isLoanData = true;
        // // console.log(this.isLoanData);
      }
    });
    // // console.log(this.isLoanData);
  }

  openLoan(loanModal) {
    this.modalService
      .open(loanModal, { ariaLabelledBy: 'loanModal' })
      .result.then(
        result => {
          this.closeResult = `Closed with: ${result}`;
          // // console.log(this.closeResult);
          this.AddLoan();
        },
        reason => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
          this.clear();
        }
      );
  }

  AddLoan() {
    this.dynamicLoanArray.push({
      ltype: this.loan.loan_type,
      lenderName: this.loan.lender,
      app: this.loan.applicant,
      amount: this.loan.amnt,
      ldate: this.loanDate.value,
      check: this.loan.check,
      tenure: this.loan.tenure,
      itype: this.loan.intrest_type,
      roi: this.loan.roi,
      rdate: this.repDate.value
    });
    this.loan.loanModelArray.pop();
    this.loan.loanModelArray.push({
      userid: this.uid,
      ltype: this.loan.loan_type,
      lenderName: this.loan.lender,
      app: this.loan.applicant,
      amount: this.loan.amnt,
      ldate: this.loanDate.value,
      check: this.loan.check,
      tenure: this.loan.tenure,
      itype: this.loan.intrest_type,
      roi: this.loan.roi,
      rdate: this.repDate.value
    });
    this.onLoanSave();
    this.clear();
  }

  onLoanSave(): void {
    this.isLoanData = true;
    // console.log(this.loan.loanModelArray);

    this.loanService
      .PostLoan(this.loan.loanModelArray)
      .subscribe(data => {
        alert('Loan Added successfully');
        this.getLoanandDebt();
      });
  }

  onEditLoan(id, loanModal) {
    this.fillModal(id);
    this.modalService
      .open(loanModal, { ariaLabelledBy: 'loanModal' })
      .result.then(
        result => {
          this.closeResult = `Closed with: ${result}`;
          this.fillLoan(id);
        },
        reason => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  fillModal(id) {
    this.tempLoanArray = this.dynamicLoanArray;
    for (let i = 0; i < this.tempLoanArray.length; i++) {
      if (this.tempLoanArray[i].id === id) {
        this.loan.loan_type = this.tempLoanArray[i].ltype;
        this.loan.lender = this.tempLoanArray[i].lenderName;
        this.loan.applicant = this.tempLoanArray[i].appName;
        this.loan.amnt = this.tempLoanArray[i].amount;
        this.loan.ldate = this.tempLoanArray[i].ldate;
        this.loan.check = this.tempLoanArray[i].checkType;
        this.loan.tenure = this.tempLoanArray[i].tenure;
        this.loan.intrest_type = this.tempLoanArray[i].itype;
        this.loan.roi = this.tempLoanArray[i].roi;
        this.loan.rdate = this.tempLoanArray[i].rdate;
      }
    }
  }

  fillLoan(id) {
    for (let i = 0; i < this.dynamicLoanArray.length; i++) {
      if (this.dynamicLoanArray[i].id === id) {
        this.dynamicLoanArray[i].id = this.loan.id;
        this.dynamicLoanArray[i].ltype = this.loan.loan_type;
        this.dynamicLoanArray[i].lenderName = this.loan.lender;
        // // console.log(this.dynamicLoanArray[i].lenderName);
        this.dynamicLoanArray[i].appName = this.loan.applicant;
        this.dynamicLoanArray[i].amount = this.loan.amnt;
        // // console.log(this.dynamicLoanArray[i].amount);
        this.dynamicLoanArray[i].ldate = this.loan.ldate;
        this.dynamicLoanArray[i].checkType = this.loan.check;
        this.dynamicLoanArray[i].tenure = this.loan.tenure;
        this.dynamicLoanArray[i].itype = this.loan.intrest_type;
        this.dynamicLoanArray[i].roi = this.loan.roi;
        this.dynamicLoanArray[i].rdate = this.loan.rdate;
      }
    }
    this.UpdateLoan(id);
  }
  UpdateLoan(id) {
    this.loan.id = id;
    this.loan.userid = this.uid;
    this.loanService.PutLoan(this.loan , this.uid).subscribe(res => {
      this.clear();
      alert('Your data saved');
    });
  }

  RemoveLoan(index, id) {
    this.loanService.DeleteLoan(id).subscribe(responce => {
      // // console.log(responce);
    });
    this.dynamicLoanArray.splice(index, 1);
  }
}
