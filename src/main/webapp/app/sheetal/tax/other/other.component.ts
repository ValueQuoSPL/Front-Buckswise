import { Component, OnInit } from "@angular/core";
import { Other } from "./other.model";
import { OtherService } from "./other.service";
import { AccountService } from "app/shared";
import {
  NgbModalRef,
  NgbModal,
  ModalDismissReasons
} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "jhi-other",
  templateUrl: "./other.component.html",
  styles: []
})
export class OtherComponent implements OnInit {
  user: any;
  uid: any;
  eightydout: any;
  other: Other = new Other();
  otherout;
  valid = true;
  modalRef: NgbModalRef;
  nameField: any;
  editField;
  closeResult: string;
  changesSaved: boolean;
  dataChanged: boolean;

  constructor(
    private modalService: NgbModal,
    private otherService: OtherService,
    private account: AccountService
  ) {}

  ngOnInit() {
    // for other
    this.other.handicapped = 0;
    this.other.medicaltreat = 0;
    this.other.selfedu = 0;
    this.other.nps = 0;
    this.other.rgess = 0;
    this.other.donation = 0;
    this.FetchID();
  }
  // Other call function
  onOtherSave() {
    this.otherService
      .save(this.other)
      .subscribe(response => console.log(response));
  }
  // Other Reset
  resetOther() {
    this.other.handicapped = 0;
    this.other.medicaltreat = 0;
    this.other.selfedu = 0;
    this.other.nps = 0;
    this.other.rgess = 0;
    this.other.donation = 0;
  }
  onOtherGet(uid) {
    console.log("in main ts", uid);
    this.otherService.getother(uid).subscribe(res => {
      console.log(res);
      this.otherout = res;
      console.log("onOtherGet response ", this.otherout);
    });
  }
  FetchID(): Promise<any> {
    return this.account
      .get()
      .toPromise()
      .then(response => {
        this.user = response.body;
        console.log("user info", this.user);
        this.other.uid = this.user.id;
        console.log("uid is", this.other.uid);
        this.uid = this.other.uid;
        this.onOtherGet(this.uid);
      });
  }
  onEditOtherField(nameField, modal) {
    console.log("inside edit other");
    this.nameField = nameField;
    console.log("inside edit other", nameField);
    if (nameField === "Medical Handicapped") {
      this.nameField = "Amount";
      this.editField = this.otherout.handicapped;
    } else if (nameField === "Medical Treatment") {
      this.nameField = "Amount";
      this.editField = this.otherout.medicaltreat;
    } else if (nameField === "Repayment") {
      this.nameField = "Amount";
      this.editField = this.otherout.selfedu;
    } else if (nameField === "nps") {
      this.nameField = "Amount";
      this.editField = this.otherout.nps;
    } else if (nameField === "rgess") {
      this.nameField = "Amount";
      this.editField = this.otherout.rgess;
    } else if (nameField === "donation") {
      this.nameField = "Amount";
      this.editField = this.otherout.donation;
    }
    this.modalService
      .open(modal, { ariaLabelledBy: "otherEditContent" })
      .result.then(
        result => {
          this.closeResult = `Closed with: ${result}`;
          this.FillEditOther(nameField);
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
  FillEditOther(nameField) {
    console.log("inside fill edit other");
    if (nameField === "Medical Handicapped") {
      this.otherout.handicapped = this.editField;
      this.editField = "";
    } else if (nameField === "Medical Treatment") {
      this.otherout.medicaltreat = this.editField;
      this.editField = "";
    } else if (nameField === "Repayment") {
      this.otherout.selfedu = this.editField;
      this.editField = "";
    } else if (nameField === "nps") {
      this.otherout.nps = this.editField;
      this.editField = "";
    } else if (nameField === "rgess") {
      this.otherout.rgess = this.editField;
      this.editField = "";
    } else if (nameField === "donation") {
      this.otherout.donation = this.editField;
      this.editField = "";
    }
  }
}
