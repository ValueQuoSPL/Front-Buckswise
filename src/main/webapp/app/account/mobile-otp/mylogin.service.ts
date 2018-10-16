import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";

@Injectable()
export class MyloginService {
  constructor(private http: HttpClient) {}

  public submit(param) {
    const template = "Hello%20";
    const key = "243018AQaDBh0K5bc59c71";
    const message = "Your%20Buckswise%20OTP%20is%20:%20";
    const sender = "BKSWSE";

    // tslint:disable-next-line:max-line-length
    const url =
      "http://control.msg91.com/api/sendotp.php?template=" +
      template +
      "&otp_length=6&authkey=" +
      key +
      "&message=" +
      message +
      param.otp +
      "&sender=" +
      sender +
      "&mobile=91" +
      param.mobile +
      "&otp=" +
      param.otp +
      "&otp_expiry=60";

    // console.log('url :', url);
    return this.http.get(url);
  }
}
