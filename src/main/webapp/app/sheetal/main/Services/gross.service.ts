import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from 'app/app.constants';
import { Gross } from 'app/sheetal/main/Services/gross.model';
import { Subscription } from 'rxjs/Subscription';
import { Component, OnInit } from '@angular/core';

@Injectable()
export class GrossService {
  constructor(private http: HttpClient) {}

  save(gross: any): Observable<any> {
    return this.http.post(SERVER_API_URL + 'api/grosses', gross);
  }
}
