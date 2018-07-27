import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from 'app/app.constants';
import { Home } from 'app/sheetal/main/Services/home.model';
import { Subscription } from 'rxjs/Subscription';
import { Component, OnInit } from '@angular/core';

@Injectable()
export class HomeService {

  constructor(private http: HttpClient) { }

  public ServiceHome(home) {

    console.log(home.Homeloan);
    console.log(home.Prncpalloan);
    console.log(home.Rentclm);
    console.log(home.Remintrst);
    console.log(home.Rentclmgg);

    return this.http.post<Home[]>(SERVER_API_URL + 'api/', home);

}
}
