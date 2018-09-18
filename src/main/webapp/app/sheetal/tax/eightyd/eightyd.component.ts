import { Component, OnInit } from "@angular/core";
import { Eightyd } from "./eightyd.model";
import { EightydService } from "./eightyd.service";
import { AccountService } from "app/shared";
import {
  NgbModalRef,
  NgbModal,
  ModalDismissReasons
} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "jhi-eightyd",
  templateUrl: "./eightyd.component.html",
  styles: []
})
export class EightydComponent implements OnInit {
  user: any;
  uid: any;
  eightydout: any;
  eightyd: Eightyd = new Eightyd();
  uid1: any;
  valid = true;
  modalRef: NgbModalRef;
  nameField: any;
  editField;
  closeResult: string;
  changesSaved: boolean;
  dataChanged: boolean;
  constructor(
    private modalService: NgbModal,
    private eightydService: EightydService,
    private account: AccountService
  ) {}

  ngOnInit() {
    this.eightyd.medself = 0;
    this.eightyd.medparents = 0;
    this.eightyd.healthcheck = 0;

    this.FetchID();
  }
  onEightydGet(uid) {
    console.log("in main ts", uid);
    this.eightydService.geteightyd(uid).subscribe(res => {
      console.log(res);
      this.eightydout = res;
      console.log("onEightydGet response ", this.eightydout);
    });
  }
  onEightydSave() {
    this.eightydService
      .save(this.eightyd)
      .subscribe(response => console.log(response));
  }
  resetEightyd() {
    this.eightyd.medself = 0;
    this.eightyd.medparents = 0;
    this.eightyd.healthcheck = 0;
  }
  FetchID(): Promise<any> {
    return this.account
      .get()
      .toPromise()
      .then(response => {
        this.user = response.body;
        console.log("user info", this.user);
        this.eightyd.uid = this.user.id;
        console.log("uid is", this.eightyd.uid);
        this.uid = this.eightyd.uid;
        this.onEightydGet(this.uid);
      });
  }
  onEditStaticField(nameField, modal) {
    console.log("inside edit eightyd");
    this.nameField = nameField;
    console.log("inside edit eightyd", nameField);
    if (nameField === "Medical Insurance for Self") {
      this.nameField = "Amount of Medical for self";
      this.editField = this.eightydout.medself;
    } else if (nameField === "Medical Insurance for Parents ") {
      this.nameField = "Amount of Medical for Parents";
      this.editField = this.eightydout.medparents;
    } else if (nameField === "Preventive Health Checkup") {
      this.nameField = "Amount of Preventive health checkup";
      this.editField = this.eightydout.healthcheck;
    }
    this.modalService
      .open(modal, { ariaLabelledBy: "eightydEditContent" })
      .result.then(
        result => {
          this.closeResult = `Closed with: ${result}`;
          this.FillEditEightyd(nameField);
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

  FillEditEightyd(nameField) {
    console.log("inside fill edit eightyd");
    if (nameField === "Medical Insurance for Self") {
      this.eightydout.medself = this.editField;
      this.editField = "";
    } else if (nameField === "Medical Insurance for Parents") {
      this.eightydout.medparents = this.editField;
      this.editField = "";
    } else if (nameField === "Preventive Health Checkup") {
      this.eightydout.healthcheck = this.editField;
      this.editField = "";
    }
  }
}
