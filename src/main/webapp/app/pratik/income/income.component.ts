import { Component, OnInit } from "@angular/core";
import { Income } from "app/pratik/spending/spending.model";
import { IncomeService } from "app/pratik/spending/spending.service";
import { AccountService, LoginModalService, Principal } from "app/shared";
import {
  NgbModal,
  ModalDismissReasons,
  NgbModalRef
} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "jhi-income",
  templateUrl: "./income.component.html",
  styleUrls: ["./income.css"]
})
export class IncomeComponent implements OnInit {
  resource: any;
  amount: any;
  dynamicIncome: any = [];
  IncomeArray: any = [];
  tempIncomeArray: any = [];
  totalIncome: number;
  income: Income = new Income();
  closeResult: string;
  step = 0;
  uid: any;
  modalRef: NgbModalRef;
  account: Account;
  isIncomeData;
  loadIncome = false;
  dynamicTotal: number;

  constructor(
    private accountService: AccountService,
    private modalService: NgbModal,
    private incomeService: IncomeService,
    private loginModalService: LoginModalService,
    private principal: Principal
  ) {}

  ngOnInit() {
    console.log("income start");
    this.getUserid();
    this.totalIncome = 0;
    this.dynamicTotal = 0;
    this.income.incomeSalary = 0;
    this.income.incomeAward = 0;
    this.income.incomeBonus = 0;
    this.income.incomeDeposit = 0;
    this.income.incomePension = 0;
    this.income.incomeRental = 0;
    this.income.incomeSaving = 0;
    this.isAuthenticated();
  }

  isAuthenticated() {
    return this.principal.isAuthenticated();
  }

  login() {
    this.modalRef = this.loginModalService.open();
  }

  getUserid() {
    // retrieve the userIdentity data from the server, update the identity object, and then resolve.
    return this.accountService
      .get()
      .toPromise()
      .then(response => {
        const account = response.body;
        if (account) {
          this.uid = account.id;
          console.log("from income userid is : ", this.uid);
          // this.isIncomeComplete(this.uid);
          this.onIncomeGet(this.uid);
        } else {
          console.log("cannot get user details check login ");
        }
      })
      .catch(err => {});
  }

  clear() {
    this.resource = "";
    this.amount = "";
  }

  reset() {
    prompt("All saved data of Income will be lost. Are you sure to continue");
    this.totalIncome = 0;
    this.income.incomeSalary = 0;
    this.income.incomeAward = 0;
    this.income.incomeBonus = 0;
    this.income.incomeDeposit = 0;
    this.income.incomePension = 0;
    this.income.incomeRental = 0;
    this.income.incomeSaving = 0;
  }

  isIncomeComplete(uid) {
    console.log("checking income data is filled or not");
    this.onIncomeGet(uid);
  }

  onIncomeGet(uid) {
    console.log("calling service to get income data");
    this.incomeService.GetIncome(this.uid).subscribe((response: any[]) => {
      this.tempIncomeArray = response;
      console.log("From tempIncomeArray : ", this.tempIncomeArray);
      if (this.tempIncomeArray.length === 0) {
        console.log("income data is empty");
        this.isIncomeData = false;
      } else {
        console.log("income data is filled");
        this.fillIncomeData();
        this.isIncomeData = true;
      }
    });
  }

  fillIncomeData() {
    this.IncomeArray = this.tempIncomeArray;
    console.log(this.IncomeArray);
    for (let i = 0; i < this.IncomeArray.length; i++) {
      // console.log('from IncomeArray : ', this.IncomeArray[i]);
      if (this.IncomeArray[i].name === "incomeSalary") {
        this.income.incomeSalary = +this.IncomeArray[i].amount;
        // console.log(this.income.incomeSalary);
      } else if (this.IncomeArray[i].name === "incomeAward") {
        this.income.incomeAward = +this.IncomeArray[i].amount;
        // console.log(this.income.incomeAward);
      } else if (this.IncomeArray[i].name === "incomeBonus") {
        this.income.incomeBonus = +this.IncomeArray[i].amount;
        // console.log(this.income.incomeBonus);
      } else if (this.IncomeArray[i].name === "incomePension") {
        this.income.incomePension = +this.IncomeArray[i].amount;
        // console.log(this.income.incomePension);
      } else if (this.IncomeArray[i].name === "incomeSaving") {
        this.income.incomeSaving = +this.IncomeArray[i].amount;
        // console.log(this.income.incomeSaving);
      } else if (this.IncomeArray[i].name === "incomeDeposit") {
        this.income.incomeDeposit = +this.IncomeArray[i].amount;
        // console.log(this.income.incomeDeposit);
      } else if (this.IncomeArray[i].name === "incomeRental") {
        this.income.incomeRental = +this.IncomeArray[i].amount;
        // console.log(this.income.incomeRental);
      } else if (this.IncomeArray[i].name !== "userid") {
        this.dynamicIncome.push({
          name: this.IncomeArray[i].name,
          value: this.IncomeArray[i].amount
        });
        this.calcTotalIncome();
        this.calcIncomeTotal();
        // this.clear();
        console.log(this.dynamicIncome);
      }
    }
    this.loadIncome = true;
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

  openIncome(incomeContent) {
    console.log("income modal open");

    this.modalService
      .open(incomeContent, { ariaLabelledBy: "incomeModal" })
      .result.then(
        result => {
          this.closeResult = `Closed with: ${result}`;
          this.AddIncome();
          // console.log('add income success');
        },
        reason => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  calcTotalIncome() {
    this.totalIncome = 0;
    for (let j = 0; j < this.IncomeArray.length; j++) {
      if (this.IncomeArray[j].name !== "userid") {
        // console.log(this.IncomeArray[j].name, this.IncomeArray[j].amount);
        this.totalIncome = +this.totalIncome + +this.IncomeArray[j].amount;
      }
    }
    console.log(this.totalIncome);
  }

  calcIncomeTotal() {
    this.totalIncome = 0;
    this.dynamicTotal = 0;
    for (let j = 0; j < this.dynamicIncome.length; j++) {
      this.totalIncome = +this.totalIncome + +this.dynamicIncome[j].value;
      this.dynamicTotal = +this.dynamicTotal + +this.dynamicIncome[j].value;
    }
    console.log(this.totalIncome);
    console.log(this.dynamicTotal);
  }

  calcTotal(data) {
    console.log(data);
  }

  AddIncome() {
    this.dynamicIncome.push({
      name: this.resource,
      value: this.amount
    });
    this.calcIncomeTotal();
    this.clear();
  }

  deleteFieldValue(index) {
    this.dynamicIncome.splice(index, 1);
    this.calcIncomeTotal();
  }

  saveIncome(): void {
    this.income.userid = this.uid;
    this.income.dynamicIncome = this.dynamicIncome;
    this.incomeService.PostIncome(this.income).subscribe(data => {
      alert("Your data saved");
      this.isIncomeData = true;
    });
  }

  updateIncome() {
    this.income.userid = this.uid;
    this.income.dynamicIncome = this.dynamicIncome;
    this.incomeService.PutIncome(this.income).subscribe(data => {
      alert("Your data saved");
    });
  }
}
