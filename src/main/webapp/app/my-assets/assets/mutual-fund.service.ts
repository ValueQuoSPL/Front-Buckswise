import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MutualFund } from 'app/my-assets/assets/mutual-fund.model';
import { SERVER_API_URL } from 'app/app.constants';

@Injectable()
export class MutualFundService {
  public ServiceAPIParam: any;

  constructor(private http: HttpClient) {}
  public SubmitUser(mutualfund) {
    return this.http.post<MutualFund[]>(
      SERVER_API_URL + 'api/mutualfunds',
      mutualfund
    );
  }
  public getMutualFund(uid1) {
    console.log('in getMutualFundByUid service uid', uid1);
    this.ServiceAPIParam = 'api/mutualfund' + '/' + uid1;
    return this.http.get(SERVER_API_URL + this.ServiceAPIParam);
  }
}
