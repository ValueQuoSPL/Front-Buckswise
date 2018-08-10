import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs/observable";
import { SERVER_API_URL } from "../../app.constants";
import { Myprofile } from "../family.model";
import { FamilyprofileComponent } from "./familyyprofile.component";

@Injectable()
export class FamilyprofileService {
  constructor(private http: HttpClient) {}

  save(familyProfile: any): Observable<any> {
    return this.http.post(SERVER_API_URL + "api/familyprofiles", familyProfile);
  }
  public getFamilyProfile() {
    return this.http.get(SERVER_API_URL + "api/familyprofiles").map(res => res);
  }
}