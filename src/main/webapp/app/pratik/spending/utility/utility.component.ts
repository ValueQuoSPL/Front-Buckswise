import { Component, OnInit, Inject } from "@angular/core";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators
} from "@angular/forms";
import { Utility } from "../spending.model";
import { UtilityService } from "../spending.service";
import { AccountService } from "app/shared";
import { Observable } from "rxjs";

@Component({
  selector: "jhi-utility",
  templateUrl: "./utility.component.html",
  styleUrls: ["./utility.component.css"]
})
export class UtilityComponent implements OnInit {
  uid;
  amount;
  expense;
  resource;
  closeResult;
  totalUtility;
  dataChanged: boolean;
  changesSaved: boolean;
  isUtilityData: boolean;
  UtilityArray: any = [];
  dynamicUtilityArray: any = [];

  utility: Utility = new Utility();

  constructor(
    private utilityService: UtilityService,
    private modalService: NgbModal,
    private accountService: AccountService
  ) {}

  ngOnInit() {
    console.log("inside utility Init()");
    this.getUserid();

    this.totalUtility = 0;
    this.utility.electricity = 0;
    this.utility.gas = 0;
    this.utility.internet = 0;
    this.utility.mobile = 0;
    this.utility.news = 0;
    this.utility.telephone = 0;
    this.utility.tv = 0;
    this.utility.vcd = 0;
    this.utility.water = 0;
  }

  getUserid() {
    return this.accountService
      .get()
      .toPromise()
      .then(response => {
        const account = response.body;
        if (account) {
          this.uid = account.id;
          console.log("from utility userid is : ", this.uid);
        } else {
          console.log("cannot get user details check login ");
        }
      })
      .catch(err => {});
  }

  clear() {
    this.resource = "";
    this.amount = "";
    this.expense = "";
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return "by pressing ESC";
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return "by clicking on a backdrop";
    } else {
      return `with: ${reason}`;
    }
  }

  openUtility(content) {
    this.modalService
      .open(content, { ariaLabelledBy: "expense-modal" })
      .result.then(
        result => {
          this.closeResult = `Closed with: ${result}`;
          this.AddUtility();
        },
        reason => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  calcUtilityTotal() {
    this.totalUtility = 0;
    for (let i = 0; i < this.dynamicUtilityArray.length; i++) {
      const value1 = this.dynamicUtilityArray[i].value;
      // console.log(this.totalUtility);
      this.totalUtility = this.totalUtility + value1;
    }
    console.log(this.totalUtility);
  }

  AddUtility() {
    this.dynamicUtilityArray.push({
      name: this.resource,
      value: this.expense
    });
    this.calcUtilityTotal();
    this.clear();
  }

  RemoveUtility(index) {
    this.dynamicUtilityArray.splice(index, 1);
    this.calcUtilityTotal();
  }

  SaveUtility(): void {
    this.utility.userid = this.uid;
    this.utility.dynamicUtility = this.dynamicUtilityArray;
    this.utilityService.PostUtility(this.utility).subscribe(data => {
      alert("Your utility data saved");
    });
  }

  GetUtility(): void {
    console.log("inside GetUtility()");
    this.utilityService.GetUtility(this.uid).subscribe((response: any[]) => {
      this.UtilityArray = response;
      console.log(this.UtilityArray);
      // this.utility.electricity = this.UtilityArray.electricity;
      // this.utility.gas = this.UtilityArray.gas;
      // this.utility.water = this.UtilityArray.water;
      // this.utility.telephone = this.UtilityArray.telephone;
      // this.utility.mobile = this.UtilityArray.mobile;
      // this.utility.internet = this.UtilityArray.internet;
      // this.utility.tv = this.UtilityArray.tv;
      // this.utility.vcd = this.UtilityArray.vcd;
      // this.utility.news = this.UtilityArray.news;
      // this.dynamicUtilityArray = this.UtilityArray.dynamicUtility;
    });
  }

  isFieldChanged() {
    return true;
  }
  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    console.log("inside can deactivate");
    this.dataChanged = this.isFieldChanged();
    if (!this.dataChanged && !this.changesSaved) {
      console.log(this.dataChanged, "dataChanged");
      console.log(this.changesSaved, "changesSaved");
      return confirm("Do you want to leave this page Before changes saved ?");
    } else {
      return true;
    }
  }
}
