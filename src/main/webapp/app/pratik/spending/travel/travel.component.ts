import { Component, OnInit, Inject } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { AccountService, Principal } from 'app/shared';
import { Observable } from 'rxjs';
import { Travel } from 'app/pratik/spending/spending.model';
import { TravelService } from 'app/pratik/spending/spending.service';

@Component({
  selector: 'jhi-travel',
  templateUrl: './travel.component.html',
  styleUrls: ['../spending.component.css']
})
export class TravelComponent implements OnInit {
  uid;
  amount;
  expense;
  resource;
  nameField;
  editField;
  closeResult;
  totalTravel;
  loadUtility: boolean;
  dataChanged: boolean;
  changesSaved: boolean;
  isUtilityData: boolean;
  TravelArray: any = [];
  tempUtilityArray: any = [];
  dynamicTravel: any = [];
  travel: Travel = new Travel();

  constructor(
    private travelService: TravelService,
    private principal: Principal,
    private modalService: NgbModal,
    private accountService: AccountService) { }

  ngOnInit() {
    console.log('inside travel Init()');
    this.getUserid();
    this.totalTravel = 0;

    // travel
    this.travel.food = 0;
    this.travel.entertainment = 0;
    this.travel.dineout = 0;
    this.travel.vacation = 0;
    this.travel.hobby = 0;

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
  // travel
  openTravel(content) {
    this.modalService
      .open(content, { ariaLabelledBy: 'expense-modal' })
      .result.then(
        result => {
          this.closeResult = `Closed with: ${result}`;
          this.AddTravel();
        },
        reason => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }
  calcTravelTotal() {
    this.totalTravel = 0;
    for (let i = 0; i < this.dynamicTravel.length; i++) {
      const value1 = this.dynamicTravel[i].value;
      // console.log(this.totalUtility);
      this.totalTravel = this.totalTravel + value1;
    }
    console.log(this.totalTravel);
  }
  AddTravel() {
    this.dynamicTravel.push({
      name: this.resource,
      value: this.expense
    });
    this.calcTravelTotal();
    this.clear();
  }
  RemoveTravel(index) {
    this.dynamicTravel.splice(index, 1);
    this.calcTravelTotal();
  }
  SaveTravel(): void {
    this.travel.userid = this.uid;
    this.travel.dynamicTravel = this.dynamicTravel;
    this.travelService.PutTravel(this.travel).subscribe(data => {
      alert('Your travel data saved');
    });
  }
  GetTravel(): void {
    console.log('inside getTravel()');
    this.travelService.GetTravel(this.uid).subscribe((response: any[]) => {
      this.TravelArray = response;
      this.travel.food = this.TravelArray.food;
      this.travel.entertainment = this.TravelArray.entertainment;
      this.travel.dineout = this.TravelArray.dineout;
      this.travel.vacation = this.TravelArray.vacation;
      this.travel.hobby = this.TravelArray.hobby;
      this.dynamicTravel = this.TravelArray.dynamicTravel;
    });
    console.log('getTravel() success');
  }

}
