import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from 'app/app.constants';
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
} from 'app/pratik/spending/spending.model';

@Injectable()
export class IncomeService {
  response: Observable<any>;
  constructor(private http: HttpClient) {}

  public PostIncome(income) {
    return this.http.post(SERVER_API_URL + 'api/income/income', income);
  }

  public PutIncome(income, uid) {
    const url = SERVER_API_URL + 'api/income/putincome/' + uid;
    return this.http.put(url, income);
  }

  public GetIncome(uid) {
    const url = SERVER_API_URL + 'api/income/getincome/' + uid;
    const response = this.http.get(url, { observe: 'body' });
    return response;
  }

  public DeleteIncome(income, uid) {
    console.log(income);
    const url = SERVER_API_URL + 'api/income/deleteincome' + uid;
    const response = this.http.delete(url, { observe: 'body' });
    return response;
  }
}

@Injectable()
export class UtilityService {
  constructor(private http: HttpClient) {}

  public PostUtility(utility) {
    console.log(utility);
    const url = SERVER_API_URL + 'api/expense-utility/utility';
    return this.http.post(url, utility);
  }
  public PutUtility(utility, uid) {
    console.log(utility);
    const url = SERVER_API_URL + 'api/expense-utility/pututility/' + uid;
    return this.http.put(url, utility);
  }
  public GetUtility(uid) {
    console.log('get utility service');
    const url = SERVER_API_URL + 'api/expense-utility/getutility/' + uid;
    return this.http.get(url);
  }
}

@Injectable()
export class HouseService {
  constructor(private http: HttpClient) {}

  public PutHouse(house) {
    console.log(house);
    return this.http.post(
      SERVER_API_URL + 'api/expensehousehold/household',
      house
    );
  }
  public GetHouse(uid) {
    console.log('gethouse service');
    const url = SERVER_API_URL + 'api/' + uid;
    return this.http.get(url);
  }
}

@Injectable()
export class CreditService {
  constructor(private http: HttpClient) {}

  public PutCredit(credit) {
    console.log(credit);
    return this.http.post(SERVER_API_URL + 'api/creditcard/credit', credit);
  }
  public GetCredit(uid) {
    const url = SERVER_API_URL + 'api/' + uid;
    return this.http.get(url);
  }
}

@Injectable()
export class GeneralService {
  constructor(private http: HttpClient) {}

  public PutGeneral(general) {
    console.log(general);
    return this.http.post(
      SERVER_API_URL + 'api/general-insurance/general',
      general
    );
  }
  public GetGeneral(uid) {
    const url = SERVER_API_URL + 'api/' + uid;
    return this.http.get(url);
  }
}

@Injectable()
export class HealthService {
  constructor(private http: HttpClient) {}

  public PutHealth(health) {
    console.log(health);
    return this.http.post(
      SERVER_API_URL + 'api/health-insurance/health',
      health
    );
  }
  public GetHealth(uid) {
    const url = SERVER_API_URL + 'api/' + uid;
    return this.http.get(url);
  }
}

@Injectable()
export class LifeService {
  constructor(private http: HttpClient) {}

  public PutLife(life) {
    console.log(life);
    return this.http.post(
      SERVER_API_URL + 'api/insurancepayment/insuance-payment',
      life
    );
  }
  public GetLife(uid) {
    const url = SERVER_API_URL + 'api/' + uid;
    return this.http.get(url);
  }
}

@Injectable()
export class LoanService {
  constructor(private http: HttpClient) {}

  public PutLoan(loan) {
    console.log(loan);
    return this.http.put(
      'https://demologin-79c13.firebaseio.com/loan.json',
      loan
    );
  }
  public GetLoan(uid) {
    const url = SERVER_API_URL + 'api/' + uid;
    return this.http.get(url);
  }
}

@Injectable()
export class MiscService {
  constructor(private http: HttpClient) {}

  public PutMisc(misc) {
    console.log(misc);
    return this.http.post(
      SERVER_API_URL + 'api/miscellaneous/miscellenous',
      misc
    );
  }
  public GetMisc(uid) {
    const url = SERVER_API_URL + 'api/' + uid;
    return this.http.get(url);
  }
}

@Injectable()
export class TravelService {
  constructor(private http: HttpClient) {}

  public PutTravel(travel) {
    console.log(travel);
    return this.http.put(
      'https://demologin-79c13.firebaseio.com/travel.json',
      travel
    );
  }

  public GetTravel(uid) {
    console.log('gethouse service');
    const url = SERVER_API_URL + 'api/' + uid;
    return this.http.get(url);
  }
}
