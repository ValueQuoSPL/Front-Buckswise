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
  constructor(private http: HttpClient, private account: AccountService) {}

  // public ServiceOther(other) {
  //  console.log(other.Handicapped);
  //  console.log(other.Medicaltreat);
  //  console.log(other.Selfedu);
  //  console.log(other.Nps);
  //  console.log(other.Rgess);
  //  console.log(other.Donation);
  save(other: any): Observable<any> {
    return this.http.post(SERVER_API_URL + "api/others", other);
  }
  public getother(id) {
    console.log("in other service", id);
    this.ServiceAPIParam = "api/others" + "/" + id;
    return this.http.get(SERVER_API_URL + this.ServiceAPIParam).map(res => res);
  }
}
