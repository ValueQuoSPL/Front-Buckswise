import { Component, OnInit, Inject, Renderer, ElementRef } from "@angular/core";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { AccountService, Principal } from "app/shared";
import { Observable } from "rxjs";
import { House } from "app/pratik/spending/spending.model";
import { HouseService } from "app/pratik/spending/spending.service";

class NewHousehold {
  dynamicHousehold: any = [];
  userid;
}

@Component({
  selector: "jhi-household",
  templateUrl: "./household.component.html",
  styleUrls: ["../spending.component.css"]
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
  loadhouse: boolean;
  dataChanged: boolean;
  changesSaved: boolean;
  isHouseData: boolean;
  HouseholdArray: any = [];
  tempHouseholdArray: any = [];
  dynamicHousehold: any = [];
  house: House = new House();
  newHouse: NewHousehold = new NewHousehold();

  constructor(
    private renderer: Renderer,
    private elementRef: ElementRef,
    private principal: Principal,
    private houseService: HouseService,
    private modalService: NgbModal,
    private accountService: AccountService
  ) {}

  ngOnInit() {
    // console.log('inside income Init()');
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
    return this.accountService
      .get()
      .toPromise()
      .then(response => {
        const account = response.body;
        if (account) {
          this.uid = account.id;
          // // console.log('from household userid is : ', this.uid);
          this.GetHousehold();
        } else {
          // console.log('cannot get user details check login ');
        }
      })
      .catch(err => {});
  }

  GetHousehold(): void {
    // console.log('inside getHousehold()');
    this.houseService.GetHouse(this.uid).subscribe((response: any[]) => {
      this.HouseholdArray = response;
      // // console.log(this.HouseholdArray);
      if (this.HouseholdArray.length === 0) {
        // console.log('empty');

        this.isHouseData = false;
      } else {
        this.isHouseData = true;
        // console.log('full');

        this.FillHouseholdData();
      }
    });
  }

  FillHouseholdData() {
    for (let i = 0; i < this.HouseholdArray.length; i++) {
      if (this.HouseholdArray[i].name === "milk") {
        this.house.milk = +this.HouseholdArray[i].amount;
      } else if (this.HouseholdArray[i].name === "fruit") {
        this.house.fruit = +this.HouseholdArray[i].amount;
      } else if (this.HouseholdArray[i].name === "rent") {
        this.house.rent = +this.HouseholdArray[i].amount;
      } else if (this.HouseholdArray[i].name === "fuel") {
        this.house.fuel = +this.HouseholdArray[i].amount;
      } else if (this.HouseholdArray[i].name === "medical") {
        this.house.medical = +this.HouseholdArray[i].amount;
      } else if (this.HouseholdArray[i].name === "society") {
        this.house.society = +this.HouseholdArray[i].amount;
      } else if (this.HouseholdArray[i].name === "auto") {
        this.house.auto = +this.HouseholdArray[i].amount;
      } else if (this.HouseholdArray[i].name === "edu") {
        this.house.vcd = +this.HouseholdArray[i].amount;
      } else if (this.HouseholdArray[i].name === "grocery") {
        this.house.grocery = +this.HouseholdArray[i].amount;
      } else if (this.HouseholdArray[i].name === "servent") {
        this.house.servent = +this.HouseholdArray[i].amount;
      } else if (this.HouseholdArray[i].name === "laundry") {
        this.house.laundry = +this.HouseholdArray[i].amount;
      } else if (this.HouseholdArray[i].name === "vcd") {
        this.house.vcd = +this.HouseholdArray[i].amount;
      } else if (this.HouseholdArray[i].name === "selfcare") {
        this.house.selfcare = +this.HouseholdArray[i].amount;
      } else if (this.HouseholdArray[i].name === "property") {
        this.house.property = +this.HouseholdArray[i].amount;
      } else if (this.HouseholdArray[i].name !== "userid") {
        this.dynamicHousehold.push({
          id: this.HouseholdArray[i].id,
          name: this.HouseholdArray[i].name,
          value: this.HouseholdArray[i].amount
        });
      }
    }
    this.loadhouse = true;
    // // console.log(this.HouseholdArray);
    this.calcHouseholdTotal();
  }

  clear() {
    this.resource = "";
    this.amount = "";
    this.expense = "";
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

  openHousehold(content) {
    this.modalService
      .open(content, { ariaLabelledBy: "expense-modal" })
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
      // // console.log(this.totalhouse);
      this.totalHousehold = +this.totalHousehold + value1;
    }
    // // console.log(this.totalHousehold);
  }

  AddHousehold() {
    this.dynamicHousehold.push({
      name: this.resource,
      value: this.expense
    });
    this.calcHouseholdTotal();
    this.newHouse.dynamicHousehold.pop();
    this.newHouse.dynamicHousehold.push({
      name: this.resource,
      value: this.expense
    });
    // console.log(this.uid);
    this.newHouse.userid = this.uid;

    this.houseService.PostHouse(this.newHouse).subscribe();
    this.clear();
  }

  RemoveHousehold(index, id) {
    this.houseService.DeleteHouse(id).subscribe(responce => {
      // // console.log(responce);
    });
    this.dynamicHousehold.splice(index, 1);
    this.calcHouseholdTotal();
  }

  SaveHousehold(): void {
    this.house.userid = this.uid;
    // this.house.dynamicHousehold = this.dynamicHousehold;
    this.houseService.PostHouse(this.house).subscribe(data => {
      alert("Your household data saved");
      this.isHouseData = true;
      this.changesSaved = true;
    });
  }

  UpdateHousehold() {
    // console.log('inside update income');
    this.house.userid = this.uid;
    this.house.dynamicHousehold = this.dynamicHousehold;
    this.houseService.PutHouse(this.house, this.uid).subscribe(data => {
      alert("Your data saved");
      this.changesSaved = true;
    });
  }

  isFieldChanged() {
    return true;
  }

  onEditStaticField(nameField, modal) {
    // // console.log('inside edit household');
    if (nameField === "milk") {
      this.nameField = "Milk ";
      this.editField = this.house.milk;
    } else if (nameField === "fruit") {
      this.nameField = "Veg / Non Veg / Fruits";
      this.editField = this.house.fruit;
    } else if (nameField === "rent") {
      this.nameField = "Rent";
      this.editField = this.house.rent;
    } else if (nameField === "fuel") {
      this.nameField = "Fuel";
      this.editField = this.house.fuel;
    } else if (nameField === "medical") {
      this.nameField = "Medical expenses";
      this.editField = this.house.medical;
    } else if (nameField === "society") {
      this.nameField = "Monthly Society Maintainance";
      this.editField = this.house.society;
    } else if (nameField === "auto") {
      this.nameField = "Auto Maintainance";
      this.editField = this.house.auto;
    } else if (nameField === "edu") {
      this.nameField = "Education";
      this.editField = this.house.edu;
    } else if (nameField === "grocery") {
      this.nameField = "Groceries and Supplies";
      this.editField = this.house.grocery;
    } else if (nameField === "servent") {
      this.nameField = "Maid / Cook / Nanny / Driver";
      this.editField = this.house.servent;
    } else if (nameField === "laundry") {
      this.nameField = "Laundry / Dhobi	";
      this.editField = this.house.laundry;
    } else if (nameField === "vcd") {
      this.nameField = "Video / CD Rentals	";
      this.editField = this.house.vcd;
    } else if (nameField === "selfcare") {
      this.nameField = "Personal care (haircut / Salon / spa / gym etc.)";
      this.editField = this.house.selfcare;
    } else if (nameField === "property") {
      this.nameField = "Property Tax";
      this.editField = this.house.property;
    }
    {
      this.modalService
        .open(modal, { ariaLabelledBy: "houseEditContent" })
        .result.then(
          result => {
            this.closeResult = `Closed with: ${result}`;
            this.FillEdithouse(nameField);
            // // console.log('add house success');
          },
          reason => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
          }
        );
    }
    this.changesSaved = false;
  }

  FillEdithouse(nameField) {
    // // console.log('inside fill edit house');
    if (nameField === "milk") {
      this.house.milk = this.editField;
      this.editField = "";
    } else if (nameField === "fruit") {
      this.house.fruit = this.editField;
      this.editField = "";
    } else if (nameField === "rent") {
      this.house.rent = this.editField;
      this.editField = "";
    } else if (nameField === "fuel") {
      this.house.fuel = this.editField;
      this.editField = "";
    } else if (nameField === "society") {
      this.house.society = this.editField;
      this.editField = "";
    } else if (nameField === "auto") {
      this.house.auto = this.editField;
      this.editField = "";
    } else if (nameField === "edu") {
      this.house.edu = this.editField;
      this.editField = "";
    } else if (nameField === "vcd") {
      this.house.vcd = this.editField;
      this.editField = "";
    } else if (nameField === "grocery") {
      this.house.grocery = this.editField;
      this.editField = "";
    } else if (nameField === "servent") {
      this.house.servent = this.editField;
      this.editField = "";
    } else if (nameField === "laundry") {
      this.house.laundry = this.editField;
      this.editField = "";
    } else if (nameField === "selfcare") {
      this.house.selfcare = this.editField;
      this.editField = "";
    } else if (nameField === "property") {
      this.house.property = this.editField;
      this.editField = "";
    } else if (nameField === "medical") {
      this.house.medical = this.editField;
      this.editField = "";
    }
  }

  editDynamicField(index, modal) {
    // // console.log(index);
    this.nameField = this.dynamicHousehold[index].name;
    this.editField = this.dynamicHousehold[index].value;

    {
      this.modalService
        .open(modal, { ariaLabelledBy: "incomeEditContent" })
        .result.then(
          result => {
            this.closeResult = `Closed with: ${result}`;
            this.dynamicHousehold[index].value = this.editField;
            this.calcHouseholdTotal();
          },
          reason => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
          }
        );
    }
  }
}
