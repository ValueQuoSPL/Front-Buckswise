import { Component, OnInit } from "@angular/core";
import { Principal } from "app/shared";
import { Router } from "@angular/router";
import { RiskService } from "app/risk/risk.service";
import { MedicalInsurance } from "app/risk/risk.model";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "jhi-medical-insurance",
  templateUrl: "./medical-insurance.component.html"
})
export class MedicalInsuranceComponent implements OnInit {
  account: Account;
  medicalInsurance: MedicalInsurance = new MedicalInsurance();
  medicalArray = [];
  isSaving: any;
  save: any;
  clear: any;
  resetFieldValue: any;
  deleteFieldValue: any;
  closeResult: string;

  riskmedical;

  constructor(
    private principal: Principal,
    private router: Router,
    private modalService: NgbModal,
    private riskService: RiskService
  ) {}

  ngOnInit() {
    this.principal.identity().then(account => {
      this.account = account;
    });
  }
  openMedical(lifeContent) {
    console.log("income modal open");

    this.modalService
      .open(lifeContent, { ariaLabelledBy: "lifeModal" })
      .result.then(
        result => {
          this.closeResult = `Closed with: ${result}`;
          this.MedicalInsurance();
          // console.log('add income success');
        },
        reason => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }
  opnMedical(id, lifeContent) {
    console.log("income modal open");

    this.modalService
      .open(lifeContent, { ariaLabelledBy: "lifeModal" })
      .result.then(
        result => {
          this.closeResult = `Closed with: ${result}`;
          this.MedicalInsurance();
          // console.log('add income success');
        },
        reason => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
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
  MedicalInsurance() {
    this.medicalArray.push({
      // id: this.id,
      hosp_type: this.medicalInsurance.hosp_type,
      room_type: this.medicalInsurance.room_type,
      family_members: this.medicalInsurance.family_members
    });
    this.riskService
      .SaveMedicalInsurance(this.medicalInsurance)
      .subscribe(data => {
        alert("Added new stocks details");
      });
  }

  deleteField(index, id) {}
}
