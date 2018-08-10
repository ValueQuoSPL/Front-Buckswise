import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs/observable";
import { SERVER_API_URL } from "../../app.constants";
import { Myprofile } from "../family.model";

@Injectable()
export class MyprofileService {
  constructor(private http: HttpClient) {}

  save(myProfile: any): Observable<any> {
    return this.http.post(SERVER_API_URL + "api/famillies", myProfile);
  }
  public getMyProfile() {
    return this.http.get(SERVER_API_URL + "api/famillies").map(res => res);
  }
}
