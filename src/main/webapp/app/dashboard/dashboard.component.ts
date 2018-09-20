import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService, Principal } from 'app/shared';
import { DashboardService } from 'app/dashboard/dashboard.service';
// import { SavingScheme } from 'app/my-assets/saving-scheme/savingscheme.modal';
// import { ChartsModule } from 'ng2-charts/ng2-charts';

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
  totalLiabilities: any;
  resultLiabilities: any;
  // public GoogleCharts: any;
  public pieChartableLabels: any = [];
  public pieChartData: any = [];
  public assetChart;

  public pieChartableLabel: any = [];
  public pieChartDataa: any = [];
  public liabilityChart;

  // public pieChartOptions: any;
  // public pieChartableLabels: string[] = ['Mutual Fund', 'Stock', 'Saving'];
  // public pieChartData: number[] = [0 , 500, 100];
  // public assetChart = 'pie';

  // GoogleCharts.load(drawChart);

  constructor(
    private router: Router,
    private dashboardService: DashboardService,
    private accountService: AccountService,
    private principal: Principal
  ) {
    // this.piechart(
    //   this.total,
    //   this.totalStock,
    //   this.totalSaving,
    //   this.totalChit,
    //   this.totalCash,
    //   this.totalAlterInvestment,
    //   this.totalPCJ,
    //   this.totalFAO
    // );
  }

  ngOnInit() {
    console.log('inside init');
    // this.liabilityChart = 'pie';
    this.principal.identity().then(account => {
      this.account = account;
    });
    this.getUserid();
  }

  getUserid() {
    return this.accountService
      .get()
      .toPromise()
      .then(response => {
        const account = response.body;
        console.log(account.id);
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
          console.log('inside get lia');
          this.getLiabilities(this.uid);
          console.log('data filled');
          // this.drawChart();
        }
      });
    // .catch(err => {});
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
      // this.getLiabilities(this.uid);
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
    console.log('inside pie chart');
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
    this.assetChart = 'pie';
    // console.log('value', this.total);
    // console.log('value filled chart');
  }

  getLiabilities(uid) {
    console.log('inside get lia');
    this.totalLiabilities = 0;
    this.dashboardService.getLiabilities(this.uid).subscribe(data => {
      this.resultLiabilities = data;
      console.log(this.resultLiabilities);
      for (let i = 0; i < this.resultLiabilities.length; i++) {
        this.totalLiabilities =
          this.totalLiabilities +
          +this.resultLiabilities[i].outstandingpricipal;
      }
      this.liabilitiesChart(this.totalLiabilities);
    });
  }

  liabilitiesChart(totalLiabilities) {
    console.log('valueset');
    this.pieChartableLabel.push('totalLiabilities');
    this.pieChartDataa.push(totalLiabilities);
    this.liabilityChart = 'pie';
  }

  // get for chart
  // getChart() {
  //   this.assetChart = 'pie';
  // }

  // google.charts.load('current', {'packages':['corechart']});
  //     google.charts.setOnLoadCallback(drawChart);

  //     function drawChart() {

  //       let data = google.visualization.arrayToDataTable([
  //         ['Task', 'Hours per Day'],
  //         ['Work',     11],
  //         ['Eat',      2],
  //         ['Commute',  2],
  //         ['Watch TV', 2],
  //         ['Sleep',    7]
  //       ]);

  //       var options = {
  //         title: 'My Daily Activities'
  //       };

  //       var chart = new google.visualization.PieChart(document.getElementById('piechart'));

  //       chart.draw(data, options);
  //     }
  // drawChart() {
  //   const data = GoogleCharts.api.visualization.arrayToDataTable([
  //     ['Chart thing', 'Chart amount'],
  //     ['Lorem ipsum', 60],
  //     ['Dolor sit', 22],
  //     ['Sit amet', 18]
  // ]);

  // const pie_1_chart = new GoogleCharts.api.visualization.PieChart(document.getElementById('chart1'));
  // pie_1_chart.draw(data);
  // }
}
