import { Component, OnInit } from "@angular/core";
import { Gross } from "./gross.model";
import { GrossService } from "./gross.service";
import { AccountService } from "app/shared";
import {
  NgbModalRef,
  NgbModal,
  ModalDismissReasons
} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "jhi-gross",
  templateUrl: "./gross.component.html",
  styles: []
})
export class GrossComponent implements OnInit {
  user: any;
  uid: any;
  output: any;
  gross: Gross = new Gross();
  constructor(
    private modalService: NgbModal,
    private grossService: GrossService,
    private account: AccountService
  ) {}

  ngOnInit() {
    this.gross.bsalary = 0;
    this.gross.da = 0;
    this.gross.hra = 0;
    this.gross.conveyance = 0;
    this.gross.childedu = 0;
    this.gross.medical = 0;
    this.gross.lta = 0;
    this.gross.otherallown = 0;
    this.gross.bonus = 0;
    this.gross.rentincome = 0;
    this.gross.saving = 0;
    this.gross.bonds = 0;
    this.gross.conveyanceother = 0;
  }
  FetchID(): Promise<any> {
    return this.account
      .get()
      .toPromise()
      .then(response => {
        this.user = response.body;
        console.log("user info", this.user);
        this.gross.uid = this.user.id;
        this.uid = this.gross.uid;
        this.onGrossGet(this.uid);
      });
  }
  onGrossGet(uid) {
    this.grossService.getgross(this.uid).subscribe(res => {
      console.log(res);
      this.output = res;
      console.log(this.output);
    });
  }
  onGrossSave() {
    this.grossService
      .save(this.gross)
      .subscribe(response => console.log(response));
  }
}
