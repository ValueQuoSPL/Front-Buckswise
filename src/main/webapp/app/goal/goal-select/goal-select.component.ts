import { StockService } from "app/my-assets/stocks/stocks.service";
import { Component, OnInit } from "@angular/core";
import { Router, Route } from "@angular/router";
import { FormControl } from "@angular/forms";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { GoalselectService } from "./goalselect.service";
import { Inject } from "@angular/core";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { MutualfundService } from "app/my-assets/mutual/mutual.service";
import { GoalAddButtonComponent } from "../../goal/goal-add-button/goal-add-button.component";
import {
  GoalSelect,
  EducationSelect,
  VehicleSelect,
  ChildBirthSelect,
  MerrageSelect,
  BusinessSelect,
  FamilySupportSelect,
  VacationSelect,
  EmergencyFundSelect,
  RetirementFundSelect,
  NewGoalSelect
} from "./goalselect.model";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { AccountService } from "../../shared";

class Mapping {
  uid;
  goalid;
  assetname;
  assetid;
  valuetomap;
}

@Component({
  selector: "jhi-goal-select",
  templateUrl: "./goal-select.component.html",
  styleUrls: ["./goal-select.component.css"]
})
export class GoalSelectComponent implements OnInit {
  selectedday = "";
  isValid: boolean;
  resource: any;
  amount: any;
  closeResult: string;
  assettype: any;
  dialogRef: any;
  commonid: number;
  goalArray: any;
  assetname: any = [];
  mapping: Mapping = new Mapping();
  checked;

  // goalselectArray = [];
  // HOMESELECT=[];
  // EDUCATIONSELECT=[];
  // VEHICLESELECT=[];
  // CHILDBIRTHSELECT=[];
  // MERRAGESELECT=[];
  // BUSINESSSELECT=[];
  // FAMILYSUPSELECT=[];
  // VACATIONSELECT=[];
  // EMERGENCYSELECT=[];
  // RETIREMENTSELECT=[];
  // NEWGOALSELECT=[];

  goalselect: GoalSelect = new GoalSelect();
  Educationselect: EducationSelect = new EducationSelect();
  Vehicleselect: VehicleSelect = new VehicleSelect();
  Childbirthselect: ChildBirthSelect = new ChildBirthSelect();
  Merrageselect: MerrageSelect = new MerrageSelect();
  Businessselect: BusinessSelect = new BusinessSelect();
  FamilySupportselect: FamilySupportSelect = new FamilySupportSelect();
  Vacationselect: VacationSelect = new VacationSelect();
  EmergencyFundselect: EmergencyFundSelect = new EmergencyFundSelect();
  RetirementFundselect: RetirementFundSelect = new RetirementFundSelect();
  NewGoalselect: NewGoalSelect = new NewGoalSelect();
  goaltype: any;
  userId: any;
  user: any;
  public uid: any;
  public output: any;
  animal: string;
  name: string;
  stockout: any = [];
  keyid: number;

  tempArray: any = [];
  mapval: string;
  assetres: any = [];
  resp: any;

  constructor(
    private router: Router,
    private goalSelectService: GoalselectService,
    private ActiveModal: NgbActiveModal,
    private account: AccountService,
    public dialog: MatDialog,
    private modalService: NgbModal,
    public activeModal: NgbActiveModal,
    public stockService: StockService,
    public Mutualfundservice: MutualfundService
  ) {}
  ngOnInit() {
    this.FetchId();
  }
  clear() {}

  Home() {
    // console.log('the value of type is', this.goaltype);

    this.goalselect.goaltype = this.goaltype;
    this.goalselect.uid = this.uid;
    // console.log('inside saveHome details');
    // console.log('after adding type', this.goalselect.goaltype);
    // console.log('after adding uid', this.goalselect.uid);
    // console.log(this.goalselect.goalname);
    // console.log(this.goalselect.priority);
    // console.log(this.goalselect.price);
    // console.log(this.goalselect.notes);
    // console.log(this.goalselect.requiremonthinvest);
    this.goalSelectService
      .saveHome(this.goalselect)
      .subscribe
      // responce => // console.log(responce),
      // error => // console.log(error)
      ();
    // console.log('outside saveHome details');
    this.isValid = false;
    this.getgoalbyid(this.uid);
  }

  Education() {
    // console.log('the value of type is', this.goaltype);
    // console.log('after adding uid', this.goalselect.uid);
    // console.log(this.Educationselect.goalname);
    // console.log(this.Educationselect.priority);
    // console.log(this.Educationselect.price);
    // console.log(this.Educationselect.notes);
    this.Educationselect.goaltype = this.goaltype;
    this.Educationselect.uid = this.uid;
    // console.log('inside saveHome details');
    // console.log('after adding type', this.Educationselect.goaltype);
    this.goalSelectService
      .saveEducation(this.Educationselect)
      .subscribe
      // responce => // console.log(responce),
      // error => // console.log(error)
      ();
    // console.log('outside saveHome details');
    this.isValid = false;
    this.getgoalbyid(this.uid);
  }
  Vehicle() {
    // console.log('the value of type is', this.goaltype);
    this.Vehicleselect.goaltype = this.goaltype;
    this.Vehicleselect.uid = this.uid;
    // console.log('inside saveHome details');
    // console.log('after adding type', this.Vehicleselect.goaltype);
    this.goalSelectService
      .saveVehicle(this.Vehicleselect)
      .subscribe
      // // responce => // console.log(responce),
      // // error => // console.log(error)
      ();
    // console.log('outside saveHome details');
    this.isValid = false;
    this.getgoalbyid(this.uid);
  }
  Childbirth() {
    // console.log('the value of type is', this.goaltype);
    this.Childbirthselect.goaltype = this.goaltype;
    this.Childbirthselect.uid = this.uid;
    // console.log('inside saveHome details');
    // console.log('after adding type', this.Childbirthselect.goaltype);
    this.goalSelectService
      .saveChildBirth(this.Childbirthselect)
      .subscribe
      // responce => // console.log(responce),
      // error => // console.log(error)
      ();
    // console.log('outside saveHome details');
    this.isValid = false;
    this.getgoalbyid(this.uid);
  }
  Merrage() {
    // console.log('the value of type is', this.goaltype);
    this.Merrageselect.goaltype = this.goaltype;
    this.Merrageselect.uid = this.uid;
    // console.log('inside saveHome details');
    // console.log('after adding type', this.Merrageselect.goaltype);
    this.goalSelectService
      .saveMerrage(this.Merrageselect)
      .subscribe
      // responce => // console.log(responce),
      // error => // console.log(error)
      ();
    // console.log('outside saveHome details');
    this.isValid = false;
    this.getgoalbyid(this.uid);
  }
  Business() {
    // console.log('the value of type is', this.goaltype);
    this.Businessselect.goaltype = this.goaltype;
    this.Businessselect.uid = this.uid;
    // console.log('inside saveHome details');
    // console.log('after adding type', this.Businessselect.goaltype);
    this.goalSelectService
      .saveBusiness(this.Businessselect)
      .subscribe
      // responce => // console.log(responce),
      // error => // console.log(error)
      ();
    // console.log('outside saveHome details');
    this.isValid = false;
    this.getgoalbyid(this.uid);
  }
  Familysupport() {
    // console.log('the value of type is', this.goaltype);
    this.FamilySupportselect.goaltype = this.goaltype;
    this.FamilySupportselect.uid = this.uid;
    // console.log('inside saveHome details');
    // console.log('after adding type', this.FamilySupportselect.goaltype);
    this.goalSelectService
      .saveFamilySupport(this.FamilySupportselect)
      .subscribe
      // responce => // console.log(responce),
      // error => // console.log(error)
      ();
    // console.log('outside saveHome details');
    this.isValid = false;
    this.getgoalbyid(this.uid);
  }
  Vacation() {
    // console.log('the value of type is', this.goaltype);
    this.Vacationselect.goaltype = this.goaltype;
    this.Vacationselect.uid = this.uid;
    // console.log('inside saveHome details');
    // console.log('after adding type', this.Vacationselect.goaltype);
    // console.log(this.goalselect.goalname);
    // console.log(this.goalselect.priority);
    // console.log(this.goalselect.price);
    // console.log(this.goalselect.notes);
    this.goalSelectService
      .saveVacation(this.Vacationselect)
      .subscribe
      // responce => // console.log(responce),
      // error => // console.log(error)
      ();
    // console.log('outside saveHome details');
    this.isValid = false;
    this.getgoalbyid(this.uid);
  }
  EmergencyFund() {
    // console.log('the value of type is', this.goaltype);
    this.EmergencyFundselect.goaltype = this.goaltype;
    this.EmergencyFundselect.uid = this.uid;
    // console.log('inside saveHome details');
    // console.log('after adding type', this.EmergencyFundselect.goaltype);
    this.goalSelectService
      .saveEmergencyFund(this.EmergencyFundselect)
      .subscribe
      // responce => // console.log(responce),
      // error => // console.log(error)
      ();
    // console.log('outside saveHome details');
    this.isValid = false;
    this.getgoalbyid(this.uid);
  }
  RetairementFund() {
    // console.log('the value of type is', this.goaltype);
    this.RetirementFundselect.goaltype = this.goaltype;
    this.RetirementFundselect.uid = this.uid;
    // console.log('inside saveHome details');
    // console.log('after adding type', this.RetirementFundselect.goaltype);
    this.goalSelectService
      .saveRetirementFund(this.RetirementFundselect)
      .subscribe
      // responce => // console.log(responce),
      // error => // console.log(error)
      ();
    // console.log('outside saveHome details');
    this.isValid = false;
    this.getgoalbyid(this.uid);
  }
  NewGoal() {
    // console.log('the value of type is', this.goaltype);
    this.NewGoalselect.goaltype = this.goaltype;
    this.NewGoalselect.uid = this.uid;
    // console.log('inside saveHome details');
    // console.log('after adding goaltype', this.NewGoalselect.goaltype);
    // console.log(this.goalselect.goalname);
    // console.log(this.goalselect.priority);
    // console.log(this.goalselect.price);
    // console.log(this.goalselect.notes);
    this.goalSelectService
      .saveNewGoal(this.NewGoalselect)
      .subscribe
      // responce => // console.log(responce),
      // error => // console.log(error)
      ();
    // console.log('outside saveHome details');
    this.isValid = false;
    this.getgoalbyid(this.uid);
  }
  AddGoal() {
    // console.log('in addgoal');
    // this.router.navigate(['goal']);
    this.isValid = true;
  }
  linkAssets() {
    this.router.navigate(["goalAdd"]);
  }
  selectChange(event: any) {
    // console.log('in selectchange method');
    this.selectedday = event.target.value;
  }
  FetchId(): Promise<any> {
    return this.account
      .get()
      .toPromise()
      .then(response => {
        this.user = response.body;
        // console.log('user goal info', this.user);
        this.uid = this.user.id;
        // console.log('in fetchid method in goal', this.uid);
        this.getgoalbyid(this.uid);
      });
  }
  getgoal() {
    //  // console.log('in main ts', id);
    this.goalSelectService.getgoal().subscribe(res => {
      // console.log(res);
      this.output = res;
      // console.log(this.output);
    });
  }
  getgoalbyid(uid) {
    // console.log('in main ts', this.uid);
    this.goalSelectService.getgoalbyid(this.uid).subscribe(res => {
      // console.log(res);
      this.output = res;
      // console.log(this.output);
      // this.isValid=false;
      if (this.output.uid === null) {
        this.isValid = false;
      } else {
        this.isValid = false;
      }
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(GoalAddButtonComponent, {
      width: "550px"
      // data: {name: this.name, animal: this.animal}
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed');
      this.animal = result;
    });
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  openLinkAsset(editLinkModal, id) {
    this.commonid = id;
    // console.log('editLinkModal common id is', this.commonid);
    this.getGoalbyId(this.commonid);
    this.modalService
      .open(editLinkModal, { ariaLabelledBy: "editLinkModal" })
      .result.then(
        result => {
          this.closeResult = `Closed with: ${result}`;
          console.log("before update goalArray is", this.goalArray);
          this.update();
        },
        reason => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }
  getGoalbyId(commonid) {
    // console.log('in main ts', this.commonid);
    this.goalSelectService.getGoalbyId(this.commonid).subscribe(res => {
      // console.log(res);
      this.goalArray = res;
      // console.log('in goalArray ', this.goalArray);
      // this.goalselect.uid = this.goalArray.uid;
      // this.goalselect.goalname =this. goalArray.goalname;
      // this.goalselect.priority =this. goalArray.goalpriority;
      // this.goalselect.price = this.goalArray.presentcost;
      // this.goalselect.notes = this.goalArray.goalNotes;
      // this.goalselect.loanrequire = this.goalArray.uid;
      // this.goalselect.creationdate = this.goalArray.crationdate;
      // this.goalselect.fundshortage = this.goalArray.fundshortage;
      // this.goalselect.futurecost = this.goalArray.futurecost;
      // this.goalselect.goaltype = this.goalArray.goaltype;
      // this.goalselect.requiremonthinvest = this.goalArray.requiremonthinvest;
      // this.getStockById(this.uid);
      // this.goalselect.assetname = goalArray.uid;
      //         // console.log('this is responce of getGoalbyId ', this.goalArray);
    });
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

  update() {
    console.log("inside update goalArray is ", this.goalArray);
    const element = this.goalArray;
    console.log("array", this.stockout);

    // this.getStockId(this.id)
    // this.getStockById(this.uid);
    // this.goalselect.id = this.commonid;
    // this.newid= this.stocks.id;
    // this.getStockId(this.newid);
    // // console.log('inside update', this.goalselect);
    // this.goalSelectService.UpdateGoal(this.goalselect).subscribe(data => {
    //   alert('Added new stocks details');
    //   this.getgoalbyid(this.uid);
    // });
  }
  selectedRecord(checked, id) {
    // console.log(event);
    console.log(checked, id);
    // console.log(event.checked);

    for (let index = 0; index < this.goalArray.length; index++) {
      const element = this.goalArray[index];
      if (element.id === id) {
        console.log("match found");
        if (checked === true) {
          this.mapping.uid = this.uid;
          this.mapping.goalid = this.commonid;
          this.mapping.assetname = this.assettype;
          this.mapping.assetid = id;
          this.mapping.valuetomap = this.mapval;
          console.log("call post", this.mapping);
          this.goalSelectService.assetmap(this.mapping).subscribe(response => {
            this.assetres = response;
            console.log("response of assetpost", this.assetres);
            // this.resp = this.assetres.valuetomap;
            // console.log('response of assetpost', this.resp);
          });
        } else {
          console.log("call delete", this.mapping);
        }
        break;
      } else {
        console.log("not found");
      }
    }
  }

  deleteRecord(id) {
    console.log(id);
  }

  get() {
    // console.log('id');
    return false;
  }
  getMapValue(id) {
    const res = prompt("Enter value to map ");
    this.mapval = res;
    console.log("map value of id ", id, "is", res);
  }
  getAsset() {
    // console.log(this.assettype);
    if (this.assettype === "stocks") {
      // console.log(this.assettype);
      this.getStockById(this.uid);
    } else if (this.assettype === "mutual") {
      // console.log(this.assettype);
      // this.getMutualFundByUid(this.uid);
    }
  }
  getStockById(uid) {
    this.stockService.getStockById(this.uid).subscribe(res => {
      this.stockout = res;
      this.goalArray = res;
      for (let index = 0; index < this.goalArray.length; index++) {
        const element = this.goalArray[index];
        this.tempArray.push({
          id: element.id,
          value: element.share_price
        });
      }
    });
  }
  getMutualFundByUid(uid) {
    this.Mutualfundservice.getMutualFund(this.uid).subscribe(res => {
      console.log("this is responce of mufund", res);
      this.output = res;
      console.log("responce of getMutualFundByUid service", this.output);
    });
  }
}
