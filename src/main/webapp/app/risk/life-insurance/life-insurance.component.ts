import { Component, OnInit } from '@angular/core';
import { Principal } from 'app/shared';
import { Router } from '@angular/router';
import { LifeInsurance } from 'app/risk/risk.model';
import { RiskService } from 'app/risk/risk.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import {
  CreditService,
  LoanService
} from 'app/pratik/spending/spending.service';
import { GoalselectService } from 'app/goal/goal-select/goalselect.service';

@Component({
  selector: 'jhi-life-insurance',
  templateUrl: './life-insurance.component.html'
})
export class LifeInsuranceComponent implements OnInit {
  account: Account;
  uid;
  lifeInsurance: LifeInsurance = new LifeInsurance();
  lifeArray = [];
  deleteFieldValue: any;
  liabilitiyArray: any;
  total: any;
  isSaving: any;
  save: any;
  clear: any;
  resetFieldValue: any;
  closeResult: string;
  public output: any;

  dynamicGoalArray: any;
  dynamicLoanArray: any = [];
  dynamicCreditArray: any = [];

  constructor(
    private principal: Principal,
    private router: Router,
    private riskService: RiskService,
    private modalService: NgbModal,
    private creditService: CreditService,
    private loanService: LoanService,
    private goalService: GoalselectService
  ) {}

  ngOnInit() {
    this.principal.identity().then(account => {
      this.account = account;
      this.uid = account.id;
    });

    this.getGoal(this.uid);
    this.getCredit(this.uid);
    this.getLoan(this.uid);
  }

  getGoal(uid) {
    console.log('inside risk getCredit()', uid);
    this.goalService.getgoalbyid(uid).subscribe((response: any[]) => {
      this.dynamicGoalArray = response;
      console.log(this.dynamicGoalArray);
    });
  }

  getCredit(uid) {
    console.log('inside risk getCredit()', uid);
    this.creditService.GetCredit(uid).subscribe((response: any[]) => {
      this.dynamicCreditArray = response;
      console.log(this.dynamicCreditArray);
    });
    console.log('getCredit() success');
  }

  getLoan(uid) {
    console.log('inside risk getLoan()', uid);
    this.loanService.GetLoan(uid).subscribe((response: any[]) => {
      this.dynamicLoanArray = response;
      console.log(this.dynamicLoanArray);
    });
    console.log('getLoan() success');
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

  // life
  openLife(lifeContent) {
    console.log('income modal open');

    this.modalService
      .open(lifeContent, { ariaLabelledBy: 'lifeModal' })
      .result.then(
        result => {
          this.closeResult = `Closed with: ${result}`;
          this.saveLifeInsurance();
          // console.log('add income success');
        },
        reason => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }
  saveLifeInsurance() {
    this.lifeArray.push({
      // id: this.id,
      risk_coverage: this.lifeInsurance.risk_coverage,
      expense_cover: this.lifeInsurance.expense_cover,
      total_yearly_expenses: this.lifeInsurance.total_yearly_expenses
    });
    this.riskService.SaveLifeInsurance(this.lifeInsurance).subscribe(data => {
      alert('Added new stocks details');
    });
  }
}
