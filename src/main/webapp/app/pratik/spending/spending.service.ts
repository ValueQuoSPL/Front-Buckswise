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
    return this.http.get(url, { observe: 'body' });
  }

  public DeleteIncome(id) {
    const url = SERVER_API_URL + 'api/income/deleteincome/' + id;
    return this.http.delete(url);
  }
}

@Injectable()
export class UtilityService {
  constructor(private http: HttpClient) {}

  public PostUtility(utility) {
    const url = SERVER_API_URL + 'api/expense-utility/utility';
    return this.http.post(url, utility);
  }
  public PutUtility(utility, uid) {
    const url = SERVER_API_URL + 'api/expense-utility/pututility/' + uid;
    return this.http.put(url, utility);
  }
  public GetUtility(uid) {
    const url = SERVER_API_URL + 'api/expense-utility/getutility/' + uid;
    return this.http.get(url);
  }
  public DeleteUtility(id) {
    const url = SERVER_API_URL + 'api/expense-utility/deleteutility/' + id;
    return this.http.delete(url);
  }
}

@Injectable()
export class HouseService {
  constructor(private http: HttpClient) {}

  public PostHouse(house) {
    const url = SERVER_API_URL + 'api/expensehousehold/household' ;
    return this.http.post(url, house );
  }
  public PutHouse(house, uid) {
    const url = SERVER_API_URL + 'api/expensehousehold/puthousehold/' + uid ;
    return this.http.put(url, house );
  }
  public GetHouse(uid) {
    const url = SERVER_API_URL + 'api/expensehousehold/get/' + uid;
    return this.http.get(url);
  }
  public DeleteHouse(id) {
    const url = SERVER_API_URL + 'api/expensehousehold/household/' + id;
    return this.http.delete(url);
  }
}

@Injectable()
export class MiscService {
  constructor(private http: HttpClient) {}

  public PostMisc(data) {
    const url = SERVER_API_URL + 'api/' ;
    return this.http.post(url, data );
  }
  public PutMisc(data, uid) {
    const url = SERVER_API_URL + 'api/' + uid ;
    return this.http.put(url, data );
  }
  public GetMisc(uid) {
    const url = SERVER_API_URL + 'api/' + uid;
    return this.http.get(url);
  }
  public DeleteMisc(id) {
    const url = SERVER_API_URL + 'api/' + id;
    return this.http.delete(url);
  }
}

@Injectable()
export class CreditService {
  constructor(private http: HttpClient) {}

  public PostCredit(data) {
    const url = SERVER_API_URL + 'api/' ;
    return this.http.post(url, data );
  }
  public PutCredit(data, uid) {
    const url = SERVER_API_URL + 'api/' + uid ;
    return this.http.put(url, data );
  }
  public GetCredit(uid) {
    const url = SERVER_API_URL + 'api/' + uid;
    return this.http.get(url);
  }
  public DeleteCredit(id) {
    const url = SERVER_API_URL + 'api/' + id;
    return this.http.delete(url);
  }
}

@Injectable()
export class GeneralService {
  constructor(private http: HttpClient) {}

  public PostGeneral(data) {
    const url = SERVER_API_URL + 'api/' ;
    return this.http.post(url, data );
  }
  public PutGeneral(data, uid) {
    const url = SERVER_API_URL + 'api/' + uid ;
    return this.http.put(url, data );
  }
  public GetGeneral(uid) {
    const url = SERVER_API_URL + 'api/' + uid;
    return this.http.get(url);
  }
  public DeleteGeneral(id) {
    const url = SERVER_API_URL + 'api/' + id;
    return this.http.delete(url);
  }
}

@Injectable()
export class HealthService {
  constructor(private http: HttpClient) {}

  public PostHealth(data) {
    const url = SERVER_API_URL + 'api/' ;
    return this.http.post(url, data );
  }
  public PutHealth(data, uid) {
    const url = SERVER_API_URL + 'api/' + uid ;
    return this.http.put(url, data );
  }
  public GetHealth(uid) {
    const url = SERVER_API_URL + 'api/' + uid;
    return this.http.get(url);
  }
  public DeleteHealth(id) {
    const url = SERVER_API_URL + 'api/' + id;
    return this.http.delete(url);
  }
}

@Injectable()
export class LifeService {
  constructor(private http: HttpClient) {}

  public PostLife(data) {
    const url = SERVER_API_URL + 'api/' ;
    return this.http.post(url, data );
  }
  public PutLife(data, uid) {
    const url = SERVER_API_URL + 'api/' + uid ;
    return this.http.put(url, data );
  }
  public GetLife(uid) {
    const url = SERVER_API_URL + 'api/' + uid;
    return this.http.get(url);
  }
  public DeleteLife(id) {
    const url = SERVER_API_URL + 'api/' + id;
    return this.http.delete(url);
  }
}

@Injectable()
export class LoanService {
  constructor(private http: HttpClient) {}

  public PostLoan(data) {
    const url = SERVER_API_URL + 'api/' ;
    return this.http.post(url, data );
  }
  public PutLoan(data, uid) {
    const url = SERVER_API_URL + 'api/' + uid ;
    return this.http.put(url, data );
  }
  public GetLoan(uid) {
    const url = SERVER_API_URL + 'api/' + uid;
    return this.http.get(url);
  }
  public DeleteLoan(id) {
    const url = SERVER_API_URL + 'api/' + id;
    return this.http.delete(url);
  }
}

@Injectable()
export class TravelService {
  constructor(private http: HttpClient) {}

  public PostTravel(data) {
    const url = SERVER_API_URL + 'api/' ;
    return this.http.post(url, data );
  }
  public PutTravel(data, uid) {
    const url = SERVER_API_URL + 'api/' + uid ;
    return this.http.put(url, data );
  }
  public GetTravel(uid) {
    const url = SERVER_API_URL + 'api/' + uid;
    return this.http.get(url);
  }
  public DeleteTravel(id) {
    const url = SERVER_API_URL + 'api/' + id;
    return this.http.delete(url);
  }
}
