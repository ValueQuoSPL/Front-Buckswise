import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { SERVER_API_URL } from "../../../app.constants";
import { Gross } from "./gross.model";
import { Subscription } from "rxjs/Subscription";
import { Component, OnInit } from "@angular/core";

@Injectable()
export class GrossService {
  constructor(private http: HttpClient) {}

  // public ServiceGross(gross) {

  // console.log(gross.Bsalary);
  // console.log(gross.Da);
  // console.log(gross.Hra);
  //  console.log(gross.Conveyance);
  // console.log(gross.Childedu);
  // console.log(gross.Medical);
  // console.log(gross.Lta);
  // console.log(gross.Otherallown);
  // console.log(gross.Bonus);
  // console.log(gross.Rentincome);
  // console.log(gross.Saving);
  // console.log(gross.Bonds);
  // console.log(gross.Convay);
  save(gross: any): Observable<any> {
    return this.http.post(SERVER_API_URL + 'api/grosses', gross);
  }
}
