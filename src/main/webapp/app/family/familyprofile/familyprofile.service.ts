import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { SERVER_API_URL } from "app/app.constants";
import { Myprofile } from "app/family/family.model";
import { FamilyprofileComponent } from "app/family/familyprofile/familyyprofile.component";

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
