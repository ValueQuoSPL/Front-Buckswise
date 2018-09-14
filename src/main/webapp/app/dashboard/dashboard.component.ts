import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService, Principal } from 'app/shared';
import { DashboardService } from 'app/dashboard/dashboard.service';
import { SavingScheme } from 'app/my-assets/saving-scheme/savingscheme.modal';

@Component({
  selector: 'jhi-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
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

  public pieChartableLabels: any = [];
  public pieChartData: any = [];
  public pieChartType: any;
  // public pieChartOptions: any;
  // public pieChartableLabels: string[] = ['Mutual Fund', 'Stock', 'Saving'];
  // public pieChartData: number[] = [0 , 500, 100];
  // public pieChartType = 'pie';

  constructor(
    private router: Router,
    private dashboardService: DashboardService,
    private accountService: AccountService,
    private principal: Principal
  ) {}

  ngOnInit() {
    this.getUserid();

    this.principal.identity().then(account => {
      this.account = account;
    });
  }

  getUserid() {
    return this.accountService
      .get()
      .toPromise()
      .then(response => {
        const account = response.body;
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
        } else {
        }
      })
      .catch(err => {});
  }

  onLiabilityEdit() {
    this.router.navigate(['assets']);
  }

  onAssetEdit() {
    this.router.navigate(['asstesroute']);
  }

  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

  getMutualFund(uid) {
    this.total = 0;
    this.dashboardService.getMutualFund(this.uid).subscribe(data => {
      this.result = data;
      // console.log(this.result);
      for (let i = 0; i < this.result.length; i++) {
        this.total = this.total + +this.result[i].currentvalue;
      }
      console.log(this.total);
    });
  }

  getStock(uid) {
    this.totalStock = 0;
    this.dashboardService.getStock(this.uid).subscribe(data => {
      this.resultStock = data;
      // console.log(this.resultStock);
      for (let i = 0; i < this.resultStock.length; i++) {
        this.totalStock = this.totalStock + +this.resultStock[i].no_of_shares;
      }
      console.log(this.totalStock);
    });
  }

  getSaving(uid) {
    this.totalSaving = 0;
    this.dashboardService.getSaving(this.uid).subscribe(data => {
      this.resultSaving = data;
      // console.log(this.resultSaving);
      for (let i = 0; i < this.resultSaving.length; i++) {
        this.totalSaving = this.totalSaving + +this.resultSaving[i];
      }
    });
  }

  getChit(uid) {
    this.totalChit = 0;
    this.dashboardService.getChit(this.uid).subscribe(data => {
      this.resultChit = data;
      // console.log(this.resultChit);
      for (let i = 0; i < this.resultChit.length; i++) {
        this.totalChit = this.totalChit + +this.resultChit[i].current_value;
      }
    });
  }

  getCash(uid) {
    this.totalCash = 0;
    this.dashboardService.getCash(this.uid).subscribe(data => {
      this.resultCash = data;
      // console.log(this.resultCash);
      for (let i = 0; i < this.resultCash.length; i++) {
        this.totalCash = this.totalCash + +this.resultCash[i].amount;
      }
    });
  }

  getAlterInvestment(uid) {
    this.totalAlterInvestment = 0;
    this.dashboardService.getAlterInvestment(this.uid).subscribe(data => {
      this.resultAlterInvestment = data;
      // console.log(this.resultAlterInvestment);
      for (let i = 0; i < this.resultAlterInvestment.length; i++) {
        this.totalAlterInvestment =
          this.totalAlterInvestment +
          +this.resultAlterInvestment[i].amount_invested;
      }
    });
  }

  getPCJ(uid) {
    this.totalPCJ = 0;
    this.dashboardService.getPCJ(this.uid).subscribe(data => {
      this.resultPCJ = data;
      // console.log(this.resultPCJ);
      for (let i = 0; i < this.resultPCJ.length; i++) {
        this.totalPCJ = this.totalPCJ + +this.resultPCJ[i].current_m_value;
      }
    });
  }

  getFAO(uid) {
    this.totalFAO = 0;
    this.dashboardService.getFAO(this.uid).subscribe(data => {
      this.resultFAO = data;
      // console.log(this.resultFAO);
      for (let i = 0; i < this.resultFAO.length; i++) {
        this.totalFAO = this.totalFAO + +this.resultFAO[i].contract_m_value;
      }
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
    // console.log(total);
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
    this.pieChartType = 'pie';
  }
}
