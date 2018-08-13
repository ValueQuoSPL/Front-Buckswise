import { Component, OnInit } from '@angular/core';
import { Income } from 'app/pratik/spending/spending.model';
import { IncomeService } from 'app/pratik/spending/spending.service';
import { AccountService } from 'app/shared';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'jhi-income',
  templateUrl: './income.component.html',
  styleUrls: ['./income.css']
})
export class IncomeComponent implements OnInit {
  resource: any;
  amount: any;
  dynamicIncome: any = [];
  IncomeArray: any = [];
  totalIncome: number;
  income: Income = new Income();
  closeResult: string;
  step = 0;
  uid: any;

  constructor(private account: AccountService,
              private modalService: NgbModal,
              private incomeService: IncomeService) { }

  ngOnInit() {
    this.totalIncome = 0;
    this.income.incomeSalary = 0;
    this.income.incomeAward = 0;
    this.income.incomeBonus = 0;
    this.income.incomeDeposit = 0;
    this.income.incomePension = 0;
    this.income.incomeRental = 0;
    this.income.incomeSaving = 0;
  }

  getUserid() {
    // retrieve the userIdentity data from the server, update the identity object, and then resolve.
    return this.account
      .get()
      .toPromise()
      .then(response => {
        const account = response.body;
        if (account) {
          this.uid = account;
          console.log(this.uid);
        } else {
        }
      })
      .catch(err => {
      });
  }

  clear() {
    this.resource = '';
    this.amount = '';
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

  // income
  openIncome(incomeContent) {
    console.log('income modal open');

    this.modalService
      .open(incomeContent, { ariaLabelledBy: 'incomeModal' })
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

  calcIncomeTotal() {
    this.totalIncome = 0;
    for (let i = 0; i < this.dynamicIncome.length; i++) {
      const value1 = this.dynamicIncome[i].value;
      // console.log(this.totalIncome);
      this.totalIncome = this.totalIncome + value1;
    }
    console.log(this.dynamicIncome);
    console.log(this.totalIncome);
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

  onIncomeSave(): void {
    this.income.dynamicIncome = this.dynamicIncome;
    this.incomeService.PutIncome(this.income).subscribe(data => {
      alert('Your data saved');
    });
  }

  onIncomeGet() {
    console.log('inside onIncomeGet()');
    this.incomeService.GetIncome().subscribe((response: any[]) => {
      this.IncomeArray = response;
      this.income.incomeSalary = this.IncomeArray.incomeSalary;
      this.income.incomeAward = this.IncomeArray.incomeAward;
      this.income.incomeBonus = this.IncomeArray.incomeBonus;
      this.income.incomePension = this.IncomeArray.incomePension;
      this.income.incomeSaving = this.IncomeArray.incomeSaving;
      this.income.incomeDeposit = this.IncomeArray.incomeDeposit;
      this.income.incomeRental = this.IncomeArray.incomeRental;
      this.dynamicIncome = this.IncomeArray.dynamicIncome;
      console.log(response);
    });
    console.log('onIncomeGet() success');
  }

}
