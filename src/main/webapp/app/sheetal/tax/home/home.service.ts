import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { SERVER_API_URL } from "app/app.constants";
import { Home } from "app/sheetal/main/Services/home.model";
import { Subscription } from "rxjs/Subscription";
import { Component, OnInit } from "@angular/core";
import { AccountService } from "app/shared";

@Injectable()
export class HomeService {
  ServiceAPIParam: string;
  user;
  userID;
  id;
  home: Home = new Home();
  constructor(private http: HttpClient, private account: AccountService) {}

  // public ServiceHome(home) {

  // // console.log(home.Homeloan);
  // // console.log(home.Prncpalloan);
  // // console.log(home.Rentclm);
  // // console.log(home.Remintrst);
  // // console.log(home.Rentclmgg);
  save(home: any): Observable<any> {
    return this.http.post(SERVER_API_URL + "api/homes", home);
  }
  public gethome(uid) {
    // console.log("in home service", uid);
    this.ServiceAPIParam = "api/homes" + "/" + uid;
    return this.http.get(SERVER_API_URL + this.ServiceAPIParam).map(res => res);
  }
  public PutHome(home) {
    //   console.log('in gross id ', this.other.id);
    console.log("inside update home", home);
    //  this.grossurl = this.ServiceAPIParam = 'api/grossdeducts' + gross;
    return this.http.put(SERVER_API_URL + "api/homes", home);
    // return this.http.put(this.grossurl, gross);
  }
}
