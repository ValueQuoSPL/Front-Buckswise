import { Component, OnInit, Inject } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { AccountService, Principal } from 'app/shared';
import { Observable } from 'rxjs';
import { GeneralService } from 'app/pratik/spending/spending.service';
import { General } from 'app/pratik/spending/spending.model';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'jhi-general',
  templateUrl: './general.component.html',
  styleUrls: ['../spending.component.css']
})
export class GeneralComponent implements OnInit {
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
  dynamicGeneral: any = [];
  general: General = new General();
  generalDate = new FormControl(new Date());

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
    private generalService: GeneralService,
    private principal: Principal,
    private modalService: NgbModal,
    private accountService: AccountService) { }

  ngOnInit() {
    console.log('inside general Init()');
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
          console.log('from utility userid is : ', this.uid);
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

    this.general.generalModelArray = '';
    this.general.ins_obj = '';
    this.general.issuer = '';
    this.general.policy_name = '';
    this.general.policy_no = '';
    this.general.policy_term = '';
    this.general.premium = '';
    this.general.proposer_name = '';
    this.general.start_date = '';
    this.general.sum = '';
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
  // general insurance
  openGeneral(generalModal) {
    this.modalService
      .open(generalModal, { ariaLabelledBy: 'generalModal' })
      .result.then(
        result => {
          this.closeResult = `Closed with: ${result}`;
          this.AddGeneral();
        },
        reason => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }
  AddGeneral() {
    this.dynamicGeneral.push({
      iName: this.general.ins_obj,
      pName: this.general.policy_name,
      premium: this.general.premium,
      issuer: this.general.issuer,
      pterm: this.general.policy_term,
      pdate: this.generalDate.value,
      sum: this.general.sum,
      poNo: this.general.policy_no,
      prName: this.general.proposer_name,
      userid: this.uid.id
    });
    this.clear();
  }
  RemoveGeneral(index) {
    this.dynamicGeneral.splice(index, 1);
  }
  onGeneralSave(): void {
    this.general.userid = this.uid;
    this.general.generalModelArray = this.dynamicGeneral;
    this.generalService
      .PutGeneral(this.general.generalModelArray)
      .subscribe(data => {
        alert('General Insurance saved');
      });
    console.log('in general save');
  }
  onGetGeneral(): void {
    this.generalService.GetGeneral(this.uid).subscribe((response: any[]) => {
      this.dynamicGeneral = response;
      console.log(this.dynamicGeneral);
    });
    console.log('getGeneral() success');
  }
}
