import { Injectable, Output } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SERVER_API_URL } from 'app/app.constants';
import { Eightyd } from 'app/sheetal/main/Services/eightyd.model';
import { Subscription } from 'rxjs/Subscription';
import { Component, OnInit } from '@angular/core';
import { AccountService } from 'app/shared';
import { Subject } from 'rxjs/Subject';
import { accountState } from 'app/account';

@Injectable()
export class EightydService {
  id;
  userID;
  // temp: any = [];
  user;
  // id: any;
  model: Eightyd = new Eightyd();

  ServiceAPIParam: string;
  constructor(private http: HttpClient, private account: AccountService) {}

  // return this.account.get().toPromise().then((response) => {
  //  const account = response.body;
  //  console.log('in eightyservice', account);
  // },
  // public ServiceEightyd(eightyd) {

  // console.log(eightyd.Insureself);
  // console.log(eightyd.Insureparents);
  // console.log(eightyd.Health);
  // id: any;
  save(eightyd: any): Observable<any> {
<<<<<<< HEAD
    return this.http.post(SERVER_API_URL + 'api/eightds', eightyd);
  }

  public geteightyd(uid) {
    console.log('in geteightyd service', uid);
    this.ServiceAPIParam = 'api/eightds' + '/' + uid;
=======
    return this.http.post(SERVER_API_URL + "api/eightyds", eightyd);
  }

  public geteightyd(uid) {
    console.log("in geteightyd service", uid);
    this.ServiceAPIParam = "api/eightyds" + "/" + uid;
>>>>>>> 38f1decb52340f342dc7f7c9315808c551d58ce8
    return this.http.get(SERVER_API_URL + this.ServiceAPIParam).map(res => res);
  }
  // public PutEightyd(eightyd) {
  //   const url = SERVER_API_URL + 'api/eightds' + id;
  //   return this.http.put(url);
  // }
}
