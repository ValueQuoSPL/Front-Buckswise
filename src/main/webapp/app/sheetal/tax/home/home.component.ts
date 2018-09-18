import { Component, OnInit } from "@angular/core";
import { Home } from "./home.model";
import { HomeService } from "./home.service";
import { AccountService } from "app/shared";
import {
  NgbModalRef,
  NgbModal,
  ModalDismissReasons
} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "jhi-home",
  templateUrl: "./home.component.html",
  styles: []
})
export class HomeComponent implements OnInit {
  user: any;
  uid: any;
  eightydout: any;
  home: Home = new Home();
  homeout: any;
  valid = true;
  modalRef: NgbModalRef;
  nameField: any;
  editField;
  closeResult: string;
  changesSaved: boolean;
  dataChanged: boolean;

  constructor(
    private modalService: NgbModal,
    private homeService: HomeService,
    private account: AccountService
  ) {}

  ngOnInit() {
    // for Home
    this.home.homeloan = 0;
    this.home.prncpalloan = 0;
    this.home.rentclm = 0;
    this.home.remintrst = 0;
    this.home.rentclmgg = 0;
    this.FetchID();
  }
  // Home reset
  resetHome() {
    this.home.homeloan = 0;
    this.home.prncpalloan = 0;
    this.home.rentclm = 0;
    this.home.remintrst = 0;
    this.home.rentclmgg = 0;
  }
  onHomeSave() {
    this.homeService
      .save(this.home)
      .subscribe(response => console.log(response));
  }
  onHomeGet(uid) {
    console.log("in main ts", uid);
    this.homeService.gethome(uid).subscribe(res => {
      console.log(res);
      this.homeout = res;
      console.log("home response ", this.homeout);
    });
  }
  FetchID(): Promise<any> {
    return this.account
      .get()
      .toPromise()
      .then(response => {
        this.user = response.body;
        console.log("user info", this.user);
        this.home.uid = this.user.id;
        console.log("uid is", this.home.uid);
        this.uid = this.home.uid;
        this.onHomeGet(this.uid);
      });
  }
  onEditHomeField(nameField, modal) {
    console.log("inside home other");
    this.nameField = nameField;
    console.log("inside edit home", nameField);
    if (nameField === "Housing Loan") {
      this.nameField = "Amount";
      this.editField = this.homeout.homeloan;
    } else if (nameField === "Pricipal Loan") {
      this.nameField = "Amount";
      this.editField = this.homeout.prncpalloan;
    } else if (nameField === "Rent Claimed") {
      this.nameField = "Amount";
      this.editField = this.homeout.rentclm;
    } else if (nameField === "Remaining Interest") {
      this.nameField = "Amount";
      this.editField = this.homeout.remintrst;
    } else if (nameField === "Mentioned the Rent claimed") {
      this.nameField = "Amount";
      this.editField = this.homeout.rentclmgg;
    }
    this.modalService
      .open(modal, { ariaLabelledBy: "homeEditContent" })
      .result.then(
        result => {
          this.closeResult = `Closed with: ${result}`;
          this.FillEditHome(nameField);
        },
        reason => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }
  getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return "by pressing ESC";
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return "by clicking on a backdrop";
    } else {
      return `with: ${reason}`;
    }
  }
  FillEditHome(nameField) {
    console.log("inside fill edit home");
    if (nameField === "Housing Loan") {
      this.homeout.homeloan = this.editField;
      this.editField = "";
    } else if (nameField === "Pricipal Loan") {
      this.homeout.prncpalloan = this.editField;
      this.editField = "";
    } else if (nameField === "Rent Claimed") {
      this.homeout.rentclm = this.editField;
      this.editField = "";
    } else if (nameField === "Remaining Interest") {
      this.homeout.remintrst = this.editField;
      this.editField = "";
    } else if (nameField === "Mentioned the Rent claimed") {
      this.homeout.rentclmgg = this.editField;
      this.editField = "";
    }
  }
}
