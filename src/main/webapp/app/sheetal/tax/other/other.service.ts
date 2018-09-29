import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { SERVER_API_URL } from "app/app.constants";
import { Other } from "app/sheetal/main/Services/other.model";
import { Subscription } from "rxjs/Subscription";
import { Component, OnInit } from "@angular/core";
import { AccountService } from "app/shared";
@Injectable()
export class OtherService {
  ServiceAPIParam: string;
  user;
  userID;
  id;
  other: Other = new Other();

  constructor(private http: HttpClient, private account: AccountService) {}

  // public ServiceOther(other) {
  //  // console.log(other.Handicapped);
  //  // console.log(other.Medicaltreat);
  //  // console.log(other.Selfedu);
  //  // console.log(other.Nps);
  //  // console.log(other.Rgess);
  //  // console.log(other.Donation);
  save(other: any): Observable<any> {
    return this.http.post(SERVER_API_URL + "api/otherdeductions", other);
  }
  // FetchID(): Promise<any> {
  //   return this.account
  //     .get()
  //     .toPromise()
  //     .then(response => {
  //       this.user = response.body;
  //       // console.log('user info', this.user);
  //       this.userID = this.user.id;
  //       // console.log('in service', this.userID);
  //     });
  // }
  public getother(uid) {
    // console.log('in other service', uid);
    this.ServiceAPIParam = "api/otherdeductions" + "/" + uid;
    return this.http.get(SERVER_API_URL + this.ServiceAPIParam).map(res => res);
  }
  public PutOther(other) {
    //   console.log('in gross id ', this.other.id);
    console.log("inside update gross", other);
    //  this.grossurl = this.ServiceAPIParam = 'api/grossdeducts' + gross;
    return this.http.put(SERVER_API_URL + "api/otherdeductions", other);
    // return this.http.put(this.grossurl, gross);
  }
}
