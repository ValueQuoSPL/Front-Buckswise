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
  eightyc: Eightyc = new Eightyc();

  ServiceAPIParam: string;

  constructor(private http: HttpClient, private account: AccountService) {}

  // public ServiceEightyc(eightyc) {
  // // console.log(eightyc.Fixed);
  // // console.log(eightyc.Tution);
  // // console.log(eightyc.Nsc);
  // // console.log(eightyc.Nss);
  // // console.log(eightyc.Post);
  //  // console.log(eightyc.Reinvest);
  // // console.log(eightyc.Licpremium);
  // // console.log(eightyc.Equity);
  //  // console.log(eightyc.Pf);
  //  // console.log(eightyc.Ppf);
  //  // console.log(eightyc.Other);
  // // console.log(eightyc.Tutionfee);
  // // console.log(eightyc.Ulip);
  save(eightyc: any): Observable<any> {
    alert("Your data saved");
    return this.http.post(SERVER_API_URL + "api/eightycdeducts", eightyc);
  }

  public geteightyc(uid) {
    // console.log("in geteightyc service", id);
    this.ServiceAPIParam = "api/eightycdeducts" + "/" + uid;
    return this.http.get(SERVER_API_URL + this.ServiceAPIParam).map(res => res);
  }
  public PutEightyc(eightyc) {
    console.log("in eightyc id ", this.eightyc.id);
    console.log("inside update eightyc", eightyc);
    //  this.grossurl = this.ServiceAPIParam = 'api/grossdeducts' + gross;
    return this.http.put(SERVER_API_URL + "api/eightycdeducts", eightyc);
    // return this.http.put(this.grossurl, gross);
  }
}
