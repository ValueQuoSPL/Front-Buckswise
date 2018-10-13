import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { SERVER_API_URL } from "app/app.constants";

@Injectable({
  providedIn: "root"
})
export class SuccessService {
  constructor(private _http: HttpClient) {}

  getTransactionData() {
    return this._http.get(SERVER_API_URL + "api/getsuccess");
  }
}
