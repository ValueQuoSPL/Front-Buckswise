import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

@Injectable()
export class ContactService {
  constructor(private http: HttpClient) {}
  // public submitUser(user: any) {
  // console.log(user.name);
  // console.log(user.email);
  // console.log(user.phone);
  // console.log(user.message);
  save(user: any): Observable<any> {
    return this.http.post(SERVER_API_URL + 'api/contactuses', user);
  }
}
