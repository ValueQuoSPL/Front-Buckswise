import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { User } from 'app/shared';
import { Server } from 'http';
import { SERVER_API_URL } from 'app/app.constants';

@Injectable()
export class ContactService {
constructor(private http: HttpClient) { }
  public submitUser(user: any) {
    console.log(user.name);
    console.log(user.email);
    console.log(user.phone);
    console.log(user.message);
  return this.http.post<User[]>(SERVER_API_URL + 'api/', user);

  }

}
