import { Component, OnInit, Inject } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { AccountService, Principal } from 'app/shared';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { Health } from 'app/pratik/spending/spending.model';
import { HealthService } from 'app/pratik/spending/spending.service';

@Component({
  selector: 'jhi-health',
  templateUrl: './health.component.html',
  styleUrls: ['../spending.component.css']
})

export class HealthComponent implements OnInit {
  uid;
  amount;
  expense;
  resource;
  nameField;
  editField;
  closeResult;
  totalUtility;
  premium_mode;
  loadUtility: boolean;
  dataChanged: boolean;
  changesSaved: boolean;
  isUtilityData: boolean;
  UtilityArray: any = [];
  tempHealthArray: any = [];
  dynamicHealth: any = [];
  health: Health = new Health();
  healthDate = new FormControl(new Date());

  PolicyTypeArray = [
    { name: 'Child Policy' },
    { name: 'Retirement Policy' },
    { name: 'Saving Policy' },
    { name: 'Investment Policy' },
    { name: 'Term Policy' }
  ];
  PremiumTypeArray = [
    { name: 'Single' },
    { name: 'Monthly' },
    { name: 'Quarterly' },
    { name: 'Half Yearly' },
    { name: 'Yearly' }
  ];
  constructor(
    private healthService: HealthService,
    private principal: Principal,
    private modalService: NgbModal,
    private accountService: AccountService) { }

  ngOnInit() {
    console.log('inside health Init()');
    this.getUserid();
  }

  isAuthenticated() {
    return this.principal.isAuthenticated();
  }

  getUserid() {
    return this.accountService.get().toPromise().then(response => {
        const account = response.body;
        if (account) {
          this.uid = account.id;
          console.log('from health userid is : ', this.uid);
            this.onGetHealth();
        } else {
          console.log('cannot get user details check login ');
        }
      })
      .catch(err => {});
  }

  clear() {
    this.resource = '';
    this.amount = '';
    this.expense = '';

    this.health.ins_name = '';
    this.health.issuer = '';
    this.health.policy_name = '';
    this.health.policy_no = '';
    this.health.policy_term = '';
    this.health.premium = '';
    this.health.premium_mode = '';
    this.health.proposer_name = '';
    this.health.start_date = '';
    this.health.sum = '';
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  // health insurance
  openHealth(healthModal) {
    this.modalService
      .open(healthModal, { ariaLabelledBy: 'healthModal' })
      .result.then(
        result => {
          this.closeResult = `Closed with: ${result}`;
          this.AddHealth();
        },
        reason => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }
  AddHealth() {
    this.dynamicHealth.push({
      insureName: this.health.ins_name,
      policyName: this.health.policy_name,
      premium: this.health.premium,
      premiumTerm: this.health.policy_term,
      sum: this.health.sum,
      poNo: this.health.policy_no,
      issuer: this.health.issuer,
      prName: this.health.proposer_name,
      sDate: this.healthDate.value,
      pMode: this.health.premium_mode,
      userid: this.uid
    });
    this.health.healthModelArray.pop();
    this.health.healthModelArray.push({
      iName: this.health.ins_name,
      pName: this.health.policy_name,
      premium: this.health.premium,
      pterm: this.health.policy_term,
      sum: this.health.sum,
      poNo: this.health.policy_no,
      issuer: this.health.issuer,
      prName: this.health.proposer_name,
      sDate: this.healthDate.value,
      pMode: this.health.premium_mode,
      userid: this.uid
    });
    this.onHealthSave();
    this.clear();
  }
  RemoveHealth(index, id) {
    const res = confirm('Are you sure?');
    if (res) {
      this.healthService.DeleteHealth(id).subscribe(responce => {
        // // console.log(responce);
      });
      this.dynamicHealth.splice(index, 1);
    }
  }
  onHealthSave(): void {
    this.health.userid = this.uid;
    console.log(this.health.userid);
    // this.health.healthModelArray = this.dynamicHealth;
    this.healthService.PostHealth(this.health.healthModelArray)
      .subscribe(data => {
        alert('Health Insurance saved');
        this.onGetHealth();
      });
  }
  onGetHealth(): void {
    this.healthService.GetHealth(this.uid).subscribe((response: any[]) => {
      this.dynamicHealth = response;
      console.log(this.dynamicHealth);
    });
    console.log('getHealth() success');
  }

  onEdithealth(id, healthModal) {
    console.log('edit');
    this.fillModal(id);
    console.log('modal', healthModal);
    this.modalService
      .open(healthModal, { ariaLabelledBy: 'healthModal' })
      .result.then(
        result => {
          this.closeResult = `Closed with: ${result}`;
          this.fillhealthArray(id);
        },
        reason => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }
  fillModal(id) {
    console.log('fill');
    this.tempHealthArray = this.dynamicHealth;
    for (let i = 0; i < this.tempHealthArray.length; i++) {
      if (this.tempHealthArray[i].id === id) {
        this.health.ins_name = this.tempHealthArray[i].insuranceName;
        this.health.policy_name = this.tempHealthArray[i].pName;
        this.health.premium = this.tempHealthArray[i].premium;
        this.health.policy_term = this.tempHealthArray[i].pterm;
        this.health.issuer = this.tempHealthArray[i].issuer;
        this.health.start_date = this.tempHealthArray[i].sDate;
        this.health.proposer_name = this.tempHealthArray[i].premiumName;
        this.health.sum = this.tempHealthArray[i].sum;
        this.health.policy_no = this.tempHealthArray[i].term;
        this.health.premium_mode = this.tempHealthArray[i].pMode;
      }
    }
  }
  fillhealthArray(id) {
    for (let i = 0; i < this.dynamicHealth.length; i++) {
      if (this.dynamicHealth[i].id === id) {
        this.dynamicHealth[i].id = this.health.id;
        this.dynamicHealth[i].insuranceName = this.health.ins_name;
        this.dynamicHealth[i].pName = this.health.policy_name;
        this.dynamicHealth[i].premium = this.health.premium;
        this.dynamicHealth[i].pterm = this.health.policy_term;
        this.dynamicHealth[i].issuer = this.health.issuer;
        this.dynamicHealth[i].sDate = this.health.start_date;
        this.dynamicHealth[i].premiumName = this.health.proposer_name;
        this.dynamicHealth[i].sum = this.health.sum;
        this.dynamicHealth[i].term = this.health.policy_no;
        this.dynamicHealth[i].pMode = this.health.premium_mode;
      }
    }
    this.Updatehealth(id);
  }
  Updatehealth(id) {
    this.health.id = id;
    this.health.userid = this.uid;
    this.healthService.PutHealth(this.health , this.uid).subscribe(res => {
      this.clear();
      alert('Your data saved');
    });
  }

}
