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
  grossout: any;
  valid = true;
  modalRef: NgbModalRef;
  nameField: any;
  editField;
  closeResult: string;
  changesSaved: boolean;
  dataChanged: boolean;

  constructor(
    private modalService: NgbModal,
    private grossService: GrossService,
    private account: AccountService
  ) {}

  ngOnInit() {
    this.FetchID();
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
  // Gross Reset
  resetGross() {
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
  onGrossGet() {
    console.log("in main ts");
    this.grossService.getgross(this.uid).subscribe(res => {
      console.log(res);
      this.output = res;
      console.log("onEightydGet response ", this.output);
    });
  }
  onGrossSave() {
    this.grossService
      .save(this.gross)
      .subscribe(response => console.log(response));
  }
  FetchID(): Promise<any> {
    return this.account
      .get()
      .toPromise()
      .then(response => {
        this.user = response.body;
        console.log("user info", this.user);
        this.gross.uid = this.user.id;
        console.log("uid is", this.gross.uid);
        this.uid = this.gross.uid;
        this.onGrossGet();
      });
  }
  onEditGrossField(nameField, modal) {
    console.log("inside gross");
    this.nameField = nameField;
    console.log("inside edit gross", nameField);
    if (nameField === "bs") {
      this.nameField = "Amount";
      this.editField = this.output.bsalary;
    } else if (nameField === "da") {
      this.nameField = "Amount";
      this.editField = this.output.da;
    } else if (nameField === "hra") {
      this.nameField = "Amount";
      this.editField = this.output.hra;
    } else if (nameField === "convey") {
      this.nameField = "Amount";
      this.editField = this.output.conveyance;
    } else if (nameField === "ce") {
      this.nameField = "Amount";
      this.editField = this.output.childedu;
    } else if (nameField === "med") {
      this.nameField = "Amount";
      this.editField = this.output.medical;
    } else if (nameField === "lta") {
      this.nameField = "Amount";
      this.editField = this.output.lta;
    } else if (nameField === "oa") {
      this.nameField = "Amount";
      this.editField = this.output.otherallown;
    } else if (nameField === "bonus") {
      this.nameField = "Amount";
      this.editField = this.output.bonus;
    }
    this.modalService
      .open(modal, { ariaLabelledBy: "grossEditContent" })
      .result.then(
        result => {
          this.closeResult = `Closed with: ${result}`;
          this.FillEditGross(nameField);
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
  FillEditGross(nameField) {
    console.log("inside fill edit home");
    if (nameField === "bs") {
      this.output.bsalary = this.editField;
      this.editField = "";
    } else if (nameField === "da") {
      this.output.da = this.editField;
      this.editField = "";
    } else if (nameField === "hra") {
      this.output.hra = this.editField;
      this.editField = "";
    } else if (nameField === "convey") {
      this.output.conveyance = this.editField;
      this.editField = "";
    } else if (nameField === "ce") {
      this.output.childedu = this.editField;
      this.editField = "";
    } else if (nameField === "med") {
      this.output.medical = this.editField;
      this.editField = "";
    } else if (nameField === "lta") {
      this.output.lta = this.editField;
      this.editField = "";
    } else if (nameField === "oa") {
      this.output.otherallown = this.editField;
      this.editField = "";
    } else if (nameField === "bonus") {
      this.output.bonus = this.editField;
      this.editField = "";
    }
  }
}
