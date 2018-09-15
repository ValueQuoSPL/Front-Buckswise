// import { log } from 'util';
// import { Component, OnInit } from '@angular/core';
// import { Principal } from 'app/shared';
// import { Stocks } from 'app/my-assets/assets/stocks.model';
// import { Observable } from 'rxjs/Observable';
// import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
// import { JhiEventManager } from 'ng-jhipster';
// import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// import { MutualFundService } from 'app/my-assets/assets/mutual-fund.service';
// import { StocksService } from 'app/my-assets/assets/stocks.service';
// import { MutualFund } from 'app/my-assets/assets/mutual-fund.model';
// import { AssetsService } from 'app/my-assets/assets/assets.service';
// import { AccountService } from '../../shared';
// import {
//   FAO,
//   SavingScheme,
//   AltInvest,
//   Cash,
//   Property,
//   ChitFund
// } from 'app/my-assets/assets/assets.model';
// import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

// @Component({
//   selector: 'jhi-assets',
//   templateUrl: './assets.component.html',
//   styleUrls: ['assets.css']
// })
// export class AssetsComponent implements OnInit {
//   stocks: Stocks = new Stocks();
//   isSaving: boolean;
//   mutualfund: MutualFund = new MutualFund();
//   fao: FAO = new FAO();
//   savingScheme: SavingScheme = new SavingScheme();
//   altInvest: AltInvest = new AltInvest();
//   cash: Cash = new Cash();
//   prop: Property = new Property();
//   chit: ChitFund = new ChitFund();
//   userid:number;
//   id:number;
//   newid:any
//   commonid:number;
//   uid:any;
//   uid1:any;
//   uid2:any;
//   uid3:any;
//   uid4:any;
//   uid5:any;
//   uid6:any;
//   uid7:any;
//   user:any;
//   saving:any;
//   conformkey:any;
//   Future:any;
//   alternateinvest:any;
//   CashDetails:any;
//   propertyDetail:any;
//   getid:any;
//   chitfund:any;
//   output:any;
//   out:any;
//   isValid:any;
//   mutualfundArray = [];
//   stocksArray: any = [];
//   faoArray = [];
//   altInvestArray = [];
//   cashArray = [];
//   propArray = [];
//   chitArray = [];
//   fieldArray = [];
//   savingArray = [];
//   step = 0;
//   closeResult: string;
//   schemesArray = [
//     { viewValue: 'FIXED DEPOSIT' },
//     { viewValue: 'RECURRING DEPOSIT' },
//     { viewValue: 'POST OFFICE SAVING' },
//     { viewValue: 'NATIONAL SAVING SCHEME' },
//     { viewValue: 'NATIONAL SAVINGS CERTIFICATE' },
//     { viewValue: 'INDIRA VIKAS PATRA' },
//     { viewValue: 'KISAN VIKAS PATRA' },
//     { viewValue: 'MONTHLY INCOME SCHEME' },
//     { viewValue: 'PF' },
//     { viewValue: 'PPF' },
//     { viewValue: 'GRATUITY' },
//     { viewValue: 'SUPERANNUATION' },
//     { viewValue: 'NPS' },
//     { viewValue: 'GOVERNMENT BONDS' },
//     { viewValue: 'CORPORATE BONDS' },
//     { viewValue: 'INFRA BONDS' }
//   ];
//   dividendArray = [
//     { name: 'Monthly' },
//     { name: 'Quarterly' },
//     { name: 'Half Yearly' },
//     { name: 'Yearly' },
//     { name: 'Monthly Re Investment' },
//     { name: 'Quarterly Re Investment' },
//     { name: 'Half Yearly Re Investment' },
//     { name: 'Yearly Re Investment' }
//   ];

//   constructor(
//     private principal: Principal,
//     public activeModal: NgbActiveModal,
//     private stocksService: StocksService,
//     private eventManager: JhiEventManager,
//     private mutualFundService: MutualFundService,
//     private assetsService: AssetsService,
//     private modalService: NgbModal,
//     private account: AccountService
//   ) {}

//   ngOnInit() {
//     this.isSaving = false;
//     this.principal.identity().then(account => {
//       this.account = account;
//     });
//     // this.getStockId(this.id);
//     this.FetchId();
//   }
//   private getDismissReason(reason: any): string {
//     if (reason === ModalDismissReasons.ESC) {
//       return 'by pressing ESC';
//     } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
//       return 'by clicking on a backdrop';
//     } else {
//       return `with: ${reason}`;
//     }
//   }
//   // stocks
//   openStocks(stocksModal) {
//     console.log('openStocks modal open');
//     this.modalService
//       .open(stocksModal, { ariaLabelledBy: 'stocksModal' })
//       .result.then(
//         result => {
//           this.closeResult = `Closed with: ${result}`;
//           this.saveStocks();
//         },
//         reason => {
//           this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
//         }
//       );
//   }
//   openEditStocks(editStocksModal,id) {
//     this.commonid = id;
//     console.log('editStocksModal common id is',this.commonid);
//     console.log('editStocksModal modal open',id);
//     this.getStockId(this.commonid)
//     this.modalService
//       .open(editStocksModal, { ariaLabelledBy: 'editStocksModal' })
//       .result.then(
//         result => {
//           this.closeResult = `Closed with: ${result}`;
//           this.update(this.commonid);
//         },
//         reason => {
//           this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
//         }
//       );
//   }opendeleteStocks(id) {
//     this.commonid = id;
//     console.log('opendeleteStocks common id is',this.commonid);
//     console.log('opendeleteStocks modal open',id);
//     this.delete(this.commonid);
//   }
//   getStockById(uid){
//     this.stocksService.getStockById(this.uid).subscribe(res => {
//       console.log('this is responce of stack',res);
//        this.out= res;
//        console.log('responce of stocks service', this.out);
//     });
//     this.getMutualFundByUid(this.uid1);
//   }
//   saveStocks() {
//     this.stocksService.SaveStocks(this.stocks).subscribe(data => {
//       alert('Added new stocks details');
//       this.getStockById(this.uid);
//     });
//   }
//   openMutual(content) {
//     console.log('mutual modal open');
//     this.modalService
//       .open(content, { ariaLabelledBy: 'mutualModal' })
//       .result.then(
//         result => {
//           this.closeResult = `Closed with: ${result}`;
//           this.saveMutual();
//           // console.log('add income success');
//         },
//         reason => {
//           this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
//         }
//       );
//   }
//   saveMutual(): void {
//     this.mutualFundService.SubmitUser(this.mutualfund).subscribe(data => {
//       alert('Added new MF details');
//       this.getMutualFundByUid(this.uid1);
//     });

//   }
//   openFuture(content) {
//     console.log('future modal open');
//     this.modalService
//       .open(content, { ariaLabelledBy: 'futureModal' })
//       .result.then(
//         result => {
//           this.closeResult = `Closed with: ${result}`;
//           this.SaveFAO();
//           // console.log('add income success');
//         },
//         reason => {
//           this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
//         }
//       );
//     }
//     getMutualFundByUid(uid1){
//       this.mutualFundService.getMutualFund(this.uid1).subscribe(res => {
//         console.log('this is responce of mufund',res);
//          this.output = res;
//          console.log('responce of mufund service', this.output);
//       });
//       this.getSavingSchemeUid(this.uid2);
//     }
//   SaveFAO() {
//       this.assetsService.SaveFAO(this.fao).subscribe(data => {
//       alert('Added new Future and objective details');
//       this.getFAOByUid(this.uid7);
//     });

//   }
//   getFAOByUid(uid7){
//     this.assetsService.getFAOByUid(this.uid7).subscribe(res => {
//       console.log('this is responce of getFAOByUid',res);
//        this.Future = res;
//        console.log('responce of getFAOByUid service', this.Future);
//     });
//     // this.getSavingSchemeUid(this.uid);
//   }
//   openSaving(content) {
//     console.log('saving modal open');

//     this.modalService
//       .open(content, { ariaLabelledBy: 'savingModal' })
//       .result.then(
//         result => {
//           this.closeResult = `Closed with: ${result}`;
//           this.SavingScheme();
//           // console.log('add income success');
//         },
//         reason => {
//           this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
//         }
//       );
//   }
//   SavingScheme() {
//     this.assetsService
//       .SavingSchemeDetails(this.savingScheme)
//       .subscribe(data => {
//         alert('Added new Future and objective details');
//       });
//       this.getSavingSchemeUid(this.uid2);
//     }
//   getSavingSchemeUid(uid2){
//     this.assetsService.getSavingScheme(this.uid2).subscribe(res => {
//       console.log('this is responce of SavingScheme',res);
//        this.saving = res;
//        console.log('responce of SavingScheme service', this.saving);
//     });
//     this.getAltInvestment(this.uid3);
//   }

//   openAlt(content) {
//     console.log('mutual modal open');

//     this.modalService.open(content, { ariaLabelledBy: 'altModal' }).result.then(
//       result => {
//         this.closeResult = `Closed with: ${result}`;
//         this.AltInvestment();
//       },
//       reason => {
//         this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
//       }
//     );
//   }
//   AltInvestment() {
//     this.assetsService.AltInvestDetails(this.altInvest).subscribe(data => {
//       alert('Added new Future and objective details');
//       this.getAltInvestment(this.uid3);
//     });
//   }
//   getAltInvestment(uid3){
//     this.assetsService.getAltInvestmentByuid(this.uid3).subscribe(res => {
//       console.log('this is responce of getAltInvestmentByuid',res);
//        this.alternateinvest= res;
//        console.log('responce of getAltInvestmentByuid service', this.alternateinvest);
//     });
//     this.getCashDetailsByuid(this.uid4);
//   }
//   openCash(content) {
//     console.log('mutual modal open');
//     this.modalService
//       .open(content, { ariaLabelledBy: 'cashModal' })
//       .result.then(
//         result => {
//           this.closeResult = `Closed with: ${result}`;
//           this.saveCashDetails();
//           // console.log('add income success');
//         },
//         reason => {
//           this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
//         }
//       );
//   }
//   saveCashDetails() {
//     this.assetsService.CashDetails(this.cash).subscribe(data => {
//       alert('Added new Future and objective details');
//       this.getCashDetailsByuid(this.uid4);
//     });
//   }
//   getCashDetailsByuid(uid4){
//     this.assetsService.getCashDetailsByuid(this.uid4).subscribe(res => {
//       console.log('this is responce of getCashDetailsByuid',res);
//        this.CashDetails= res;
//        console.log('responce of getCashDetailsByuid service', this.CashDetails);
//     });
//     this.getsavePropertyByuid(this.uid5);
//   }

//   openProperty(content) {
//     console.log('mutual modal open');
//     this.modalService
//       .open(content, { ariaLabelledBy: 'propertyModal' })
//       .result.then(
//         result => {
//           this.closeResult = `Closed with: ${result}`;
//           this.saveProperty();
//           // console.log('add income success');
//         },
//         reason => {
//           this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
//         }
//       );
//   }
//   saveProperty() {
//     console.log('this is responce of SavepropertyDetail',this.prop);
//     this.assetsService.PropertyDetails(this.prop).subscribe(data => {
//       alert('Added new Future and objective details');
//       this.getsavePropertyByuid(this.uid5);
//     });
//   }
//   getsavePropertyByuid(uid5){
//     this.assetsService.getsavePropertyByuid(this.uid5).subscribe(res => {
//       console.log('this is responce of getsavePropertyByuid',res);
//        this.propertyDetail= res;
//        console.log('responce of getsavePropertyByuid service', this.propertyDetail);
//     });
//     this.getChitByuid(this.uid6);
//   }

//   openChit(content) {
//     console.log('mutual modal open');
//     this.modalService
//       .open(content, { ariaLabelledBy: 'chitModal' })
//       .result.then(
//         result => {
//           this.closeResult = `Closed with: ${result}`;
//           this.saveChit();
//           // console.log('add income success');
//         },
//         reason => {
//           this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
//         }
//       );
//   }
//   saveChit() {
//     this.assetsService.ChitFundDetails(this.chit).subscribe(data => {
//       alert('Added new Future and objective details');
//       this.getChitByuid(this.uid6);
//     });
//   }
//   getChitByuid(uid6){
//     this.assetsService.getChitByuid(this.uid6).subscribe(res => {
//       console.log('this is responce of getChitByuid',res);
//        this.chitfund= res;
//        console.log('responce of getChitByuid service', this.chitfund);
//     });
//     this.getFAOByUid(this.uid7)
//   }

//   clear() {
//     this.activeModal.dismiss('cancel');
//   }
//   deleteFieldValue(index) {
//     this.fieldArray.splice(index, 1);
//   }
//   resetFieldValue() {
//     this.stocks.company_name = '';
//     this.stocks.investor_name = '';
//     this.stocks.no_of_shares = 0;
//     this.stocks.share_price = 0;
//     this.stocks.notes = '';
//   }
//   FetchId(): Promise<any> {
//     return this.account
//       .get()
//       .toPromise()
//       .then(response => {
//         this.user = response.body;
//         console.log('user info', this.user);
//         this.stocks.userid = this.user.id;
//         this.mutualfund.userid = this.user.id;
//         this.savingScheme.userid = this.user.id;
//         this.altInvest.userId = this.user.id;
//         this.cash.userid = this.user.id;
//         this.prop.userid = this.user.id;
//         this.chit.userid = this.user.id;
//         this.fao.userid = this.user.id;
//         this.uid = this.stocks.userid;
//         this.uid1= this.mutualfund.userid;
//         this.uid2 = this.savingScheme.userid;
//         this.uid3 = this.altInvest.userId;
//         this.uid4 = this.cash.userid;
//         this.uid5 = this.prop.userid;
//         this.uid6 = this.chit.userid ;
//         this.uid7 = this.fao.userid;
//         console.log('in fetchid method', this.stocks.userid );
//         console.log('in fetchid method', this.mutualfund.userid);
//         console.log('in fetchid method', this.altInvest.userId);
//         // this.getMyProfilebyid(this.uid);
//         this.getStockById(this.uid)
//         // this.getMutualFundByUid(this.uid1)
//       });
//   }
//   getStockId(commonid){
//     this.stocksService.getStockId(this.commonid).subscribe(res => {
//       console.log('this is responce of getStockId ',res);
//       this.getid=res;
//       this.stocks.id= this.getid.id;
//       this.stocks.company_name=this.getid.company_name;
//       this.stocks.investor_name = this.getid.investor_name;
//       this.stocks.no_of_shares = this.getid.no_of_shares;
//       this.stocks.share_price = this.getid.share_price;
//       this.stocks.notes = this.getid.notes;
//     });
//   }
//   update(commonid){

//     console.log('inside update id is ',this.commonid);
//     // this.getStockId(this.id)
//     this.stocks.id=this.commonid;
//     // this.newid= this.stocks.id;
//     // this.getStockId(this.newid);
//     console.log('inside update',this.stocks);
//     this.stocksService.UpdateStock(this.stocks).subscribe(data => {
//       alert('Added new stocks details');
//       this.getStockById(this.uid);
//     });
//   }
//   delete(commonid){
//     this.conformkey = confirm('really Want to delete?');
//   if (this.conformkey == true) {
//     // this.conformkey = 'You pressed OK!';
//     console.log('inside delete id is ',this.commonid);
//     // this.getStockId(this.id)
//     this.stocks.id=this.commonid;
//     console.log('inside delete',this.stocks);
//     this.stocksService.DeleteStock(this.stocks.id).subscribe(data => {
//       confirm('delete stocks details');
//       this.getStockById(this.uid);

// });
//   }
//     else {
//       this.getStockById(this.uid);
//   }
//   }
// }
