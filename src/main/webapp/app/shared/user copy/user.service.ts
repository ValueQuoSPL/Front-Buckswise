import { Injectable } from "@angular/core";
import { HttpClient, HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs/Observable";

import { SERVER_API_URL } from "app/app.constants";
import { User } from "app/shared/user/user.model";
import { createRequestOption } from "app/shared/model/request-util";

@Injectable()
export class UserService {
  private resourceUrl = SERVER_API_URL + "api/users";

  constructor(private http: HttpClient) {}

  create(user: User): Observable<HttpResponse<User>> {
    return this.http.post<User>(this.resourceUrl, user, {
      observe: "response"
    });
  }

  update(user: User): Observable<HttpResponse<User>> {
    return this.http.put<User>(this.resourceUrl, user, { observe: "response" });
  }
  query(req?: any): Observable<HttpResponse<User[]>> {
    const options = createRequestOption(req);
    return this.http.get<User[]>(this.resourceUrl, {
      params: options,
      observe: "response"
    });
  }

  find(login: string): Observable<HttpResponse<User>> {
    return this.http.get<User>(`${this.resourceUrl}/${login}`, {
      observe: "response"
    });
  }

  delete(login: string): Observable<HttpResponse<any>> {
    return this.http.delete(`${this.resourceUrl}/${login}`, {
      observe: "response"
    });
  }

  authorities(): Observable<string[]> {
    return this.http.get<string[]>(SERVER_API_URL + "api/users/authorities");
  }
}
