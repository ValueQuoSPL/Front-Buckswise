import { NAMED_ENTITIES } from '@angular/compiler';
import { checkAndUpdateBinding } from '@angular/core/src/view/util';
import { Component, OnInit } from '@angular/core';
import { Gross } from 'app/sheetal/main/Services/gross.model';
import { GrossService } from 'app/sheetal/main/Services/gross.service';
import { Eightyc } from 'app/sheetal/main/Services/eightyc.model';
import { EightycService } from 'app/sheetal/main/Services/eightyc.service';
import { Home } from 'app/sheetal/main/Services/home.model';
import { HomeService } from 'app/sheetal/main/Services/home.service';
import { Eightyd } from 'app/sheetal/main/Services/eightyd.model';
import { EightydService } from 'app/sheetal/main/Services/eightyd.service';
import { Other } from 'app/sheetal/main/Services/other.model';
import { OtherService } from 'app/sheetal/main/Services/other.service';
import { error } from 'util';
import { AccountService } from 'app/shared';

@Component({
  selector: 'jhi-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  public ServiceAPIParam: any;
  // public id= 11;
  public id;
  gross: Gross = new Gross();
  eightyc: Eightyc = new Eightyc();
  home: Home = new Home();
  eightyd: Eightyd = new Eightyd();
  other: Other = new Other();
  output: any = [];
  data: any;
  user;
  public userID: any;

  constructor(
    private grossService: GrossService,
    private eightycService: EightycService,
    private homeService: HomeService,
    private eightydService: EightydService,
    private otherService: OtherService,
    private account: AccountService
  ) {}
  // conso
  ngOnInit() {
    // this.id = this.eightydService.returnid();
    // console.log('id in main ts', this.id);
    this.FetchID();
    // for gross
    this.gross.bsalary = 0;
    this.gross.da = 0;
    this.gross.hra = 0;
    this.gross.conveyance = 0;
    this.gross.childedu = 0;
    this.gross.medical = 0;
    this.gross.lta = 0;
    this.gross.otherallown = 0;
    this.gross.bonus = 0;
    this.gross.rentincome = 0;
    this.gross.saving = 0;
    this.gross.bonds = 0;
    this.gross.conveyanceother = 0;

    // for eightyc
    this.eightyc.fixed = 0;
    this.eightyc.tution = 0;
    this.eightyc.nsc = 0;
    this.eightyc.nss = 0;
    this.eightyc.post = 0;
    this.eightyc.reinvest = 0;
    this.eightyc.licpremium = 0;
    this.eightyc.equity = 0;
    this.eightyc.pf = 0;
    this.eightyc.ppf = 0;
    this.eightyc.other = 0;
    this.eightyc.tutionfee = 0;
    this.eightyc.ulip = 0;

    // for Home
    this.home.homeloan = 0;
    this.home.prncpalloan = 0;
    this.home.rentclm = 0;
    this.home.remintrst = 0;
    this.home.rentclmgg = 0;

    // for 80D Deduction
    this.eightyd.medself = 0;
    this.eightyd.medparents = 0;
    this.eightyd.healthcheck = 0;

    // for other
    this.other.handicapped = 0;
    this.other.medicaltreat = 0;
    this.other.selfedu = 0;
    this.other.nps = 0;
    this.other.rgess = 0;
    this.other.donation = 0;
  }

  FetchID(): Promise<any> {
    return this.account
      .get()
      .toPromise()
      .then(response => {
        this.user = response.body;
        console.log('user info', this.user);
        this.id = this.user.id;
        console.log('in service', this.id);
      });
  }
  // gross call function
  onGrossSave() {
    this.grossService
      .save(this.gross)
      .subscribe(response => console.log(response));
  }
  // eightyc call function
  onEightycSave() {
    this.eightycService
      .save(this.eightyc)
      .subscribe(response => console.log(response));
  }
  // home call function
  onHomeSave() {
    this.homeService
      .save(this.home)
      .subscribe(response => console.log(response));
  }
  // eightyd call function
  onEightydSave() {
    this.eightydService.save(this.eightyd).subscribe(
      response => console.log(response)
      // (error) => console.log(error)
    );
  }
  // Other call function
  onOtherSave() {
    this.otherService
      .save(this.other)
      .subscribe(response => console.log(response));
  }
  // 80D Reset
  resetEightyd() {
    this.eightyd.medself = 0;
    this.eightyd.medparents = 0;
    this.eightyd.healthcheck = 0;
  }
  // Other Reset
  resetOther() {
    this.other.handicapped = 0;
    this.other.medicaltreat = 0;
    this.other.selfedu = 0;
    this.other.nps = 0;
    this.other.rgess = 0;
    this.other.donation = 0;
  }
  // Home reset
  resetHome() {
    this.home.homeloan = 0;
    this.home.prncpalloan = 0;
    this.home.rentclm = 0;
    this.home.remintrst = 0;
    this.home.rentclmgg = 0;
  }
  // EightyC Reset
  resetEightyc() {
    this.eightyc.fixed = 0;
    this.eightyc.tution = 0;
    this.eightyc.nsc = 0;
    this.eightyc.nss = 0;
    this.eightyc.post = 0;
    this.eightyc.reinvest = 0;
    this.eightyc.licpremium = 0;
    this.eightyc.equity = 0;
    this.eightyc.pf = 0;
    this.eightyc.ppf = 0;
    this.eightyc.other = 0;
    this.eightyc.tutionfee = 0;
    this.eightyc.ulip = 0;
  }
  // Gross Reset
  resetGross() {
    this.gross.bsalary = 0;
    this.gross.da = 0;
    this.gross.hra = 0;
    this.gross.conveyance = 0;
    this.gross.childedu = 0;
    this.gross.medical = 0;
    this.gross.lta = 0;
    this.gross.otherallown = 0;
    this.gross.bonus = 0;
    this.gross.rentincome = 0;
    this.gross.saving = 0;
    this.gross.bonds = 0;
    this.gross.conveyanceother = 0;
  }
  onEightydGet(id) {
    //  console.log('in main ts', id);
    this.eightydService.geteightyd(id).subscribe(res => {
      console.log(res);
      this.output = res;
      console.log(this.output);
    });
  }
  onOtherGet(id) {
    //  console.log('in main ts', id);
    this.otherService.getother(id).subscribe(res => {
      console.log(res);
      this.output = res;
      console.log(this.output);
    });
  }
  onHomeGet(id) {
    //  console.log('in main ts', id);
    this.homeService.gethome(id).subscribe(res => {
      console.log(res);
      this.output = res;
      console.log(this.output);
    });
  }
}
