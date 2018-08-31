import { Component, OnInit, Inject } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { AccountService, Principal } from 'app/shared';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { Life } from 'app/pratik/spending/spending.model';
import { LifeService } from 'app/pratik/spending/spending.service';

@Component({
  selector: 'jhi-life',
  templateUrl: './life.component.html',
  styleUrls: ['../spending.component.css']
})
export class LifeComponent implements OnInit {
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
  tempUtilityArray: any = [];
  dynamicLifeArray: any = [];
  life: Life = new Life();

  lifeDate = new FormControl(new Date());

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
    private lifeService: LifeService,
    private principal: Principal,
    private modalService: NgbModal,
    private accountService: AccountService) { }

  ngOnInit() {
    console.log('inside life Init()');
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
          console.log('from life userid is : ', this.uid);
          // this.GetUtility();
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

    this.life.ins_name = '';
    this.life.issuer = '';
    this.life.policy_name = '';
    this.life.policy_term = '';
    this.life.premium = '';
    this.life.premium_mode = '';
    this.life.premium_term = '';
    this.life.proposer_name = '';
    this.life.start_date = '';
    this.life.sum = '';
    this.life.type = '';
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
  // life insurance
  openLife(lifeModal) {
    this.modalService
      .open(lifeModal, { ariaLabelledBy: 'lifeModal' })
      .result.then(
        result => {
          this.closeResult = `Closed with: ${result}`;
          console.log(this.life.type);
          this.AddLifeInsurance();
        },
        reason => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }
  AddLifeInsurance() {
    this.dynamicLifeArray.push({
      iName: this.life.type,
      issuer: this.life.issuer,
      ins_name: this.life.ins_name,
      prName: this.life.proposer_name,
      sDate: this.lifeDate.value,
      pterm: this.life.policy_term,
      pMode: this.life.premium_mode,
      pName: this.life.policy_name,
      sum: this.life.sum,
      premium: this.life.premium,
      term: this.life.premium_term,
      userid: this.uid.id
    });
    this.clear();
  }
  RemoveLifeInsurance(index) {
    this.dynamicLifeArray.splice(index, 1);
  }
  onLifeSave(): void {
    this.life.userid = this.uid;
    this.life.lifeModelArray = this.dynamicLifeArray;
    this.lifeService.PutLife(this.life.lifeModelArray).subscribe(data => {
      alert('success');
    });
    console.log('in life save');
  }
  onGetLife(): void {
    this.lifeService.GetLife(this.uid).subscribe((response: any[]) => {
      this.dynamicLifeArray = response;
      console.log(this.dynamicLifeArray);
    });
    console.log('getLife() success');
  }

}
