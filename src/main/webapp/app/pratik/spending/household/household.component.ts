import { Component, OnInit, Inject, Renderer, ElementRef } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { AccountService, Principal } from 'app/shared';
import { Observable } from 'rxjs';
import { House } from 'app/pratik/spending/spending.model';
import { HouseService } from 'app/pratik/spending/spending.service';

@Component({
  selector: 'jhi-household',
  templateUrl: './household.component.html',
  styleUrls: ['../spending.component.css']
})
export class HouseholdComponent implements OnInit {
  uid;
  amount;
  expense;
  resource;
  nameField;
  editField;
  closeResult;
  totalHousehold;
  loadUtility: boolean;
  dataChanged: boolean;
  changesSaved: boolean;
  isHouseData: boolean;
  HouseholdArray: any = [];
  tempUtilityArray: any = [];
  dynamicHousehold: any = [];

  house: House = new House();

  constructor(
    private renderer: Renderer,
    private elementRef: ElementRef,
    private principal: Principal,
    private houseService: HouseService,
    private modalService: NgbModal,
    private accountService: AccountService) { }

  ngOnInit() {
    console.log('inside income Init()');
    this.getUserid();

    this.totalHousehold = 0;

    // household
    this.house.milk = 0;
    this.house.fruit = 0;
    this.house.rent = 0;
    this.house.fuel = 0;
    this.house.medical = 0;
    this.house.society = 0;
    this.house.auto = 0;
    this.house.edu = 0;
    this.house.grocery = 0;
    this.house.servent = 0;
    this.house.laundry = 0;
    this.house.vcd = 0;
    this.house.selfcare = 0;
    this.house.property = 0;
  }

  isAuthenticated() {
    return this.principal.isAuthenticated();
  }

  getUserid() {
    return this.accountService.get().toPromise().then(response => {
        const account = response.body;
        if (account) {
          this.uid = account.id;
          console.log('from household userid is : ', this.uid);
          this.GetHousehold();
        } else {
          console.log('cannot get user details check login ');
        }
      })
      .catch(err => {});
  }

  GetHousehold(): void {
    console.log('inside getHousehold()');
    this.houseService.GetHouse(this.uid).subscribe((response: any[]) => {
      this.HouseholdArray = response;
      console.log( this.HouseholdArray);
      if (this.HouseholdArray.length === 0) {
        console.log('empty');

        this.isHouseData = false;
      } else {
        this.isHouseData = true;
        console.log('full');

        this.FillHouseholdData();
      }
    });
  }

  FillHouseholdData() {
    console.log('success');
    // this.house.milk = this.HouseholdArray.milk;
      // this.house.fruit = this.HouseholdArray.fruit;
      // this.house.rent = this.HouseholdArray.rent;
      // this.house.fuel = this.HouseholdArray.fuel;
      // this.house.medical = this.HouseholdArray.medical;
      // this.house.society = this.HouseholdArray.society;
      // this.house.auto = this.HouseholdArray.auto;
      // this.house.edu = this.HouseholdArray.edu;
      // this.house.grocery = this.HouseholdArray.grocery;
      // this.house.servent = this.HouseholdArray.servent;
      // this.house.laundry = this.HouseholdArray.laundry;
      // this.house.vcd = this.HouseholdArray.vcd;
      // this.house.selfcare = this.HouseholdArray.selfcare;
      // this.house.property = this.HouseholdArray.property;
      // this.dynamicHousehold = this.HouseholdArray.dynamicHousehold;
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
  // household
  openHousehold(content) {
    this.modalService
      .open(content, { ariaLabelledBy: 'expense-modal' })
      .result.then(
        result => {
          //  this.renderer.invokeElementMethod(this.elementRef.nativeElement.querySelector('#resource'), 'focus', []);

          this.closeResult = `Closed with: ${result}`;
          this.AddHousehold();
        },
        reason => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }
  calcHouseholdTotal() {
    this.totalHousehold = 0;
    for (let i = 0; i < this.dynamicHousehold.length; i++) {
      const value1 = +this.dynamicHousehold[i].value;
      // console.log(this.totalUtility);
      this.totalHousehold = +this.totalHousehold + value1;
    }
    // console.log(this.totalHousehold);
  }
  AddHousehold() {
    this.dynamicHousehold.push({
      name: this.resource,
      value: this.expense
    });
    this.calcHouseholdTotal();
    this.clear();
  }
  RemoveHousehold(index) {
    this.dynamicHousehold.splice(index, 1);
    this.calcHouseholdTotal();
  }
  SaveHousehold(): void {
    this.house.userid = this.uid;
    this.house.dynamicHousehold = this.dynamicHousehold;
    this.houseService.PostHouse(this.house).subscribe(data => {
      alert('Your household data saved');
      this.isHouseData = true;
      this.changesSaved = true;
    });
  }

}
