import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { SERVER_API_URL } from "../../../app.constants";
import { Eightyc } from "./eightyc.model";
import { Subscription } from "rxjs/Subscription";
import { Component, OnInit } from "@angular/core";
import { AccountService } from "../../../shared";

@Injectable()
export class EightycService {
  ID;
  userID;
  // temp: any = [];
  user;
  // id: any;
  model: Eightyc = new Eightyc();

  ServiceAPIParam: string;

  constructor(private http: HttpClient, private account: AccountService) {}

  // public ServiceEightyc(eightyc) {
  // console.log(eightyc.Fixed);
  // console.log(eightyc.Tution);
  // console.log(eightyc.Nsc);
  // console.log(eightyc.Nss);
  // console.log(eightyc.Post);
  //  console.log(eightyc.Reinvest);
  // console.log(eightyc.Licpremium);
  // console.log(eightyc.Equity);
  //  console.log(eightyc.Pf);
  //  console.log(eightyc.Ppf);
  //  console.log(eightyc.Other);
  // console.log(eightyc.Tutionfee);
  // console.log(eightyc.Ulip);
  save(eightyc: any): Observable<any> {
    return this.http.post(SERVER_API_URL + "api/eightycs", eightyc);
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
  public geteightyc(id) {
    console.log("in geteightyc service", id);
    this.ServiceAPIParam = "api/eightycs" + "/" + id;
    return this.http.get(SERVER_API_URL + this.ServiceAPIParam).map(res => res);
  }
}
