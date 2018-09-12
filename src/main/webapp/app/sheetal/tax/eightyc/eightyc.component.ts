import { Component, OnInit } from "@angular/core";
import { Eightyc } from "./eightyc.model";
import { EightycService } from "./eightyc.service";
import { AccountService } from "app/shared";
import {
  NgbModalRef,
  NgbModal,
  ModalDismissReasons
} from "@ng-bootstrap/ng-bootstrap";
@Component({
  selector: "jhi-eightyc",
  templateUrl: "./eightyc.component.html",
  styles: []
})
export class EightycComponent implements OnInit {
  user: any;
  userID: any;
  account: any;
  out: any;
  eightyc: Eightyc = new Eightyc();
  uid: any;

  constructor(
    private eightycService: EightycService,
    private accountService: AccountService
  ) {}
  // // for eightyc

  ngOnInit() {
    this.FetchID();
  }
  FetchID(): Promise<any> {
    return this.account
      .get()
      .toPromise()
      .then(response => {
        this.user = response.body;
        console.log("user info", this.user);
        this.eightyc.userID = this.user.id;
        this.uid = this.eightyc.userID;
        console.log("in service", this.uid);
      });
  }
  // // eightyc call function
  // onEightycSave() {
  //   this.eightycService
  //     .save(this.eightyc)
  //     .subscribe(response => console.log(response));
  // }
  // // EightyC Reset
  // resetEightyc() {
  //   this.eightyc.fixed = 0;
  //   this.eightyc.tution = 0;
  //   this.eightyc.nsc = 0;
  //   this.eightyc.nss = 0;
  //   this.eightyc.post = 0;
  //   this.eightyc.reinvest = 0;
  //   this.eightyc.licpremium = 0;
  //   this.eightyc.equity = 0;
  //   this.eightyc.pf = 0;
  //   this.eightyc.ppf = 0;
  //   this.eightyc.other = 0;
  //   this.eightyc.tutionfee = 0;
  //   this.eightyc.ulip = 0;
  // }
  onEightycGet(uid) {
    //  console.log('in main ts', id);
    this.eightycService.geteightyc(uid).subscribe(res => {
      console.log(res);
      this.out = res;
      console.log(this.out);
    });
  }
}
