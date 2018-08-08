import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { SERVER_API_URL } from "../../../app.constants";
import { Home } from "./home.model";
import { Subscription } from "rxjs/Subscription";
import { Component, OnInit } from "@angular/core";

@Injectable()
export class HomeService {
  ServiceAPIParam: string;
  constructor(private http: HttpClient) {}

  // public ServiceHome(home) {

  // console.log(home.Homeloan);
  // console.log(home.Prncpalloan);
  // console.log(home.Rentclm);
  // console.log(home.Remintrst);
  // console.log(home.Rentclmgg);
  save(home: any): Observable<any> {
    return this.http.post(SERVER_API_URL + "api/homedeductions", home);
  }
  public gethome(id) {
    console.log("in other service", id);
    this.ServiceAPIParam = "api/homedeductions" + "/" + id;
    return this.http.get(SERVER_API_URL + this.ServiceAPIParam).map(res => res);
  }
}
