import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from 'app/app.constants';
import { Eightyd } from 'app/sheetal/main/Services/eightyd.model';
import { Subscription } from 'rxjs/Subscription';
import { Component, OnInit } from '@angular/core';

@Injectable()
export class EightydService {

  constructor(private http: HttpClient) { }

  public ServiceEightyd(eightyd) {

    console.log(eightyd.Insureself);
    console.log(eightyd.Insureparents);
    console.log(eightyd.Health);

    return this.http.post<Eightyd[]>(SERVER_API_URL + 'api/', eightyd);

  }

}
