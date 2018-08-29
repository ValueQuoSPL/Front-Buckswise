import { AccountService, LoginModalService, Principal } from 'app/shared';
import { Component, OnInit, Inject } from '@angular/core';
import { NAMED_ENTITIES } from '@angular/compiler';
import { checkAndUpdateBinding } from '@angular/core/src/view/util';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Utility, Credit, General, Health, House, Income, Life, Loan, Misc, Travel} from 'app/pratik/spending/spending.model';

// tslint:disable-next-line:max-line-length
import {
  IncomeService,
  UtilityService,
  HouseService,
  TravelService,
  MiscService,
  LoanService,
  LifeService,
  HealthService,
  GeneralService,
  CreditService
} from 'app/pratik/spending/spending.service';
// import { IncomeDialog } from 'app/pratik/spending/dialog/dialog';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'jhi-spending',
  templateUrl: './spending.component.html',
  styleUrls: ['./spending.component.css']
})
export class SpendingComponent implements OnInit {
  totalUtility: number;
  totalHousehold: number;
  totalTravel: number;
  totalMisc: number;
  resource: any;
  amount: any;
  expense;
  demoarr;
  i;
  closeResult: string;
  step = 0;

  loanDate = new FormControl(new Date());
  repDate = new FormControl(new Date());
  lifeDate = new FormControl(new Date());
  healthDate = new FormControl(new Date());
  generalDate = new FormControl(new Date());

  resource_react = new FormControl('');
  amount_react = new FormControl('');

  //  inputForm = new FormGroup({
  //   name: new FormControl(''),
  //   value: new FormControl(''),
  // });

  inputForm = this.fb.group({
    name: ['', Validators.required],
    value: ['']
  });

  dynamicLoanArray: any = [];
  newLoanArray: any[];
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
  PolicyTypeArray = [
    { name: 'Child Policy' },
    { name: 'Retirement Policy' },
    { name: 'Saving Policy' },
    { name: 'Investment Policy' },
    { name: 'Term Policy' }
  ];
  PremiumTypeArray = [
    { name: 'Single' },
    { name: 'Monthly' },
    { name: 'Quarterly' },
    { name: 'Half Yearly' },
    { name: 'Yearly' }
  ];
  CardTypeArray = [
    { name: 'Gold' },
    { name: 'Platinum' },
    { name: 'Silver' },
    { name: 'Titanium ' }
  ];

  //   Table Arrays
  UtilityArray: any = [];
  HouseholdArray: any = [];
  TravelArray: any = [];
  MiscArray: any = [];

  // object creation
  utility: Utility = new Utility();
  house: House = new House();
  loan: Loan = new Loan();
  travel: Travel = new Travel();
  misc: Misc = new Misc();
  life: Life = new Life();
  health: Health = new Health();
  general: General = new General();
  credit: Credit = new Credit();
  uid: any;
  premium_mode: any;

  // for material dialog
  panelOpenState = false;
  animal: string;
  name: string;

  account: Account;

  constructor(
    private principal: Principal,
    private accountService: AccountService,
    private utilityService: UtilityService,
    private houseService: HouseService,
    private travelService: TravelService,
    private miscService: MiscService,
    private loanService: LoanService,
    private lifeService: LifeService,
    private healthService: HealthService,
    private generalService: GeneralService,
    private creditService: CreditService,
    public incomeDialog: MatDialog,
    private modalService: NgbModal,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    console.log('inside income Init()');
    this.getUserid();
    this.principal.identity().then(account => {
      this.account = account;
    });
    this.totalUtility = 0;
    this.totalHousehold = 0;
    this.totalTravel = 0;
    this.totalMisc = 0;

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

    // loan
    this.loan.check = false;

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

    this.life.ins_name = '';
    this.life.issuer = '';
    this.life.policy_name = '';
    this.life.policy_term = '';
    this.life.premium = '';
    this.life.premium_mode = '';
    this.life.premium_term = '';
    this.life.proposer_name = '';
    this.life.start_date = '';
    this.life.sum = '';
    this.life.type = '';

    this.health.ins_name = '';
    this.health.issuer = '';
    this.health.policy_name = '';
    this.health.policy_no = '';
    this.health.policy_term = '';
    this.health.premium = '';
    this.health.premium_mode = '';
    this.health.proposer_name = '';
    this.health.start_date = '';
    this.health.sum = '';

    this.general.generalModelArray = '';
    this.general.ins_obj = '';
    this.general.issuer = '';
    this.general.policy_name = '';
    this.general.policy_no = '';
    this.general.policy_term = '';
    this.general.premium = '';
    this.general.proposer_name = '';
    this.general.start_date = '';
    this.general.sum = '';

    this.credit.balance = '';
    this.credit.balance = '';
    this.credit.issuer = '';
    this.credit.limit = '';
    this.credit.monthly_pay = '';
    this.credit.monthly_usage = '';
    this.credit.roi = '';
    this.credit.type = '';
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
    // retrieve the userIdentity data from the server, update the identity object, and then resolve.
    return this.accountService
      .get()
      .toPromise()
      .then(response => {
        const account = response.body;
        if (account) {
          this.uid = account.id;
          console.log('from spending userid is : ', this.uid);
        } else {
          console.log('cannot get user details check login ');
        }
      })
      .catch(err => {});
  }

  // utility
  openUtility(content) {
    this.modalService
      .open(content, { ariaLabelledBy: 'expense-modal' })
      .result.then(
        result => {
          this.closeResult = `Closed with: ${result}`;
          this.AddUtility();
        },
        reason => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }
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
    this.utility.userid = this.uid;
    this.utility.dynamicUtility = this.dynamicUtilityArray;
    this.utilityService.PutUtility(this.utility).subscribe(data => {
      alert('Your utility data saved');
    });
  }
  GetUtility(): void {
    console.log('inside GetUtility()');
    this.utilityService.GetUtility(this.uid).subscribe((response: any[]) => {
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
    });
    console.log('GetUtility() success');
  }

  // household
  openHousehold(content) {
    this.modalService
      .open(content, { ariaLabelledBy: 'expense-modal' })
      .result.then(
        result => {
          this.closeResult = `Closed with: ${result}`;
          this.AddHousehold();
        },
        reason => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }
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
    this.house.userid = this.uid;
    this.house.dynamicHousehold = this.dynamicHousehold;
    this.houseService.PutHouse(this.house).subscribe(data => {
      alert('Your household data saved');
    });
  }
  GetHousehold(): void {
    console.log('inside getHousehold()');
    this.houseService.GetHouse(this.uid).subscribe((response: any[]) => {
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
    });
    console.log('getHousehold() success');
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

  // life insurance
  openLife(lifeModal) {
    this.modalService
      .open(lifeModal, { ariaLabelledBy: 'lifeModal' })
      .result.then(
        result => {
          this.closeResult = `Closed with: ${result}`;
          console.log(this.life.type);
          this.AddLifeInsurance();
        },
        reason => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }
  AddLifeInsurance() {
    this.dynamicLifeArray.push({
      iName: this.life.type,
      issuer: this.life.issuer,
      ins_name: this.life.ins_name,
      prName: this.life.proposer_name,
      sDate: this.lifeDate.value,
      pterm: this.life.policy_term,
      pMode: this.life.premium_mode,
      pName: this.life.policy_name,
      sum: this.life.sum,
      premium: this.life.premium,
      term: this.life.premium_term,
      userid: this.uid.id
    });
    this.clear();
  }
  RemoveLifeInsurance(index) {
    this.dynamicLifeArray.splice(index, 1);
  }
  onLifeSave(): void {
    this.life.userid = this.uid;
    this.life.lifeModelArray = this.dynamicLifeArray;
    this.lifeService.PutLife(this.life.lifeModelArray).subscribe(data => {
      alert('success');
    });
    console.log('in life save');
  }
  onGetLife(): void {
    this.lifeService.GetLife(this.uid).subscribe((response: any[]) => {
      this.dynamicLifeArray = response;
      console.log(this.dynamicLifeArray);
    });
    console.log('getLife() success');
  }

  // health insurance
  openHealth(healthModal) {
    this.modalService
      .open(healthModal, { ariaLabelledBy: 'healthModal' })
      .result.then(
        result => {
          this.closeResult = `Closed with: ${result}`;
          this.AddHealth();
        },
        reason => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }
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
      sDate: this.healthDate.value,
      pMode: this.health.premium_mode,
      userid: this.uid.id
    });
    this.clear();
  }
  RemoveHealth(index) {
    this.dynamicHealth.splice(index, 1);
  }
  onHealthSave(): void {
    this.health.userid = this.uid;
    this.health.healthModelArray = this.dynamicHealth;
    this.healthService
      .PutHealth(this.health.healthModelArray)
      .subscribe(data => {
        alert('Health Insurance saved');
      });
  }
  onGetHealth(): void {
    this.healthService.GetHealth(this.uid).subscribe((response: any[]) => {
      this.dynamicHealth = response;
      console.log(this.dynamicHealth);
    });
    console.log('getHealth() success');
  }

  // general insurance
  openGeneral(generalModal) {
    this.modalService
      .open(generalModal, { ariaLabelledBy: 'generalModal' })
      .result.then(
        result => {
          this.closeResult = `Closed with: ${result}`;
          this.AddGeneral();
        },
        reason => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }
  AddGeneral() {
    this.dynamicGeneral.push({
      iName: this.general.ins_obj,
      pName: this.general.policy_name,
      premium: this.general.premium,
      issuer: this.general.issuer,
      pterm: this.general.policy_term,
      pdate: this.generalDate.value,
      sum: this.general.sum,
      poNo: this.general.policy_no,
      prName: this.general.proposer_name,
      userid: this.uid.id
    });
    this.clear();
  }
  RemoveGeneral(index) {
    this.dynamicGeneral.splice(index, 1);
  }
  onGeneralSave(): void {
    this.general.userid = this.uid;
    this.general.generalModelArray = this.dynamicGeneral;
    this.generalService
      .PutGeneral(this.general.generalModelArray)
      .subscribe(data => {
        alert('General Insurance saved');
      });
    console.log('in general save');
  }
  onGetGeneral(): void {
    this.generalService.GetGeneral(this.uid).subscribe((response: any[]) => {
      this.dynamicGeneral = response;
      console.log(this.dynamicGeneral);
    });
    console.log('getGeneral() success');
  }

  // credit card
  openCredit(creditModal) {
    this.modalService
      .open(creditModal, { ariaLabelledBy: 'creditModal' })
      .result.then(
        result => {
          this.closeResult = `Closed with: ${result}`;
          this.AddCredit();
        },
        reason => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }
  AddCredit() {
    this.dynamicCredit.push({
      type: this.credit.type,
      bank: this.credit.issuer,
      roi: this.credit.roi,
      balance: this.credit.balance,
      userid: this.uid.id
    });
    this.clear();
  }
  RemoveCredit(index) {
    this.dynamicCredit.splice(index, 1);
  }
  onCreditSave(): void {
    this.credit.userid = this.uid;
    this.credit.creditModelArray = this.dynamicCredit;
    this.creditService
      .PutCredit(this.credit.creditModelArray)
      .subscribe(data => {
        alert('success');
      });
    console.log('in credit save');
  }
  onGetCredit(): void {
    console.log('inside getCredit()');
    this.creditService.GetCredit(this.uid).subscribe((response: any[]) => {
      this.dynamicCredit = response;
      console.log(this.dynamicCredit);
    });
    console.log('getCredit() success');
  }

  // travel
  openTravel(content) {
    this.modalService
      .open(content, { ariaLabelledBy: 'expense-modal' })
      .result.then(
        result => {
          this.closeResult = `Closed with: ${result}`;
          this.AddTravel();
        },
        reason => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }
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
    this.travel.userid = this.uid;
    this.travel.dynamicTravel = this.dynamicTravel;
    this.travelService.PutTravel(this.travel).subscribe(data => {
      alert('Your travel data saved');
    });
  }
  GetTravel(): void {
    console.log('inside getTravel()');
    this.travelService.GetTravel(this.uid).subscribe((response: any[]) => {
      this.TravelArray = response;
      this.travel.food = this.TravelArray.food;
      this.travel.entertainment = this.TravelArray.entertainment;
      this.travel.dineout = this.TravelArray.dineout;
      this.travel.vacation = this.TravelArray.vacation;
      this.travel.hobby = this.TravelArray.hobby;
      this.dynamicTravel = this.TravelArray.dynamicTravel;
    });
    console.log('getTravel() success');
  }

  // misc
  openMisc(content) {
    this.modalService
      .open(content, { ariaLabelledBy: 'expense-modal' })
      .result.then(
        result => {
          this.closeResult = `Closed with: ${result}`;
          this.AddMisc();
        },
        reason => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }
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
    this.misc.userid = this.uid;
    this.misc.dynamicMisc = this.dynamicMisc;
    this.miscService.PutMisc(this.misc).subscribe(data => {
      alert('Your Misc data saved');
    });
  }
  GetMisc(): void {
    console.log('inside getMisc()');
    this.miscService.GetMisc(this.uid).subscribe((response: any[]) => {
      this.MiscArray = response;
      this.misc.shoes = this.MiscArray.shoes;
      this.misc.pet = this.MiscArray.pet;
      this.misc.electronics = this.MiscArray.electronics;
      this.misc.furniture = this.MiscArray.furniture;
      this.misc.charity = this.MiscArray.charity;
      this.misc.gift = this.MiscArray.gift;
      this.misc.cloth = this.MiscArray.cloth;
      this.dynamicMisc = this.MiscArray.dynamicMisc;
    });
    console.log('getMisc() success');
  }
}

// @Component({
//   selector: 'jhi-income-dialog',
//   templateUrl: './dialog/income-dialog.html',
// })
// export class IncomeDialog {
//   private spend: SpendingComponent = new SpendingComponent;
//   constructor(
//     public dialogRef: MatDialogRef<IncomeDialog>,
//     @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

//   onIncomeClose(): void {
//     this.dialogRef.close();
//   }

//   incomeDialogData() {
//      this.spend.addFieldValue(this.data);
//   }

// }
