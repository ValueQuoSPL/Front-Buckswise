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
  totalUtility;
  loadUtility: boolean;
  dataChanged: boolean;
  changesSaved: boolean;
  isUtilityData: boolean;
  newLoanArray: any[];
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

  constructor(
    private loanService: LoanService,
    private principal: Principal,
    private modalService: NgbModal,
    private accountService: AccountService) { }

  ngOnInit() {
    console.log('inside loan Init()');
    this.getUserid();
        // loan
        this.loan.check = false;
  }

  isAuthenticated() {
    return this.principal.isAuthenticated();
  }

  getUserid() {
    return this.accountService.get().toPromise().then(response => {
        const account = response.body;
        if (account) {
          this.uid = account.id;
          console.log('from utility userid is : ', this.uid);
          // this.GetUtility();
        } else {
          console.log('cannot get user details check login ');
        }
      })
      .catch(err => {});
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
  // loan
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
  RemoveLoan(index) {
    this.dynamicLoanArray.splice(index, 1);
  }
  onLoanSave(): void {
    this.loan.userid = this.uid;
    this.loan.loanModelArray = this.dynamicLoanArray;
    this.loanService.PutLoan(this.loan.loanModelArray).subscribe(data => {
      alert('Loan Added successfully');
    });
  }
  onGetLoan(): void {
    console.log('inside getLoan()');
    this.loanService.GetLoan(this.uid).subscribe((response: any[]) => {
      this.dynamicLoanArray = response;
      console.log(this.dynamicLoanArray);
    });
    console.log('getLoan() success');
  }

}
