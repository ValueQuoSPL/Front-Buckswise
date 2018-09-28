import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { LifeInsurance } from "app/risk/risk.model";
import { RiskService } from "app/risk/risk.service";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import {
  CreditService,
  LoanService
} from "app/pratik/spending/spending.service";
import { GoalselectService } from "app/goal/goal-select/goalselect.service";
import { Principal, AccountService } from "app/shared";

@Component({
  selector: "jhi-life-insurance",
  templateUrl: "./life-insurance.component.html",
  styleUrls: ["./life-insurance.component.css"]
})
export class LifeInsuranceComponent implements OnInit {
  account: Account;
  uid;
  lifeInsurance: LifeInsurance = new LifeInsurance();
  lifeArray = [];
  deleteFieldValue: any;
  liabilitiyArray: any;
  liability: any = [];
  total: any;
  isSaving: any;
  save: any;
  clear: any;
  resetFieldValue: any;
  closeResult: string;
  public output: any;
  commanId: any;

  checkLife: any;
  dynamicGoalArray: any;
  dynamicLoanArray: any = [];
  dynamicCreditArray: any = [];
  updateGoalArray: any = [];
  familyName: any = [];
  check;
  goalLife: any;
  futurecost: any;
  outstandingpricipal: any;
  result: any;
  i;
  goalId: any;
  tick: any;
  ischecked;
  unchecked;

  constructor(
    private principal: Principal,
    private accountService: AccountService,
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
    this.getUserid();
  }
  checklife(checked, id) {
    this.goalId = id;
    // this.checkLife = event.target.checked;
    this.checkLife = checked;
    console.log(checked);
    console.log(this.checkLife);
    this.updateGoalArray.push({
      id: this.goalId,
      check: this.checkLife
    });
    this.riskService.updateGoal(this.updateGoalArray).subscribe(data => {});
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
          console.log("from life userid is : ", this.uid);
          this.getGoal(this.uid);
          this.getCredit(this.uid);
          this.getLoan(this.uid);
          this.onGetLife();
          this.getName(this.uid);
        } else {
          console.log("cannot get user details check login ");
        }
      })
      .catch(err => {});
  }

  getGoal(uid) {
    console.log("inside risk getCredit()", uid);
    this.goalService.getgoalbyid(uid).subscribe((response: any[]) => {
      this.dynamicGoalArray = response;
      console.log(this.dynamicGoalArray);
      for (let i = 0; i < this.dynamicGoalArray.length; i++) {
        this.futurecost = this.dynamicGoalArray[i].futurecost;
        this.ischecked = this.dynamicGoalArray[i].check;
        console.log(this.ischecked);
      }
    });
  }

  getCredit(uid) {
    console.log("inside risk getCredit()", uid);
    this.creditService.GetCredit(uid).subscribe((response: any[]) => {
      this.dynamicCreditArray = response;
      console.log(this.dynamicCreditArray);
    });
    console.log("getCredit() success");
  }

  getLoan(uid) {
    console.log("inside risk getLoan()", uid);
    this.loanService.GetLoan(uid).subscribe((response: any[]) => {
      this.dynamicLoanArray = response;
      console.log(this.dynamicLoanArray);
      for (let i = 0; i < this.dynamicLoanArray.length; i++) {
        console.log(this.dynamicLoanArray[i].checkType);
        const type = this.dynamicLoanArray[i].checkType;
        this.outstandingpricipal = this.dynamicLoanArray[i].outstandingpricipal;
        // console.log(type);
        if (type === true) {
          console.log("if");
        } else {
          // console.log('under esle');
          this.liability.push(this.dynamicLoanArray[i]);
        }
      }
      // console.log('liability', this.liability);
      this.check = this.dynamicLoanArray.checkType;
    });
    console.log("getLoan() success");
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

  // life
  openLife(lifeContent) {
    console.log("income modal open");
    this.modalService
      .open(lifeContent, { ariaLabelledBy: "lifeModal" })
      .result.then(
        result => {
          this.closeResult = `Closed with: ${result}`;
          this.sum();
          this.saveLifeInsurance();
          // console.log('add income success');
        },
        reason => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  sum() {
    this.lifeInsurance.total = +this.futurecost + +this.outstandingpricipal;
    console.log(this.futurecost);
    console.log(this.outstandingpricipal);
    console.log(this.lifeInsurance.total);
  }

  saveLifeInsurance() {
    this.lifeInsurance.userid = this.uid;

    this.lifeArray.push({
      // id: this.id,
      risk_coverage: this.lifeInsurance.risk_coverage,
      expense_cover: this.lifeInsurance.expense_cover,
      // total_yearly_expenses: this.lifeInsurance.total_yearly_expenses
      total_yearly_expenses: this.lifeInsurance.total,
      userid: this.lifeInsurance.userid
    });
    this.riskService.SaveLifeInsurance(this.lifeInsurance).subscribe(data => {
      alert("Added new stocks details");
      this.onGetLife();
    });
  }

  opnLife(id, lifeContent) {
    console.log(id);
    this.getGoal(this.uid);
    this.commanId = id;
    this.modalService
      .open(lifeContent, { ariaLabelledBy: "lifeModal" })
      .result.then(
        result => {
          this.closeResult = `Closed with: ${result}`;
          this.update(this.commanId);
        },
        reason => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }
  // deleteField(index, id) {}
  onGetLife() {
    this.riskService.getLifeInsurance(this.uid).subscribe(data => {
      this.goalLife = data;
      console.log(this.goalLife);
    });
  }
  // update service for lifeInsurance
  update(commanId) {
    this.lifeInsurance.id = this.commanId;
    this.lifeInsurance.userid = this.uid;
    this.riskService.updatelifeInsurance(this.lifeInsurance).subscribe(data => {
      alert("data saved");
      this.onGetLife();
    });
  }

  deleteField(index, id) {
    this.riskService.delete(id).subscribe(data => {
      alert("deleted");
    });
    this.goalLife.splice(index, 1);
  }
  // getid
  getid(id) {
    this.riskService.getbyid(id).subscribe(data => {
      this.result = data;
      this.lifeInsurance.id = this.result.id;
      this.lifeInsurance.userid = this.result.userid;
      this.lifeInsurance.expense_cover = this.result.expense_cover;
      this.lifeInsurance.total = this.result.total;
      this.lifeInsurance.risk_coverage = this.result.risk_coverage;
    });
  }

  // get family profile name
  getName(uid) {
    this.riskService.getFamilyName(this.uid).subscribe(data => {
      this.familyName = data;
      console.log(this.familyName);
    });
  }

  get(id) {
    let flag = 0;
    for (let i = 0; i < this.dynamicGoalArray.length; i++) {
      const goal = this.dynamicGoalArray[i];
      if (goal.id === id) {
        const value = goal.check;
        if (value === "true") {
          flag = 1;
          return true;
        } else {
          flag = 0;
          return false;
        }
      }
    }
  }
}
