import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { SERVER_API_URL } from "../../../app.constants";
import { Gross } from "./gross.model";
import { AccountService } from "../../../shared";

@Injectable()
export class GrossService {
  ID;
  userID;
  user;
  uid;
  gross: Gross = new Gross();
  ServiceAPIParam: string;
  grossurl: string;
  constructor(private http: HttpClient, private account: AccountService) {}

  save(gross: any): Observable<any> {
    console.log("gross");
    return this.http.post(SERVER_API_URL + "api/grossdeducts", gross);
  }

  FetchID(): Promise<any> {
    return this.account
      .get()
      .toPromise()
      .then(response => {
        this.user = response.body;
        console.log("user info", this.user);
        this.userID = this.user.id;
        console.log("in service", this.userID);
      });
  }
  public getgross(uid) {
    console.log("in getgross service", uid);
    this.ServiceAPIParam = "api/getgrossdeducts" + "/" + uid;
    return this.http.get(SERVER_API_URL + this.ServiceAPIParam).map(res => res);
  }
  public getgrossbyId(id) {
    console.log("in getgross service", id);
    this.ServiceAPIParam = "api/getgrossdeducts" + "/" + id;
    return this.http.get(SERVER_API_URL + this.ServiceAPIParam).map(res => res);
  }
  public PutGross(gross) {
    console.log("in gross id ", this.gross.id);
    console.log("inside update gross", gross);
    return this.http.put(SERVER_API_URL + "api/grossdeducts", gross);
  }
}
