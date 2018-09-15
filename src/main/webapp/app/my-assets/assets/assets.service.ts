// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { SERVER_API_URL } from 'app/app.constants';
// import { Stocks } from 'app/my-assets/assets/stocks.model';
// import { FAO, SavingScheme, AltInvest, Cash, Property, ChitFund } from 'app/my-assets/assets/assets.model';
// @Injectable()
// export class AssetsService {
//     ServiceAPIParam:any;
//   constructor(private http: HttpClient) { }
// //  public SaveStocks(stocks) {

// //      return this.http.post<Stocks[]>(SERVER_API_URL + 'api/', stocks);
// //  }
//  public SaveFAO(fao) {
//     return this.http.post<FAO[]>(SERVER_API_URL + 'api/future-options', fao);
//  }
//  public SavingSchemeDetails(savingScheme) {
//      console.log('in saving post',savingScheme);
//     return this.http.post<SavingScheme[]>(SERVER_API_URL + 'api/savingscheme', savingScheme);
//  }
//  public AltInvestDetails(altInvest) {
//     return this.http.post<AltInvest[]>(SERVER_API_URL + 'api/atlernate', altInvest);
//  }
//  public CashDetails(cash) {
//     return this.http.post<Cash[]>(SERVER_API_URL + 'api/cash', cash);
//  }
//  public PropertyDetails(prop) {
//      console.log('inside property',prop);
//     return this.http.post<Property[]>(SERVER_API_URL + 'api/properties', prop);
//  }
//  public ChitFundDetails(chit) {
//     return this.http.post<ChitFund[]>(SERVER_API_URL + 'api/chits', chit);
//  }
//  public getSavingScheme(uid2){
//         console.log('in getSavingScheme service uid',uid2);
//         this.ServiceAPIParam = 'api/getsaving' + '/' + uid2;
//         return this.http.get(SERVER_API_URL + this.ServiceAPIParam);
//       }
//       public getAltInvestmentByuid(uid3){
//         console.log('in getAltInvestmentByuid service uid',uid3);
//         this.ServiceAPIParam = 'api/atlernate' + '/' + uid3;
//         return this.http.get(SERVER_API_URL + this.ServiceAPIParam);
//       }
//       public getCashDetailsByuid(uid4){
//         console.log('in getCashDetailsByuid service uid',uid4);
//         this.ServiceAPIParam = 'api/cashById' + '/' + uid4;
//         return this.http.get(SERVER_API_URL + this.ServiceAPIParam);
//       }
//       public getsavePropertyByuid(uid5){
//         console.log('in getsavePropertyByuid service uid',uid5);
//         this.ServiceAPIParam = 'api/property' + '/' + uid5;
//         return this.http.get(SERVER_API_URL + this.ServiceAPIParam);
//       }
//       public getChitByuid(uid6){
// console.log('in getChitByuid service uid',uid6);
//         this.ServiceAPIParam = 'api/Chits' + '/' + uid6;
//         return this.http.get(SERVER_API_URL + this.ServiceAPIParam);
//       }
//       public getFAOByUid(uid7){
//         console.log('in getFAOByUid service uid',uid7);
//         this.ServiceAPIParam = 'api/futureOption' + '/' + uid7;
//         return this.http.get(SERVER_API_URL + this.ServiceAPIParam);
//       }

// }
