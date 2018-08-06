import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from 'app/app.constants';
import { Eightyc } from 'app/sheetal/main/Services/eightyc.model';
import { Subscription } from 'rxjs/Subscription';
import { Component, OnInit } from '@angular/core';

@Injectable()
export class EightycService {

  constructor(private http: HttpClient) { }

  public ServiceEightyc(eightyc) {
    console.log(eightyc.Fixed);
    console.log(eightyc.Tution);
    console.log(eightyc.Nsc);
    console.log(eightyc.Nss);
    console.log(eightyc.Post);
    console.log(eightyc.Reinvest);
    console.log(eightyc.Licpremium);
    console.log(eightyc.Equity);
    console.log(eightyc.Pf);
    console.log(eightyc.Ppf);
    console.log(eightyc.Other);
    console.log(eightyc.Tutionfee);
    console.log(eightyc.Ulip);

    return this.http.post<Eightyc[]>(SERVER_API_URL + 'api/', eightyc);
  }
}
