import { Injectable, Output } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { SERVER_API_URL } from "app/app.constants";
import { Eightyd } from "app/sheetal/main/Services/eightyd.model";
import { Subscription } from "rxjs/Subscription";
import { Component, OnInit } from "@angular/core";
import { AccountService } from "app/shared";
import { Subject } from "rxjs/Subject";
import { accountState } from "app/account";

@Injectable()
export class EightydService {
  ID;
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
    return this.http.post(SERVER_API_URL + "api/eightds", eightyd);
  }
  FetchID(): Promise<any> {
    return this.account
      .get()
      .toPromise()
      .then(response => {
        this.user = response.body;
        console.log("user info", this.user);
        this.userID = this.user.id;
        console.log("in service", this.userID);
      });
  }
  public geteightyd(id) {
    console.log("in geteightyd service", id);
    this.ServiceAPIParam = "api/eightds" + "/" + id;
    return this.http.get(SERVER_API_URL + this.ServiceAPIParam).map(res => res);
    //   // return this.http.get(SERVER_API_URL + 'api/eightds/{id}').map((res) => res);
    //   }
    // public geteightyd(id)  {
    // console.log('in geteightyd service', id);
    //  this.ServiceAPIParam = 'api/eightds' + '/' + id;
    //  return this.http.get(SERVER_API_URL + this.ServiceAPIParam).map((res)  => res);
    // return this.http.get(SERVER_API_URL + 'api/eightds/{id}').map((res) => res);
  }
}
