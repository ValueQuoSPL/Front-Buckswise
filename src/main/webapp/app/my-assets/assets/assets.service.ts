import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { SERVER_API_URL } from "app/app.constants";
import { Stocks } from "app/my-assets/assets/stocks.model";
import {
  FAO,
  SavingScheme,
  AltInvest,
  Cash,
  Property,
  ChitFund
} from "app/my-assets/assets/assets.model";
@Injectable()
export class AssetsService {
  constructor(private http: HttpClient) {}
  public SaveStocks(stocks) {
    return this.http.post<Stocks[]>(SERVER_API_URL + "api/", stocks);
  }
  public SaveFAO(fao) {
    return this.http.post<FAO[]>(SERVER_API_URL + "api/", fao);
  }
  public SavingSchemeDetails(savingScheme) {
    return this.http.post<SavingScheme[]>(
      SERVER_API_URL + "api/saving-scheme/savingscheme",
      savingScheme
    );
  }
  public AltInvestDetails(altInvest) {
    return this.http.post<AltInvest[]>(SERVER_API_URL + "api/", altInvest);
  }
  public CashDetails(cash) {
    return this.http.post<Cash[]>(SERVER_API_URL + "api/", cash);
  }
  public PropertyDetails(prop) {
    return this.http.post<Property[]>(SERVER_API_URL + "api/", prop);
  }
  public ChitFundDetails(chit) {
    return this.http.post<ChitFund[]>(SERVER_API_URL + "api/", chit);
  }
}
