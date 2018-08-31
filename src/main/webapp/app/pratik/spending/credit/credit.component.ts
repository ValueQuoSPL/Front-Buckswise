import { Component, OnInit, Inject } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { AccountService, Principal } from 'app/shared';
import { Observable } from 'rxjs';
import { Credit } from 'app/pratik/spending/spending.model';
import { CreditService } from 'app/pratik/spending/spending.service';

@Component({
  selector: 'jhi-credit',
  templateUrl: './credit.component.html',
  styleUrls: ['../spending.component.css']
})
export class CreditComponent implements OnInit {
  uid;
  amount;
  expense;
  resource;
  nameField;
  editField;
  closeResult;
  totalUtility;
  loadUtility: boolean;
  dataChanged: boolean;
  changesSaved: boolean;
  isUtilityData: boolean;
  UtilityArray: any = [];
  tempUtilityArray: any = [];
  dynamicCredit: any = [];
  credit: Credit = new Credit();

  CardTypeArray = [
    { name: 'Gold' },
    { name: 'Platinum' },
    { name: 'Silver' },
    { name: 'Titanium ' }
  ];
  constructor(
    private creditService: CreditService,
    private principal: Principal,
    private modalService: NgbModal,
    private accountService: AccountService) { }

  ngOnInit() {
    console.log('inside credit Init()');
    this.getUserid();
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

    this.credit.balance = '';
    this.credit.balance = '';
    this.credit.issuer = '';
    this.credit.limit = '';
    this.credit.monthly_pay = '';
    this.credit.monthly_usage = '';
    this.credit.roi = '';
    this.credit.type = '';
  }

  isAuthenticated() {
    return this.principal.isAuthenticated();
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
  // credit card
  openCredit(creditModal) {
    this.modalService
      .open(creditModal, { ariaLabelledBy: 'creditModal' })
      .result.then(
        result => {
          this.closeResult = `Closed with: ${result}`;
          this.AddCredit();
        },
        reason => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }
  AddCredit() {
    this.dynamicCredit.push({
      type: this.credit.type,
      bank: this.credit.issuer,
      roi: this.credit.roi,
      balance: this.credit.balance,
      userid: this.uid.id
    });
    this.clear();
  }
  RemoveCredit(index) {
    this.dynamicCredit.splice(index, 1);
  }
  onCreditSave(): void {
    this.credit.userid = this.uid;
    this.credit.creditModelArray = this.dynamicCredit;
    this.creditService
      .PutCredit(this.credit.creditModelArray)
      .subscribe(data => {
        alert('success');
      });
    console.log('in credit save');
  }
  onGetCredit(): void {
    console.log('inside getCredit()');
    this.creditService.GetCredit(this.uid).subscribe((response: any[]) => {
      this.dynamicCredit = response;
      console.log(this.dynamicCredit);
    });
    console.log('getCredit() success');
  }

}
