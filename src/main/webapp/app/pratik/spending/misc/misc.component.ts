import { Component, OnInit, Inject } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { AccountService, Principal } from 'app/shared';
import { Observable } from 'rxjs';
import { Misc } from 'app/pratik/spending/spending.model';
import { MiscService } from 'app/pratik/spending/spending.service';

@Component({
  selector: 'jhi-misc',
  templateUrl: './misc.component.html',
  styleUrls: ['../spending.component.css']
})
export class MiscComponent implements OnInit {
  uid;
  amount;
  expense;
  resource;
  nameField;
  editField;
  closeResult;
  totalMisc;
  loadUtility: boolean;
  dataChanged: boolean;
  changesSaved: boolean;
  isUtilityData: boolean;
  MiscArray: any = [];
  dynamicMisc: any = [];
  misc: Misc = new Misc();

  constructor(
    private miscService: MiscService,
    private principal: Principal,
    private modalService: NgbModal,
    private accountService: AccountService) { }

  ngOnInit() {
    console.log('inside misc Init()');
    this.getUserid();
    this.totalMisc = 0;

    // misc
    this.misc.shoes = 0;
    this.misc.pet = 0;
    this.misc.electronics = 0;
    this.misc.furniture = 0;
    this.misc.charity = 0;
    this.misc.gift = 0;
    this.misc.cloth = 0;
  }

  isAuthenticated() {
    return this.principal.isAuthenticated();
  }

  getUserid() {
    return this.accountService.get().toPromise().then(response => {
        const account = response.body;
        if (account) {
          this.uid = account.id;
          console.log('from misc userid is : ', this.uid);
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
    // misc
    openMisc(content) {
      this.modalService
        .open(content, { ariaLabelledBy: 'expense-modal' })
        .result.then(
          result => {
            this.closeResult = `Closed with: ${result}`;
            this.AddMisc();
          },
          reason => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
          }
        );
    }
    calcMiscTotal() {
      this.totalMisc = 0;
      for (let i = 0; i < this.dynamicMisc.length; i++) {
        const value1 = this.dynamicMisc[i].value;
        // console.log(this.totalIncome);
        this.totalMisc = this.totalMisc + value1;
      }
      console.log(this.totalMisc);
    }
    AddMisc() {
      this.dynamicMisc.push({
        name: this.resource,
        value: this.expense
      });
      this.calcMiscTotal();
      this.clear();
    }
    RemoveMisc(index) {
      this.dynamicMisc.splice(index, 1);
      this.calcMiscTotal();
    }
    SaveMisc(): void {
      this.misc.userid = this.uid;
      this.misc.dynamicMisc = this.dynamicMisc;
      this.miscService.PutMisc(this.misc).subscribe(data => {
        alert('Your Misc data saved');
      });
    }
    GetMisc(): void {
      console.log('inside getMisc()');
      this.miscService.GetMisc(this.uid).subscribe((response: any[]) => {
        this.MiscArray = response;
        this.misc.shoes = this.MiscArray.shoes;
        this.misc.pet = this.MiscArray.pet;
        this.misc.electronics = this.MiscArray.electronics;
        this.misc.furniture = this.MiscArray.furniture;
        this.misc.charity = this.MiscArray.charity;
        this.misc.gift = this.MiscArray.gift;
        this.misc.cloth = this.MiscArray.cloth;
        this.dynamicMisc = this.MiscArray.dynamicMisc;
      });
      console.log('getMisc() success');
    }
}
