import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { LiabilitiesService } from 'app/my-assets/liabilities/liabilities.service';
import { AccountService, Principal } from 'app/shared';

@Component({
  selector: 'jhi-liabilities',
  templateUrl: './liabilities.component.html',
  styles: []
})
export class LiabilitiesComponent implements OnInit {
  steps = 0;
  closeResult: string;

  uid: any;
  account: Account;
  loan: any = [];

  constructor(
    private modalService: NgbModal,
    private liabilitiesService: LiabilitiesService,
    private accountService: AccountService,
    private principal: Principal
  ) {}

  ngOnInit() {
    this.getUserid();
    this.principal.identity().then(account => {
      this.account = account;
    });
  }
  getUserid() {
    console.log('inside get uid');
    // retrieve the userIdentity data from the server, update the identity object, and then resolve.
    return this.accountService
      .get()
      .toPromise()
      .then(response => {
        const account = response.body;
        if (account) {
          this.uid = account.id;
          console.log('from income userid is : ', this.uid);
          // this.onIncomeGet(this.uid);
          this.getLoanandDebt(this.uid);
        } else {
          console.log('cannot get user details check login ');
        }
      })
      .catch(err => {});
  }
  getLoanandDebt(uid) {
    this.liabilitiesService.getloan(this.uid).subscribe(data => {
      this.loan = data;
      console.log('return from loandebts' + data);
    });
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

  // income
  openShortTerm(incomeContent) {
    console.log('income modal open');

    this.modalService
      .open(incomeContent, { ariaLabelledBy: 'incomeModal' })
      .result.then(
        result => {
          this.closeResult = `Closed with: ${result}`;
          this.saveShortTerm();
          // console.log('add income success');
        },
        reason => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  saveShortTerm() {}
}
