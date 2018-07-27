import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from 'app/app.constants';
import { Other } from 'app/sheetal/main/Services/other.model';
import { Subscription } from 'rxjs/Subscription';
import { Component, OnInit } from '@angular/core';

@Injectable()
export class OtherService {

  constructor(private http: HttpClient) { }

  public ServiceOther(other) {
    console.log(other.Handicapped);
    console.log(other.Medicaltreat);
    console.log(other.Selfedu);
    console.log(other.Nps);
    console.log(other.Rgess);
    console.log(other.Donation);

    return this.http.post<Other[]>(SERVER_API_URL + 'api/', other);

  }
}
