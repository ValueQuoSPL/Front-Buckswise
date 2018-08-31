import { AccountService, LoginModalService, Principal } from 'app/shared';
import { Component, OnInit, Inject } from '@angular/core';
import { NAMED_ENTITIES } from '@angular/compiler';
import { checkAndUpdateBinding } from '@angular/core/src/view/util';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, FormBuilder, Validators} from '@angular/forms';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'jhi-spending',
  templateUrl: './spending.component.html',
  styleUrls: ['./spending.component.css']
})
export class SpendingComponent implements OnInit {

  resource: any;
  amount: any;
  expense;
  demoarr;
  i;
  closeResult: string;
  step = 0;
  uid;
  resource_react = new FormControl('');
  amount_react = new FormControl('');

  modalRef: NgbModalRef;

  // for material dialog
  panelOpenState = false;
  animal: string;
  name: string;

  account: Account;

  constructor(
    private principal: Principal,
    private accountService: AccountService,
    public incomeDialog: MatDialog,
    private loginModalService: LoginModalService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    console.log('inside spending Init()');
    this.principal.identity().then(account => {
      this.account = account;
    });

  }

  isAuthenticated() {
    return this.principal.isAuthenticated();
  }

  clear() {
    this.resource = '';
    this.amount = '';
    this.expense = '';
  }

  login() {
    this.modalRef = this.loginModalService.open();
  }

}
