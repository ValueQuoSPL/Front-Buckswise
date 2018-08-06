
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

@Component({
  selector: 'jhi-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  gross: Gross  =  new Gross();
  eightyc: Eightyc  =  new Eightyc();
  home: Home  =  new Home();
  eightyd: Eightyd =  new Eightyd();
  other: Other =  new Other();

      constructor(
        private grossService: GrossService,
        private eightycService: EightycService,
        private homeService: HomeService,
        private eightydService: EightydService,
        private otherService: OtherService

      ) { }
       ngOnInit() {

// for gross
        this.gross.Bsalary = 0;
        this.gross.Da = 0;
        this.gross.Hra = 0;
        this.gross.Conveyance = 0;
        this.gross.Childedu = 0;
        this.gross.Medical = 0;
        this.gross.Lta = 0;
        this.gross.Otherallown = 0;
        this.gross.Bonus = 0;
        this.gross.Rentincome = 0;
        this.gross.Saving = 0;
        this.gross.Bonds = 0;
        this.gross.Convay = 0;

// for eightyc
       this.eightyc.Fixed = 0;
       this.eightyc.Tution = 0;
       this.eightyc.Nsc = 0;
       this.eightyc.Nss = 0;
       this.eightyc.Post = 0;
       this.eightyc.Reinvest = 0;
       this.eightyc.Licpremium = 0;
       this.eightyc.Equity = 0;
       this.eightyc.Pf = 0;
       this.eightyc.Ppf = 0;
       this.eightyc.Other = 0;
       this.eightyc.Tutionfee = 0;
       this.eightyc.Ulip = 0;

// for Home
       this.home.Homeloan = 0;
       this.home.Prncpalloan = 0;
       this.home.Rentclm = 0;
       this.home.Remintrst = 0;
       this.home.Rentclmgg = 0;

// for 80D Deduction
       this.eightyd.Insureself = 0;
       this.eightyd.Insureparents = 0;
       this.eightyd.Health = 0;

       // for other
       this.other.Handicapped = 0;
       this.other.Medicaltreat = 0;
       this.other.Selfedu = 0;
       this.other.Nps = 0;
       this.other.Rgess = 0;
       this.other.Donation = 0;
      }
    // gross call function
    onGrossSave(): void {
      this.grossService.ServiceGross(this.gross)
       .subscribe(data => {
         alert('success');
      });
    }
    // eightyc call function
    onEightycSave(): void {
      this.eightycService.ServiceEightyc(this.eightyc)
       .subscribe(data => {
         alert('success');
      });
    }
    // home call function
    onHomeSave(): void {
      this.homeService.ServiceHome(this.home)
       .subscribe(data => {
         alert('success');
      });
    }
    // eightyd call function
    onEightydSave(): void {
      this.eightydService.ServiceEightyd(this.eightyd)
       .subscribe(data => {
         alert('success');
      });
    }
    // Other call function
    onOtherSave(): void {
      this.otherService.ServiceOther(this.other)
       .subscribe(data => {
         alert('success');
      });
    }
    }
