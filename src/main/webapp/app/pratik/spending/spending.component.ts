import { Component, OnInit } from '@angular/core';
import { NAMED_ENTITIES } from '@angular/compiler';
import { checkAndUpdateBinding } from '@angular/core/src/view/util';
import { Utility, Credit, General, Health, House, Income, Life, Loan, Misc, Travel } from 'app/pratik/spending/spending.model';

// tslint:disable-next-line:max-line-length
import { IncomeService, UtilityService, HouseService, TravelService, MiscService, LoanService, LifeService, HealthService, GeneralService, CreditService } from 'app/pratik/spending/spending.service';

@Component({
  selector: 'jhi-spending',
  templateUrl: './spending.component.html',
  styleUrls: ['./spending.component.css']
})
export class SpendingComponent implements OnInit {
  totalIncome: number; totalUtility: number; totalHousehold: number; totalTravel: number; totalMisc: number;
  resource: any; amount: any; expense; demoarr;
   i;

  dynamicLoanArray: any = [];
  newLoanArray: any [];
  dynamicIncome: any = [];
  dynamicUtilityArray: any = [];
  dynamicHousehold: any = [];
  dynamicTravel: any = [];
  dynamicMisc: any = [];
  dynamicLifeArray: any = [];
  dynamicHealth: any = [];
  dynamicGeneral: any = [];
  dynamicCredit: any = [];

  //  Dropdown Arrays
  LoanTypeArray = [
    {name: 'Home Loan'},
    {name: 'Personal Loan'},
    {name: 'Auto Loan'},
    {name: 'Educational Loan'},
    {name: 'Property Loan'},
    {name: 'Gold Loan'},
    {name: 'Hand Loan'}
  ];
  InterestTypeArray = [
    {name: 'Fixed'},
    {name: 'Floating'},
    {name: 'Fixed-Floating'}
  ];
  PolicyTypeArray = [
    {name: 'Child Policy'},
    {name: 'Retirement Policy'},
    {name: 'Saving Policy'},
    {name: 'Investment Policy'},
    {name: 'Term Policy'}
  ];
  PremiumTypeArray = [
    {name: 'Single'},
    {name: 'Monthly'},
    {name: 'Quarterly'},
    {name: 'Half Yearly'},
    {name: 'Yearly'}
  ];
  CardTypeArray = [
    {name: 'Gold'},
    {name: 'Platinum'},
    {name: 'Silver'},
    {name: 'Titanium '}
  ];

  //   Table Arrays
  IncomeArray: any = [];
  UtilityArray: any = [];
  HouseholdArray: any = [];
  TravelArray: any = [];
  MiscArray: any = [];

  // object creation
  income: Income = new Income();
  utility: Utility = new Utility();
  house: House = new House();
  loan: Loan = new Loan();
  travel: Travel = new Travel();
  misc: Misc = new Misc();
  life: Life = new Life();
  health: Health = new Health();
  general: General = new General();
  credit: Credit = new Credit();

  constructor(
    private incomeService: IncomeService,
    private utilityService: UtilityService,
    private houseService: HouseService,
    private travelService: TravelService,
    private miscService: MiscService,
    private loanService: LoanService,
    private lifeService: LifeService,
    private healthService: HealthService,
    private generalService: GeneralService,
    private creditService: CreditService
    ) { }

  ngOnInit() {
    console.log('inside onInit()');

    // this.calcIncomeTotal();
    this.totalIncome = 0;
    // this.calcUtilityTotal();
    this.totalUtility = 0;
    // this.calcHouseholdTotal();
    this.totalHousehold = 0;
    this.totalTravel = 0;
    this.totalMisc = 0;

    // for income
    this.income.incomeSalary = 0;
    this.income.incomeAward = 0;
    this.income.incomeBonus = 0;
    this.income.incomeDeposit = 0;
    this.income.incomePension = 0;
    this.income.incomeRental = 0;
    this.income.incomeSaving = 0;

    // for utility
    this.utility.electricity = 0;
    this.utility.gas = 0;
    this.utility.internet = 0;
    this.utility.mobile = 0;
    this.utility.news = 0;
    this.utility.telephone = 0;
    this.utility.tv = 0;
    this.utility.vcd = 0;
    this.utility.water = 0;

    // household
    this.house.milk = 0;
    this.house.fruit = 0;
    this.house.rent = 0;
    this.house.fuel = 0;
    this.house.medical = 0;
    this.house.society = 0;
    this.house.auto = 0;
    this.house.edu = 0;
    this.house.grocery = 0;
    this.house.servent = 0;
    this.house.laundry = 0;
    this.house.vcd = 0;
    this.house.selfcare = 0;
    this.house.property = 0;

    // travel
    this.travel.food = 0;
    this.travel.entertainment = 0;
    this.travel.dineout = 0;
    this.travel.vacation = 0;
    this.travel.hobby = 0;

    // misc
    this.misc.shoes = 0;
    this.misc.pet = 0;
    this.misc.electronics = 0;
    this.misc.furniture = 0;
    this.misc.charity = 0;
    this.misc.gift = 0;
    this.misc.cloth = 0;
  }

  clear() {
      this.resource = '';
      this.amount = '';
      this.expense = '';
  }

  // income
  calcIncomeTotal() {
    this.totalIncome = 0;
    for (let i = 0; i < this.dynamicIncome.length; i++) {
        const value1 = this.dynamicIncome[i].value;
        // console.log(this.totalIncome);
        this.totalIncome = this.totalIncome + value1;
    }
    console.log(this.totalIncome);
  }
  addFieldValue() {
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
    this.incomeService.PutIncome(this.income)
     .subscribe(
         (data) => { alert('Your data saved'); }
        );
  }
  onIncomeGet() {
    console.log('inside onIncomeGet()');
    this.incomeService.GetIncome()
      .subscribe(
        (response: any[]) => {
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
        }
      );
      console.log('onIncomeGet() success');
  }

  // utility
  calcUtilityTotal() {
    this.totalUtility = 0;
    for (let i = 0; i < this.dynamicUtilityArray.length; i++) {
        const value1 = this.dynamicUtilityArray[i].value;
        // console.log(this.totalUtility);
        this.totalUtility = this.totalUtility + value1;
    }
    console.log(this.totalUtility);
  }
  AddUtility() {
    this.dynamicUtilityArray.push({
      name: this.resource,
      value: this.expense
    });
    this.calcUtilityTotal();
    this.clear();
  }
  RemoveUtility(index) {
    this.dynamicUtilityArray.splice(index, 1);
    this.calcUtilityTotal();
  }
  SaveUtility(): void {
    this.utility.dynamicUtility = this.dynamicUtilityArray;
    this.utilityService.PutUtility(this.utility)
     .subscribe(
       (data) => { alert ('Your utility data saved') ; }
      );
  }
  GetUtility(): void {
    console.log('inside GetUtility()');
    this.utilityService.GetUtility()
     .subscribe((response: any[]) => {
            this.UtilityArray = response;
            this.utility.electricity = this.UtilityArray.electricity;
            this.utility.gas = this.UtilityArray.gas;
            this.utility.water = this.UtilityArray.water;
            this.utility.telephone = this.UtilityArray.telephone;
            this.utility.mobile = this.UtilityArray.mobile;
            this.utility.internet = this.UtilityArray.internet;
            this.utility.tv = this.UtilityArray.tv;
            this.utility.vcd = this.UtilityArray.vcd;
            this.utility.news = this.UtilityArray.news;
            this.dynamicUtilityArray = this.UtilityArray.dynamicUtility;
        }
      );
      console.log('GetUtility() success');
  }

  // household
  calcHouseholdTotal() {
    this.totalHousehold = 0;
    for (let i = 0; i < this.dynamicHousehold.length; i++) {
        const value1 = this.dynamicHousehold[i].value;
        // console.log(this.totalUtility);
        this.totalHousehold = this.totalHousehold + value1;
    }
    console.log(this.totalHousehold);
  }
  AddHousehold() {
    this.dynamicHousehold.push({
      name: this.resource,
      value: this.expense
    });
    this.calcHouseholdTotal();
    this.clear();
  }
  RemoveHousehold(index) {
    this.dynamicHousehold.splice(index, 1);
    this.calcHouseholdTotal();
  }
  SaveHousehold(): void {
    this.house.dynamicHousehold = this.dynamicHousehold;
    this.houseService.PutHouse(this.house)
    .subscribe(
      (data) => { alert ('Your household data saved') ; }
     );
  }
  GetHousehold(): void {
    console.log('inside getHousehold()');
    this.houseService.GetHouse()
     .subscribe((response: any[]) => {
            this.HouseholdArray = response;
            this.house.milk = this.HouseholdArray.milk;
            this.house.fruit = this.HouseholdArray.fruit;
            this.house.rent = this.HouseholdArray.rent;
            this.house.fuel = this.HouseholdArray.fuel;
            this.house.medical = this.HouseholdArray.medical;
            this.house.society = this.HouseholdArray.society;
            this.house.auto = this.HouseholdArray.auto;
            this.house.edu = this.HouseholdArray.edu;
            this.house.grocery = this.HouseholdArray.grocery;
            this.house.servent = this.HouseholdArray.servent;
            this.house.laundry = this.HouseholdArray.laundry;
            this.house.vcd = this.HouseholdArray.vcd;
            this.house.selfcare = this.HouseholdArray.selfcare;
            this.house.property = this.HouseholdArray.property;
            this.dynamicHousehold = this.HouseholdArray.dynamicHousehold;
        }
      );
      console.log('getHousehold() success');
  }

  // loan
  AddLoan() {
    this.dynamicLoanArray.push({
      ltype: this.loan.loan_type,
      lender: this.loan.lender,
      app: this.loan.applicant,
      amnt: this.loan.amnt,
      ldate: this.loan.ldate,
      check: this.loan.check,
      tenure: this.loan.tenure,
      itype: this.loan.intrest_type,
      roi:  this.loan.roi,
      rdate: this.loan.rdate
    });

    console.log('AddLoan() call success');
    console.log(this.loan.loan_type);
  }
  RemoveLoan(index) {
    this.dynamicLoanArray.splice(index, 1);
  }
  onLoanSave(): void {
    this.loan.loanModelArray = this.dynamicLoanArray;
    this.loanService.PutLoan(this.loan.loanModelArray)
     .subscribe(
       (data) => {alert('Loan Added successfully'); });
  }
  onGetLoan(): void {
    console.log('inside getLoan()');
    this.loanService.GetLoan()
     .subscribe((response: any[]) => {
            this.dynamicLoanArray = response;
            console.log(' from direct response to dynamicLoanArray ');
            console.log(this.dynamicLoanArray);
          }
      );
      console.log('getLoan() success');
  }

  // life insurance
  AddLifeInsurance() {
    this.dynamicLifeArray.push({
      iName: this.life.type,
      issuer: this.life.issuer,
      ins_name: this.life.ins_name,
      prName: this.life.proposer_name,
      sDate: this.life.start_date,
      pterm: this.life.policy_term,
      pMode: this.life.premium_mode,
      pName: this.life.policy_name,
      sum: this.life.sum,
      premium: this.life.premium,
      term: this.life.premium_term,
    });
    console.log('AddLife() call success');

  }
  RemoveLifeInsurance(index) {
    this.dynamicLifeArray.splice(index, 1);
  }
  onLifeSave(): void {
    this.life.lifeModelArray = this.dynamicLifeArray;
    this.lifeService.PutLife(this.life.lifeModelArray)
     .subscribe((data) => {
       alert('success');
    });
    console.log('in life save');
  }
  onGetLife(): void {
    this.lifeService.GetLife()
     .subscribe((response: any[]) => {
            this.dynamicLifeArray = response;
            console.log(this.dynamicLifeArray);
          }
      );
      console.log('getLife() success');
  }

  // health insurance
  AddHealth() {
    this.dynamicHealth.push({
      iName: this.health.ins_name,
      pName: this.health.policy_name,
      premium: this.health.premium,
      pterm: this.health.policy_term,
      sum: this.health.sum,
      poNo: this.health.policy_no,
      issuer: this.health.issuer,
      prName: this.health.proposer_name,
      sDate: this.health.start_date,
      pMode: this.health.premium_mode

    });
  }
  RemoveHealth(index) {
    this.dynamicHealth.splice(index, 1);
  }
  onHealthSave(): void {
    this.health.healthModelArray = this.dynamicHealth;
    this.healthService.PutHealth(this.health.healthModelArray)
     .subscribe((data) => {
       alert('Health Insurance saved');
    });
  }
  onGetHealth(): void {
    this.healthService.GetHealth()
     .subscribe((response: any[]) => {
            this.dynamicHealth = response;
            console.log(this.dynamicHealth);
          }
      );
      console.log('getHealth() success');
  }

  // general insurance
  AddGeneral() {
    this.dynamicGeneral.push({
      iName: this.general.ins_obj,
      pName: this.general.policy_name,
      premium: this.general.premium,
      issuer: this.general.issuer,
      pterm: this.general.policy_term,
      pdate: this.general.start_date,
      sum: this.general.sum,
      poNo: this.general.policy_no,
      prName: this.general.proposer_name
    });

    console.log('AddGeneral() call success');
  }
  RemoveGeneral(index) {
    this.dynamicGeneral.splice(index, 1);
  }
  onGeneralSave(): void {
    this.general.generalModelArray = this.dynamicGeneral;
    this.generalService.PutGeneral(this.general.generalModelArray)
     .subscribe((data) => {
       alert('General Insurance saved');
    });
    console.log('in general save');
  }
  onGetGeneral(): void {
    this.generalService.GetGeneral()
     .subscribe((response: any[]) => {
            this.dynamicGeneral = response;
            console.log(this.dynamicGeneral);
          }
      );
      console.log('getGeneral() success');
  }

  // credit card
  AddCredit() {
      this.dynamicCredit.push({
          type: this.credit.type,
          bank: this.credit.issuer,
          roi: this.credit.roi,
          balance: this.credit.balance
        });

  console.log('AddGeneral() call success');
  }
  RemoveCredit(index) {
    this.dynamicCredit.splice(index, 1);
  }
  onCreditSave(): void {
    this.credit.creditModelArray = this.dynamicCredit;
      this.creditService.PutCredit(this.credit.creditModelArray)
      .subscribe(
        (data) => { alert('success'); }
      );
    console.log('in credit save');
  }
  onGetCredit(): void {
    console.log('inside getCredit()');
    this.creditService.GetCredit()
     .subscribe((response: any[]) => {
            this.dynamicCredit = response;
            console.log(this.dynamicCredit);
          }
      );
      console.log('getCredit() success');
  }

  // travel
  calcTravelTotal() {
    this.totalTravel = 0;
    for (let i = 0; i < this.dynamicTravel.length; i++) {
        const value1 = this.dynamicTravel[i].value;
        // console.log(this.totalUtility);
        this.totalTravel = this.totalTravel + value1;
    }
    console.log(this.totalTravel);
  }
  AddTravel() {
    this.dynamicTravel.push({
      name: this.resource,
      value: this.expense
    });
    this.calcTravelTotal();
    this.clear();
  }
  RemoveTravel(index) {
    this.dynamicTravel.splice(index, 1);
    this.calcTravelTotal();
  }
  SaveTravel(): void {
    this.travel.dynamicTravel = this.dynamicTravel;
    this.travelService.PutTravel(this.travel)
    .subscribe(
      (data) => { alert ('Your travel data saved') ; }
     );
  }
  GetTravel(): void {
    console.log('inside getTravel()');
    this.travelService.GetTravel()
     .subscribe((response: any[]) => {
            this.TravelArray = response;
            this.travel.food = this.TravelArray.food;
            this.travel.entertainment = this.TravelArray.entertainment;
            this.travel.dineout = this.TravelArray.dineout;
            this.travel.vacation = this.TravelArray.vacation;
            this.travel.hobby = this.TravelArray.hobby;
            this.dynamicTravel = this.TravelArray.dynamicTravel;
        }
      );
      console.log('getTravel() success');
  }

  // misc
  calcMiscTotal() {
    this.totalMisc = 0;
    for (let i = 0; i < this.dynamicMisc.length; i++) {
        const value1 = this.dynamicMisc[i].value;
        // console.log(this.totalIncome);
        this.totalMisc = this.totalMisc + value1;
    }
    console.log(this.totalMisc);
  }
  AddMisc() {
    this.dynamicMisc.push({
      name: this.resource,
      value: this.expense
    });
    this.calcMiscTotal();
    this.clear();
  }
  RemoveMisc(index) {
    this.dynamicMisc.splice(index, 1);
    this.calcMiscTotal();
  }
  SaveMisc(): void {
    this.misc.dynamicMisc = this.dynamicMisc;
    this.miscService.PutMisc(this.misc)
     .subscribe(
       (data) => { alert('Your Misc data saved'); });
  }
  GetMisc(): void {
    console.log('inside getMisc()');
    this.miscService.GetMisc()
     .subscribe((response: any[]) => {
            this.MiscArray = response;
            this.misc.shoes = this.MiscArray.shoes;
            this.misc.pet = this.MiscArray.pet;
            this.misc.electronics = this.MiscArray.electronics;
            this.misc.furniture = this.MiscArray.furniture;
            this.misc.charity = this.MiscArray.charity;
            this.misc.gift = this.MiscArray.gift;
            this.misc.cloth = this.MiscArray.cloth;
            this.dynamicMisc = this.MiscArray.dynamicMisc;
        }
      );
      console.log('getMisc() success');
  }

}
