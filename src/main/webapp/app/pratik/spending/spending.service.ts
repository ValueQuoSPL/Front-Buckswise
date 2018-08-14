import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { SERVER_API_URL } from "app/app.constants";
import {
  Utility,
  Credit,
  General,
  Health,
  House,
  Income,
  Life,
  Loan,
  Misc,
  Travel
} from "app/pratik/spending/spending.model";

@Injectable()
export class IncomeService {
  response: Observable<any>;
  constructor(private http: HttpClient) {}

  public PutIncome(income) {
    console.log(income);
    console.log("putIncome service");
    return this.http.post(SERVER_API_URL + "api/income/income", income);
  }

  public GetIncome() {
    console.log("getIncome service");
    return this.request();
  }
  request() {
    const url = "https://demologin-79c13.firebaseio.com/income.json";
    this.response = this.http.get(url, { observe: "body" });
    console.log("inside request");
    console.log(this.response);
    return this.response;
  }
}

@Injectable()
export class UtilityService {
  constructor(private http: HttpClient) {}

  public PutUtility(utility) {
    console.log(utility);
    return this.http.post(
      SERVER_API_URL + "api/expense-utility/utility",
      utility
    );
  }
  public GetUtility() {
    console.log("getIncome service");
    return this.http.get("https://demologin-79c13.firebaseio.com/utility.json");
  }
}

@Injectable()
export class HouseService {
  constructor(private http: HttpClient) {}

  public PutHouse(house) {
    console.log(house);
    return this.http.post(
      SERVER_API_URL + "api/expensehousehold/household",
      house
    );
  }
  public GetHouse() {
    console.log("gethouse service");
    return this.http.get(
      "https://demologin-79c13.firebaseio.com/household.json"
    );
  }
}

@Injectable()
export class CreditService {
  constructor(private http: HttpClient) {}

  public PutCredit(credit) {
    console.log(credit);
    return this.http.post(SERVER_API_URL + "api/creditcard/credit", credit);
  }
  public GetCredit() {
    return this.http.get("https://demologin-79c13.firebaseio.com/credit.json");
  }
}

@Injectable()
export class GeneralService {
  constructor(private http: HttpClient) {}

  public PutGeneral(general) {
    console.log(general);
    return this.http.post(
      SERVER_API_URL + "api/general-insurance/general",
      general
    );
  }
  public GetGeneral() {
    return this.http.get(
      "https://demologin-79c13.firebaseio.com/ins_general.json"
    );
  }
}

@Injectable()
export class HealthService {
  constructor(private http: HttpClient) {}

  public PutHealth(health) {
    console.log(health);
    return this.http.post(
      SERVER_API_URL + "api/health-insurance/health",
      health
    );
  }
  public GetHealth() {
    return this.http.get(
      "https://demologin-79c13.firebaseio.com/ins_health.json"
    );
  }
}

@Injectable()
export class LifeService {
  constructor(private http: HttpClient) {}

  public PutLife(life) {
    console.log(life);
    return this.http.post(
      SERVER_API_URL + "api/insurancepayment/insuance-payment",
      life
    );
  }
  public GetLife() {
    return this.http.get(
      "https://demologin-79c13.firebaseio.com/ins_life.json"
    );
  }
}

@Injectable()
export class LoanService {
  constructor(private http: HttpClient) {}

  public PutLoan(loan) {
    console.log(loan);
    return this.http.put(
      "https://demologin-79c13.firebaseio.com/loan.json",
      loan
    );
  }
  public GetLoan() {
    return this.http.get("https://demologin-79c13.firebaseio.com/loan.json");
  }
}

@Injectable()
export class MiscService {
  constructor(private http: HttpClient) {}

  public PutMisc(misc) {
    console.log(misc);
    return this.http.post(
      SERVER_API_URL + "api/miscellaneous/miscellenous",
      misc
    );
  }
  public GetMisc() {
    return this.http.get("https://demologin-79c13.firebaseio.com/misc.json");
  }
}

@Injectable()
export class TravelService {
  constructor(private http: HttpClient) {}

  public PutTravel(travel) {
    console.log(travel);
    return this.http.put(
      "https://demologin-79c13.firebaseio.com/travel.json",
      travel
    );
  }

  public GetTravel() {
    console.log("gethouse service");
    return this.http.get("https://demologin-79c13.firebaseio.com/travel.json");
  }
}
