import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService, Principal, LoginModalService } from 'app/shared';
import { DashboardService } from 'app/dashboard/dashboard.service';
import { Color } from '../../../../../node_modules/ng2-charts';
// tslint:disable-next-line:max-line-length
import { GeneralService, HealthService, LifeService, LoanService,
  MiscService, TravelService, UtilityService, HouseService, IncomeService} from 'app/pratik/spending/spending.service';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap/modal/modal.module';

@Component({
  selector: 'jhi-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  // [x: string]: any;
  uid: any;
  account: any;
  result: any = [];
  total: any;
  resultStock: any;
  totalStock: any;
  totalSaving: any;
  totalCash: any;
  totalChit: any;
  totalPCJ: any;
  totalAlterInvestment: any;
  totalFAO: any;
  resultSaving: any;
  resultCash: any;
  resultChit: any;
  resultPCJ: any;
  resultAlterInvestment: any;
  resultFAO: any;
  totalLiabilities: any;
  resultLiabilities: any;

  public pieChartableLabels: string[] = [];
  public pieChartData: number[] = [];
  public colors: Array<Color>;
  public assetChart = 'pie';

  public pieChartableLabel: any = [];
  public pieChartDataa: any = [];
  public color: Array<Color>;
  public liabilityChart = 'pie';

  // cardbar
  incomeTotal = 0;
  assetTotal = 0;
  expenseTotal = 0;
  liabilityTotal = 0;
  surplus = 0;
  currentDate = new Date();
  dbDate;
  emi: any;
  inflation = 0.07;

  GoalArray: any = [];
  HTMLGoalArray: any = [];
  dynamicCredit: any[];
  dynamicGeneral: any[];
  dynamicHealth: any[];
  HouseholdArray: any[];
  dynamicLifeArray: any[];
  dynamicLoan: any[];
  MiscArray: any[];
  TravelArray: any[];
  UtilityArray: any[];
  linkedasset: boolean;

  modalRef: NgbModalRef;

  public chartClicked(e: any): void {
    // console.log(e);
  }

  public chartHovered(e: any): void {
    // console.log(e);
  }

  constructor(
    private router: Router,
    private dashboardService: DashboardService,
    private accountService: AccountService,
    private principal: Principal,
    private generalService: GeneralService,
    private healthService: HealthService,
    private lifeService: LifeService,
    private loanService: LoanService,
    private miscService: MiscService,
    private travelService: TravelService,
    private utilityService: UtilityService,
    private houseService: HouseService,
    private incomeService: IncomeService,
    private loginModalService: LoginModalService,

  ) {
    this.principal.identity().then(account => {
      this.account = account;
    });
  }

  ngOnInit() {
    this.getUserid();
    // this.getGoal();
  }

  isAuthenticated() {
    return this.principal.isAuthenticated();
  }

  login() {
    this.modalRef = this.loginModalService.open();
  }

  getUserid() {
    return this.accountService
      .get()
      .toPromise()
      .then(response => {
        const account = response.body;
        // console.log(account.id);
        if (account) {
          this.uid = account.id;
          this.getMutualFund(this.uid);
          this.getStock(this.uid);
          this.getSaving(this.uid);
          this.getChit(this.uid);
          this.getCash(this.uid);
          this.getAlterInvestment(this.uid);
          this.getPCJ(this.uid);
          this.getFAO(this.uid);
          this.getLiabilities(this.uid);
          this.getGoal();
          this.getIncome();
          this.getExpense();
        }
      });
    // .catch(err => {});
  }

  getLiabilities(uid) {
    // // console.log('inside libility get');

    this.totalLiabilities = 0;
    this.dashboardService.getLiabilities(this.uid).subscribe(data => {
      // // console.log('response liability', data);

      this.resultLiabilities = data;
      for (let i = 0; i < this.resultLiabilities.length; i++) {
        this.totalLiabilities =
        this.totalLiabilities +
        +this.resultLiabilities[i].outstandingpricipal;
      }
      this.liabilityTotal = this.totalLiabilities;
      // // console.log('total liability', this.liabilityTotal);
      this.liabilitiesChart(this.totalLiabilities);
    });
  }

  getIncome() {
    this.incomeService.GetIncome(this.uid).subscribe((response: any[]) => {
      let value = 0;
      response.forEach(element => {
        value = +value + +element.amount;
      });
      this.incomeTotal = value;
    });
  }

  getExpense() {
    this.getUtility();
    this.getHousehold();
    this.getTravel();
    this.getMisc();
    this.getHealth();
    this.getLife();
    this.getGeneral();
    // this.getCredit();
    this.getLoan();
  }

  calcExpense(value) {
    this.expenseTotal = +this.expenseTotal + +value;
    // // console.log('expense total', this.expenseTotal);
    this.surplus = +this.incomeTotal - +this.expenseTotal;
    // // console.log('surplus', this.surplus);
  }

  getGeneral(): void {
    this.generalService.GetGeneral(this.uid).subscribe((response: any[]) => {
      // // console.log('in general res', response);
      if (response.length !== 0) {
        // // console.log('found in general res');
        let value = 0;
        response.forEach(element => {
          value = +value + +element.premium;
        });
        this.calcExpense(value);
      } else {
      // console.log('data not in general');
      }
    });
  }

  getHealth(): void {
    this.healthService.GetHealth(this.uid).subscribe((response: any[]) => {
      // // console.log('in health');
      if (response.length !== 0) {
        // // console.log('found in health', response);
        let value = 0;
        response.forEach(element => {
          value = +value + +element.premium;
        });
        // // console.log('from health', value);
        this.calcExpense(value);
      } else {
      // console.log('data not in health');
      }
   });
  }

  getHousehold(): void {
    this.houseService.GetHouse(this.uid).subscribe((response: any[]) => {
      // // console.log('in house');
      if (response.length !== 0) {
        // // console.log('found in health', response);
        let value = 0;
        response.forEach(element => {
          value = +value + +element.amount;
        });
        this.calcExpense(value);
      } else {
      // console.log('data not in house');
      }

    });
  }

  getLife(): void {
    this.lifeService.GetLife(this.uid).subscribe((response: any[]) => {
      // // console.log('in life');

      if (response.length !== 0) {
        // // console.log('found in life', response);
        let value = 0;
        response.forEach(element => {
          value = +value + +element.premium;
        });
        this.calcExpense(value);
      } else {
      // console.log('data not in life');
      }
   });
  }

  getLoan() {
    this.loanService.GetLoan(this.uid).subscribe((response: any[]) => {
      // // console.log('inside loan get');
      let value = 0;
      if (response.length !== 0) {
        // // console.log('found loan ' , response);
        response.forEach(element => {
          this.dbDate = new Date(element.ldate);
          this.calculateEMI(element.amount, element.tenure, element.roi);
          // // console.log('emi of ', element.ltype, 'is  : ' , this.emi);
          value = +value + +this.emi;
        });
        // // console.log('all emi total' , value);
        this.calcExpense(value);
      } else {
      // console.log('data not in loan');
      }

    });
  }

  calculateEMI(P, N, R) {
    if (this.dbDate < this.currentDate) {
      const ROI = R;
      R = R / 12 / 100;
      const A = Math.pow(1 + R, N);
      const up = P * R * A;
      const down = Math.pow(1 + R, N) - 1;
      this.emi = up / down;
      P = P - this.emi;
      this.dbDate.setMonth(this.dbDate.getMonth() + 1);

      this.calculateEMI(P, N, ROI);
    } else {
      this.emi = Math.round(this.emi);
      // // console.log('todays emi', this.emi);
    }
  }

  getMisc(): void {
    this.miscService.GetMisc(this.uid).subscribe((response: any[]) => {
      // // console.log('in misc');

      if (response.length !== 0) {
      // // console.log('found in misc', response);

        let value = 0;
        response.forEach(element => {
          value = +value + +element.amount;
        });
        this.calcExpense(value);
      } else {
      // console.log('data not in misc');
      }
   });
  }

  getTravel(): void {
    this.travelService.GetTravel(this.uid).subscribe((response: any[]) => {
      // // console.log('in travel');

      if (response.length !== 0) {
      // // console.log('found in health', response);

        let value = 0;
        response.forEach(element => {
          value = +value + +element.amount;
        });
        // // console.log('from travel', value);
        this.calcExpense(value);
      } else {
      // console.log('data not in travel');
      }
  });
  }

  getUtility(): void {
    this.utilityService.GetUtility(this.uid).subscribe((response: any[]) => {
      // // console.log('inside utility get');

      if (response.length !== 0) {
        // // console.log('found in utility', response);
        let value = 0;
        response.forEach(element => {
          value = +value + +element.amount;
        });
        // // console.log('from utility', value);
        this.calcExpense(value);
      } else {
      // console.log('data not in utility');
      }
  });
  }

// end expense

  onLiabilityEdit() {
    this.router.navigate(['liability']);
  }

  onAssetEdit() {
    this.router.navigate(['asstesroute']);
  }

  getGoal() {
    this.dashboardService.getGoal(this.uid).subscribe( data => {
      this.GoalArray = data;
      // console.log('goal from dashboard', this.GoalArray);

      this.FillGoalCircle();
    });
  }

  linkAssetGoal() {
        this.router.navigate(['goalselect']);

  }

  FillGoalCircle() {
    this.HTMLGoalArray.splice(0, this.HTMLGoalArray.length);

    this.GoalArray.forEach(element => {
      let calc = 0;
      if (element.goalNotes === null) {
        // console.log('null asset total', element.goalNotes);
        // console.log('please link asset to goal');
        this.linkedasset = false;

      } else {

        element.futurecost = Math.round(
          element.presentcost * Math.pow(1 + this.inflation, element.yeartogoal)
        );

        calc = (+element.goalNotes / +element.futurecost) * 100;
        calc = Math.round(calc);
        // console.log('percent', calc);

        this.HTMLGoalArray.push({
          name: element.goalname,
          percent: calc,
          cost: element.futurecost,
          tagged: element.goalNotes
        });

        this.linkedasset = true;

      }
      // // console.log('assset total', element.goalNotes, 'future cost', element.futurecost);
    });
  }

  getMutualFund(uid) {
    this.total = 0;
    this.dashboardService.getMutualFund(this.uid).subscribe(data => {
      this.result = data;
      // // console.log(this.result);
      for (let i = 0; i < this.result.length; i++) {
        this.total = this.total + +this.result[i].currentvalue;
      }
      this.assetTotal = +this.assetTotal + +this.total;
      // // console.log('mutual', this.total);
    });
  }

  getStock(uid) {
    this.totalStock = 0;
    this.dashboardService.getStock(this.uid).subscribe(data => {
      this.resultStock = data;
      // // console.log(this.resultStock);
      for (let i = 0; i < this.resultStock.length; i++) {
        this.totalStock = this.totalStock + +this.resultStock[i].no_of_shares;
      }
      this.assetTotal = +this.assetTotal + +this.totalStock;
      // // console.log('stock', this.totalStock);
    });
  }

  getSaving(uid) {
    this.totalSaving = 0;
    this.dashboardService.getSaving(this.uid).subscribe(data => {
      this.resultSaving = data;
      // // console.log(this.resultSaving);
      for (let i = 0; i < this.resultSaving.length; i++) {
        this.totalSaving = this.totalSaving + +this.resultSaving[i];
      }
      this.assetTotal = +this.assetTotal + +this.totalSaving;

    });
  }

  getChit(uid) {
    this.totalChit = 0;
    this.dashboardService.getChit(this.uid).subscribe(data => {
      this.resultChit = data;
      // // console.log(this.resultChit);
      for (let i = 0; i < this.resultChit.length; i++) {
        this.totalChit = this.totalChit + +this.resultChit[i].current_value;
      }
      this.assetTotal = +this.assetTotal + +this.totalChit;

    });
  }

  getCash(uid) {
    this.totalCash = 0;
    this.dashboardService.getCash(this.uid).subscribe(data => {
      this.resultCash = data;
      // // console.log(this.resultCash);
      for (let i = 0; i < this.resultCash.length; i++) {
        this.totalCash = this.totalCash + +this.resultCash[i].amount;
      }
      this.assetTotal = +this.assetTotal + +this.totalCash;

    });
  }

  getAlterInvestment(uid) {
    this.totalAlterInvestment = 0;
    this.dashboardService.getAlterInvestment(this.uid).subscribe(data => {
      this.resultAlterInvestment = data;
      // // console.log(this.resultAlterInvestment);
      for (let i = 0; i < this.resultAlterInvestment.length; i++) {
        this.totalAlterInvestment =
          this.totalAlterInvestment +
          +this.resultAlterInvestment[i].amount_invested;
      }
      this.assetTotal = +this.assetTotal + +this.totalAlterInvestment;

    });
  }

  getPCJ(uid) {
    this.totalPCJ = 0;
    this.dashboardService.getPCJ(this.uid).subscribe(data => {
      this.resultPCJ = data;
      // // console.log(this.resultPCJ);
      for (let i = 0; i < this.resultPCJ.length; i++) {
        this.totalPCJ = this.totalPCJ + +this.resultPCJ[i].current_m_value;
      }
      this.assetTotal = +this.assetTotal + +this.totalPCJ;

    });
  }

  getFAO(uid) {
    this.totalFAO = 0;
    this.dashboardService.getFAO(this.uid).subscribe(data => {
      this.resultFAO = data;
      // // console.log(this.resultFAO);
      for (let i = 0; i < this.resultFAO.length; i++) {
        this.totalFAO = this.totalFAO + +this.resultFAO[i].contract_m_value;
      }
      this.assetTotal = +this.assetTotal + +this.totalFAO;

      this.piechart(
        this.total,
        this.totalStock,
        this.totalSaving,
        this.totalChit,
        this.totalCash,
        this.totalAlterInvestment,
        this.totalPCJ,
        this.totalFAO
      );
    });
  }

  piechart(
    total,
    totalStock,
    totalSaving,
    totalChit,
    totalCash,
    totalAlterInvestment,
    totalPCJ,
    totalFAO
  ) {
    this.pieChartableLabels.push(
      'MutualFund',
      'stock',
      'saving',
      'chit',
      'cash',
      'alterInvest',
      'pcj',
      'fao'
    );
    this.pieChartData.push(
      total,
      totalStock,
      totalSaving,
      totalChit,
      totalCash,
      totalAlterInvestment,
      totalPCJ,
      totalFAO
    );
    // this.assetChart = 'pie';
    this.colors = [
      {
        backgroundColor: [
          '#FF69B4',
          '#ff0000',
          '	#9400D3',
          '#696969',
          '#1E90FF',
          '#00CED1',
          '#FFD700',
          '#00FF00',
          '#FF4500'
        ]
      }
    ];
  }

  liabilitiesChart(totalLiabilities) {
    // console.log('valueset');
    this.pieChartableLabel.push('totalLiabilities');
    this.pieChartDataa.push(totalLiabilities);
    this.color = [{ backgroundColor: ['#808080'] }];
  }
}
