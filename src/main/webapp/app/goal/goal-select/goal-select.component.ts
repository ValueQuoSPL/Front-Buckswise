import { StockService } from 'app/my-assets/stocks/stocks.service';
import { Component, OnInit } from '@angular/core';
import { Router, Route } from '@angular/router';
import { FormControl } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { GoalselectService } from './goalselect.service';
import { Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MutualfundService } from 'app/my-assets/mutual/mutual.service';
import { GoalAddButtonComponent } from '../../goal/goal-add-button/goal-add-button.component';
import { AlternateService } from 'app/my-assets/alternate-investment/alternateinvest.service';
import { CashService } from 'app/my-assets/cash/cash.service';
import { ChitFundService } from 'app/my-assets/chit-funds/chitfund.service';
import { PropertyService } from 'app/my-assets/property/property.service';
import { FutureOptionService } from 'app/my-assets/future-option/futureoption.service';
import { SavingSchemeService } from 'app/my-assets/saving-scheme/savingscheme.service';

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
} from './goalselect.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AccountService } from '../../shared';
import { diffByUnit } from 'fullcalendar/src/util';

class Mapping {
  id;
  uid;
  goalid;
  assetname;
  assetid;
  valuetomap;
  assetValue;
  assettype;
}

// class GoalUpdate {
//   id;
//   notes;
// }

@Component({
  selector: 'jhi-goal-select',
  templateUrl: './goal-select.component.html',
  styleUrls: ['./goal-select.component.css']
})
export class GoalSelectComponent implements OnInit {
  selectedday = '';
  isValid: boolean;
  isSaving: boolean;
  resource: any;
  amount: any;
  closeResult: string;
  assettype: any;
  dialogRef: any;
  commonid: number;
  AssetArray: any;
  assetname: any = [];
  mapping: Mapping = new Mapping();
  checked;
  mutualres: any;
  valtomap: any;
  HTMLArray: any = [];

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

  // GoalNotesUpdate: GoalUpdate = new GoalUpdate();
  GoalNotesUpdate: any = []; // amount

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
  AssetMappingDB: any = [];
  AfterDeleteAssetMappingDB: any = [];
  MappedArray: any = [];
  MappedArrayDB: any = [];
  GoalArray: any = [];
  SingleGoal: any = [];
  goalid: any;
  assetid: any;
  singleAssetTotal;
  AvailableCost;
  GrandTotal;
  PrevGrandTotal;
  PresentCost;
  prevGoalID;
  GlobalFlag;

  stockTotal;
  mutualTotal;
  chitTotal;
  cashTotal;
  propertyTotal;
  altTotal;
  savingTotal;
  faoTotal;
  inflation = 0.07;

  constructor(
    private router: Router,
    private goalSelectService: GoalselectService,
    private ActiveModal: NgbActiveModal,
    private account: AccountService,
    public dialog: MatDialog,
    private modalService: NgbModal,
    public activeModal: NgbActiveModal,
    public stockService: StockService,
    public Mutualfundservice: MutualfundService,
    public altService: AlternateService,
    public cashService: CashService,
    public chitService: ChitFundService,
    public propService: PropertyService,
    public faoService: FutureOptionService,
    public savingService: SavingSchemeService
  ) {}
  ngOnInit() {
    this.singleAssetTotal = 0;
    this.GrandTotal = 0;
    this.stockTotal = 0;
    this.mutualTotal = 0;
    this.chitTotal = 0;
    this.cashTotal = 0;
    this.propertyTotal = 0;
    this.altTotal = 0;
    this.savingTotal = 0;
    this.faoTotal = 0;
    this.FetchId();
  }
  clear() {}

  Home() {
    this.goalselect.goaltype = this.goaltype;
    this.goalselect.uid = this.uid;
    this.goalSelectService.saveHome(this.goalselect).subscribe();
    this.isValid = false;
    this.getgoalbyid(this.uid);
  }

  Education() {
    this.Educationselect.goaltype = this.goaltype;
    this.Educationselect.uid = this.uid;
    console.log(this.Educationselect);

    this.goalSelectService.saveEducation(this.Educationselect).subscribe();
    this.isValid = false;
    this.getgoalbyid(this.uid);
  }
  Vehicle() {
    // // console.log('the value of type is', this.goaltype);
    this.Vehicleselect.goaltype = this.goaltype;
    this.Vehicleselect.uid = this.uid;
    // // console.log('inside saveHome details');
    // // console.log('after adding type', this.Vehicleselect.goaltype);
    this.goalSelectService
      .saveVehicle(this.Vehicleselect)
      .subscribe
      // // responce => // // console.log(responce),
      // // error => // // console.log(error)
      ();
    // // console.log('outside saveHome details');
    this.isValid = false;
    this.getgoalbyid(this.uid);
  }
  Childbirth() {
    // // console.log('the value of type is', this.goaltype);
    this.Childbirthselect.goaltype = this.goaltype;
    this.Childbirthselect.uid = this.uid;
    // // console.log('inside saveHome details');
    // // console.log('after adding type', this.Childbirthselect.goaltype);
    this.goalSelectService
      .saveChildBirth(this.Childbirthselect)
      .subscribe
      // responce => // // console.log(responce),
      // error => // // console.log(error)
      ();
    // // console.log('outside saveHome details');
    this.isValid = false;
    this.getgoalbyid(this.uid);
  }
  Merrage() {
    // // console.log('the value of type is', this.goaltype);
    this.Merrageselect.goaltype = this.goaltype;
    this.Merrageselect.uid = this.uid;
    // // console.log('inside saveHome details');
    // // console.log('after adding type', this.Merrageselect.goaltype);
    this.goalSelectService
      .saveMerrage(this.Merrageselect)
      .subscribe
      // responce => // // console.log(responce),
      // error => // // console.log(error)
      ();
    // // console.log('outside saveHome details');
    this.isValid = false;
    this.getgoalbyid(this.uid);
  }
  Business() {
    // // console.log('the value of type is', this.goaltype);
    this.Businessselect.goaltype = this.goaltype;
    this.Businessselect.uid = this.uid;
    // // console.log('inside saveHome details');
    // // console.log('after adding type', this.Businessselect.goaltype);
    this.goalSelectService
      .saveBusiness(this.Businessselect)
      .subscribe
      // responce => // // console.log(responce),
      // error => // // console.log(error)
      ();
    // // console.log('outside saveHome details');
    this.isValid = false;
    this.getgoalbyid(this.uid);
  }
  Familysupport() {
    // // console.log('the value of type is', this.goaltype);
    this.FamilySupportselect.goaltype = this.goaltype;
    this.FamilySupportselect.uid = this.uid;
    // // console.log('inside saveHome details');
    // // console.log('after adding type', this.FamilySupportselect.goaltype);
    this.goalSelectService
      .saveFamilySupport(this.FamilySupportselect)
      .subscribe
      // responce => // // console.log(responce),
      // error => // // console.log(error)
      ();
    // // console.log('outside saveHome details');
    this.isValid = false;
    this.getgoalbyid(this.uid);
  }
  Vacation() {
    // // console.log('the value of type is', this.goaltype);
    this.Vacationselect.goaltype = this.goaltype;
    this.Vacationselect.uid = this.uid;
    // // console.log('inside saveHome details');
    // // console.log('after adding type', this.Vacationselect.goaltype);
    // // console.log(this.goalselect.goalname);
    // // console.log(this.goalselect.priority);
    // // console.log(this.goalselect.price);
    // // console.log(this.goalselect.notes);
    this.goalSelectService
      .saveVacation(this.Vacationselect)
      .subscribe
      // responce => // // console.log(responce),
      // error => // // console.log(error)
      ();
    // // console.log('outside saveHome details');
    this.isValid = false;
    this.getgoalbyid(this.uid);
  }
  EmergencyFund() {
    // // console.log('the value of type is', this.goaltype);
    this.EmergencyFundselect.goaltype = this.goaltype;
    this.EmergencyFundselect.uid = this.uid;
    // // console.log('inside saveHome details');
    // // console.log('after adding type', this.EmergencyFundselect.goaltype);
    this.goalSelectService
      .saveEmergencyFund(this.EmergencyFundselect)
      .subscribe
      // responce => // // console.log(responce),
      // error => // // console.log(error)
      ();
    // // console.log('outside saveHome details');
    this.isValid = false;
    this.getgoalbyid(this.uid);
  }
  RetairementFund() {
    // // console.log('the value of type is', this.goaltype);
    this.RetirementFundselect.goaltype = this.goaltype;
    this.RetirementFundselect.uid = this.uid;
    // // console.log('inside saveHome details');
    // // console.log('after adding type', this.RetirementFundselect.goaltype);
    this.goalSelectService
      .saveRetirementFund(this.RetirementFundselect)
      .subscribe
      // responce => // // console.log(responce),
      // error => // // console.log(error)
      ();
    // // console.log('outside saveHome details');
    this.isValid = false;
    this.getgoalbyid(this.uid);
  }
  NewGoal() {
    // // console.log('the value of type is', this.goaltype);
    this.NewGoalselect.goaltype = this.goaltype;
    this.NewGoalselect.uid = this.uid;
    // // console.log('inside saveHome details');
    // // console.log('after adding goaltype', this.NewGoalselect.goaltype);
    // // console.log(this.goalselect.goalname);
    // // console.log(this.goalselect.priority);
    // // console.log(this.goalselect.price);
    // // console.log(this.goalselect.notes);
    this.goalSelectService
      .saveNewGoal(this.NewGoalselect)
      .subscribe
      // responce => // // console.log(responce),
      // error => // // console.log(error)
      ();
    // // console.log('outside saveHome details');
    this.isValid = false;
    this.getgoalbyid(this.uid);
  }
  AddGoal() {
    // // console.log('in addgoal');
    // this.router.navigate(['goal']);
    this.isValid = true;
  }
  linkAssets() {
    this.router.navigate(['goalAdd']);
  }
  selectChange(event: any) {
    // // console.log('in selectchange method');
    this.selectedday = event.target.value;
  }
  FetchId(): Promise<any> {
    return this.account
      .get()
      .toPromise()
      .then(response => {
        this.user = response.body;
        // // console.log('user goal info', this.user);
        this.uid = this.user.id;
        this.mapping.uid = this.uid;
        // // console.log('in fetchid method in goal', this.uid);
        this.getgoalbyid(this.uid);
      });
  }
  getgoalbyid(uid) {
    this.goalSelectService.getgoalbyid(this.uid).subscribe(res => {
      this.GoalArray = res;
      console.log(this.GoalArray);

      this.viewUpdate();

      this.output = this.GoalArray;

      if (this.output.uid === null) {
        this.isValid = false;
      } else {
        this.isValid = false;
      }
    });

    this.goalSelectService.GetMapping(this.uid).subscribe(data => {
      this.AssetMappingDB = data;
    });
  }

  viewUpdate() {
    for (let index = 0; index < this.GoalArray.length; index++) {
      const element = this.GoalArray[index];

      // view update of modal for available cost
      if (element.id === this.commonid) {
        this.PresentCost = element.presentcost;
        this.GrandTotal = element.goalNotes;
        this.AvailableCost = +this.PresentCost - +this.GrandTotal;
        console.log('available 1', this.AvailableCost);
      }

      // calculating Future cost = B3*(1+B4)^B2
      // element.futurecost = present cost *( 1+ inflation)^ years
      element.futurecost = Math.round(
        element.presentcost * Math.pow(1 + this.inflation, element.yeartogoal)
      );
      element.fundshortage = +element.futurecost - +element.goalNotes;
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(GoalAddButtonComponent, {
      width: '550px'
      // data: {name: this.name, animal: this.animal}
    });

    dialogRef.afterClosed().subscribe(result => {
      // // console.log('The dialog was closed');
      this.animal = result;
    });
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  getGoalbyId(commonid) {
    this.goalSelectService.getGoalbyId(this.commonid).subscribe(res => {
      this.SingleGoal = res;
    });
  }
  openLinkAsset(editLinkModal, goalid) {
    this.commonid = goalid;
    // this.assettype = null;
    this.viewUpdate();
    console.log('available 2', this.AvailableCost);

    this.HTMLArray.splice(0, this.HTMLArray.length);

    for (let index = 0; index < this.GoalArray.length; index++) {
      const element = this.GoalArray[index];
      if (goalid === element.id) {
        this.PresentCost = element.presentcost;
        this.GrandTotal = element.goalNotes;
        break;
      }
    }

    this.getGoalbyId(this.commonid);

    this.modalService
      .open(editLinkModal, { ariaLabelledBy: 'editLinkModal' })
      .result.then(
        result => {
          this.closeResult = `Closed with: ${result}`;
          this.updateGoal();
        },
        reason => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
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
  updateGoal() {
    this.SetGrandTotal();

    this.goalSelectService
      .UpdateGoal(this.GoalNotesUpdate)
      .subscribe(res => {});
  }

  SetGrandTotal() {
    this.GrandTotal =
      +this.stockTotal +
      +this.mutualTotal +
      +this.chitTotal +
      +this.cashTotal +
      +this.propertyTotal +
      +this.faoTotal +
      +this.savingTotal +
      +this.altTotal;

    console.log('grand total', this.GrandTotal);

    this.AvailableCost = +this.PresentCost - +this.GrandTotal;

    this.GoalNotesUpdate.splice(0, this.GoalNotesUpdate.length);

    this.GoalNotesUpdate.push({
      id: this.commonid,
      notes: this.GrandTotal
    });

    for (let index = 0; index < this.GoalArray.length; index++) {
      const element = this.GoalArray[index];

      if (element.id === this.commonid) {
        element.goalNotes = this.GrandTotal;
        break;
      }
    }
  }

  selectedRecord(checked, id) {
    this.assetid = id;
    this.checked = checked;

    for (let index = 0; index < this.HTMLArray.length; index++) {
      const element = this.HTMLArray[index];

      if (element.id === id) {
        if (checked) {
          element.disable = false;
        } else {
          element.disable = true;
        }
        break;
      }
    }
  }

  getMapValue(assetid) {
    this.valtomap = prompt('Enter value to map ');

    for (let index = 0; index < this.HTMLArray.length; index++) {
      const element = this.HTMLArray[index];

      if (element.id === assetid) {
        // console.log('html array asset id ', element.id, 'selected asset id', assetid);
        // console.log('asset value', element.assetvalue, 'your value', this.valtomap);

        if (element.assetvalue >= this.valtomap) {
          element.mappedvalue = this.valtomap;
          const total = this.calculateSingleAssetTotal();
          // console.log('returned total', total);
        } else {
          alert('Please enter value which is less than Asset Value');
        }
        break;
      }
    }

    this.ManipulateMapping(assetid);
  }

  calculateSingleAssetTotal() {
    this.singleAssetTotal = 0;

    for (let index = 0; index < this.HTMLArray.length; index++) {
      const element = this.HTMLArray[index];
      this.singleAssetTotal = this.singleAssetTotal + +element.mappedvalue;
    }

    if (this.assettype === 'stocks') {
      this.stockTotal = this.singleAssetTotal;
    } else if (this.assettype === 'mutual') {
      this.mutualTotal = this.singleAssetTotal;
    } else if (this.assettype === 'ChitFund') {
      this.chitTotal = this.singleAssetTotal;
    } else if (this.assettype === 'FutureandOption') {
      this.faoTotal = this.singleAssetTotal;
    } else if (this.assettype === 'SavingScheme') {
      this.savingTotal = this.singleAssetTotal;
    } else if (this.assettype === 'AlternativeInvestment') {
      this.altTotal = this.singleAssetTotal;
    } else if (this.assettype === 'cash') {
      this.cashTotal = this.singleAssetTotal;
    } else if (this.assettype === 'Propertyandhousehold') {
      this.propertyTotal = this.singleAssetTotal;
    }

    return this.singleAssetTotal;
  }

  ManipulateMapping(assetid) {
    // console.log('manipulate');

    for (let index = 0; index < this.HTMLArray.length; index++) {
      const asset = this.HTMLArray[index];

      if (asset.id === this.assetid) {
        this.findAssetAndFillMapping(this.assetid);

        if (this.checked === true) {
          // console.log('checked = true');
          this.PostMapping();
          this.SetGrandTotal();
        } else {
          for (let j = 0; j < this.AssetMappingDB.length; j++) {
            const row = this.AssetMappingDB[j];
            if (row.assettype === this.assettype && row.assetid === assetid) {
              const res = this.goalSelectService
                .DeleteMapping(row.id)
                .subscribe();
              break;
            }
          }
        }
        break;
      }
    }
  }

  PostMapping() {
    // console.log('checking for db');

    let flag = 0;
    for (let index = 0; index < this.AssetMappingDB.length; index++) {
      const db = this.AssetMappingDB[index];
      if (
        this.mapping.goalid === db.goalid &&
        this.mapping.assettype === db.assettype &&
        this.mapping.assetid === db.assetid
      ) {
        // console.log('alredy in db');
        flag = 0;
        this.GlobalFlag = false;
        this.mapping.id = db.id;

        this.goalSelectService.PutMapping(this.mapping).subscribe(res => {
          this.getMappedAsset();
        });

        break;
      } else {
        flag = 1;
        this.GlobalFlag = true;
      }
    }

    if (flag === 1 || this.AssetMappingDB.length === 0) {
      // console.log('not in db posing now');
      this.goalSelectService.PostMapping(this.mapping).subscribe(res => {
        this.getMappedAsset();
      });
    }
  }

  findAssetAndFillMapping(assetid) {
    for (let index = 0; index < this.HTMLArray.length; index++) {
      const element = this.HTMLArray[index];
      if (assetid === element.id) {
        this.mapping.goalid = this.commonid;
        this.mapping.assettype = this.assettype;
        this.mapping.assetname = element.assetname;
        this.mapping.assetid = element.id;
        this.mapping.assetValue = element.assetvalue;
        this.mapping.valuetomap = element.mappedvalue;
        break;
      }
    }
  }

  viewByGoalId(id, content) {
    this.goalid = id;

    this.MappedArray.splice(0, this.MappedArray.length);
    // console.log('before filling mapped array', this.MappedArray);

    for (let index = 0; index < this.GoalArray.length; index++) {
      const goal = this.GoalArray[index];
      if (goal.id === this.goalid) {
        // // console.log('goal found');
        // // console.log(goal);
        this.viewGoal(id, content);
        break;
      } else {
        // console.log('goal not found');
      }
    }
  }

  viewGoal(id, content) {
    this.goalSelectService.GetMapping(this.uid).subscribe(res => {
      this.MappedArrayDB = res;
      // console.log('db mapped array', this.MappedArrayDB);
      for (let index = 0; index < this.MappedArrayDB.length; index++) {
        const element = this.MappedArrayDB[index];
        if (element.goalid === id) {
          this.MappedArray.push({ element });
        }
      }
      this.OpenMappedAsset(content);
    });
  }

  OpenMappedAsset(content) {
    // console.log('after filling mapped array', this.MappedArray);

    this.modalService
      .open(content, { ariaLabelledBy: 'viewLinkedAssetModal' })
      .result.then(
        result => {
          this.closeResult = `Closed with: ${result}`;
        },
        reason => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  deleteRecord(id) {
    // console.log(id);
  }

  get(assetid) {
    // // console.log('ccheck for', assetid);
    // // console.log('mapped data', this.AssetMappingDB);

    // let flag = 0;
    // for (let index = 0; index < this.AssetMappingDB.length; index++) {
    //   const element = this.AssetMappingDB[index];
    //   // console.log('goal id db', this.commonid, 'goal id local', element.goalid);
    //   // console.log('asset type db', this.commonid, 'asset type local', element.goalid);
    //   // console.log('asset id db', this.commonid, 'asset id local', element.goalid);

    //     if (this.commonid === element.goalid && this.assettype === element.assettype && element.assetid === assetid) {
    //       // console.log('match found');
    //       flag = 1;
    //       break;
    //     } else {
    //       // console.log('match not found');
    //       flag = 0;
    //     }
    // }

    // if (flag === 1) {
    //   // console.log('flag true');
    //   return true;
    // } else {
    //   // console.log('flag false');
    return false;
    // }
  }

  getAsset() {
    if (this.assettype === 'stocks') {
      this.getStockById(this.uid);
      // this.getMappedAsset();
    } else if (this.assettype === 'mutual') {
      this.getMutualFundByUid(this.uid);
    } else if (this.assettype === 'ChitFund') {
      this.getChitFund();
    } else if (this.assettype === 'FutureandOption') {
      this.getFAO();
    } else if (this.assettype === 'SavingScheme') {
      this.getSaving();
    } else if (this.assettype === 'AlternativeInvestment') {
      this.getAlt();
    } else if (this.assettype === 'cash') {
      this.getCash();
    } else if (this.assettype === 'Propertyandhousehold') {
      this.getProperty();
    }
  }
  getMappedAsset() {
    this.goalSelectService.GetMapping(this.uid).subscribe(data => {
      this.AssetMappingDB = data;
      console.log('Db data', this.AssetMappingDB);
      this.AssetViewUpdate();
    });
  }

  AssetViewUpdate() {
    console.log('html before', this.HTMLArray);

    this.singleAssetTotal = 0;
    this.HTMLArray.forEach(html => {
      for (let index = 0; index < this.AssetMappingDB.length; index++) {
        const db = this.AssetMappingDB[index];
        if (
          this.commonid === db.goalid &&
          this.assettype === db.assettype &&
          html.id === db.assetid
        ) {
          html.mappedvalue = db.valuetomap;
          break;
        }
      }
    });

    this.calculateSingleAssetTotal();
    console.log('html after', this.HTMLArray);
  }

  getStockById(uid) {
    this.HTMLArray.splice(0, this.HTMLArray.length);

    this.stockService.getStockById(this.uid).subscribe(res => {
      this.stockout = res;
      this.AssetArray = res;

      this.AssetArray.forEach(element => {
        this.HTMLArray.push({
          id: element.id,
          assetname: element.company_name,
          assetvalue: element.share_price,
          mappedvalue: 0,
          disable: true
        });
      });

      console.log('html array of stock', this.HTMLArray);
      this.getMappedAsset();
    });
  }
  getMutualFundByUid(uid) {
    this.HTMLArray.splice(0, this.HTMLArray.length);

    this.Mutualfundservice.getMutualFund(this.uid).subscribe(res => {
      this.mutualres = res;
      this.AssetArray = res;

      this.AssetArray.forEach(element => {
        this.HTMLArray.push({
          id: element.id,
          assetname: element.mfscheme,
          assetvalue: element.currentvalue,
          mappedvalue: 0,
          disable: true
        });
      });

      console.log('html array of mutual', this.HTMLArray);
      this.getMappedAsset();
    });
  }
  getChitFund() {
    this.HTMLArray.splice(0, this.HTMLArray.length);

    this.chitService.getChitByuid(this.uid).subscribe(res => {
      this.mutualres = res;
      this.AssetArray = res;

      this.AssetArray.forEach(element => {
        this.HTMLArray.push({
          id: element.id,
          assetname: element.chit_name,
          assetvalue: element.current_value,
          mappedvalue: 0,
          disable: true
        });
      });

      console.log('html array of chit', this.HTMLArray);
      this.getMappedAsset();
    });
  }
  getFAO() {
    this.HTMLArray.splice(0, this.HTMLArray.length);

    this.faoService.getFAOByUid(this.uid).subscribe(res => {
      this.mutualres = res;
      this.AssetArray = res;

      this.AssetArray.forEach(element => {
        this.HTMLArray.push({
          id: element.id,
          assetname: element.asset_name,
          assetvalue: element.contract_m_value,
          mappedvalue: 0,
          disable: true
        });
      });

      console.log('html array of fao', this.HTMLArray);
      this.getMappedAsset();
    });
  }
  getSaving() {
    this.HTMLArray.splice(0, this.HTMLArray.length);

    this.savingService.getSavingScheme(this.uid).subscribe(res => {
      this.mutualres = res;
      this.AssetArray = res;

      this.AssetArray.forEach(element => {
        this.HTMLArray.push({
          id: element.id,
          assetname: element.organisation_name,
          assetvalue: element.amount_invested,
          mappedvalue: 0,
          disable: true
        });
      });

      console.log('html array of saving', this.HTMLArray);
      this.getMappedAsset();
    });
  }
  getAlt() {
    this.HTMLArray.splice(0, this.HTMLArray.length);

    this.altService.getAltInvestmentByuid(this.uid).subscribe(res => {
      this.mutualres = res;
      this.AssetArray = res;

      this.AssetArray.forEach(element => {
        this.HTMLArray.push({
          id: element.id,
          assetname: element.fund_name,
          assetvalue: element.market_value,
          mappedvalue: 0,
          disable: true
        });
      });

      console.log('html array of alt', this.HTMLArray);
      this.getMappedAsset();
    });
  }
  getCash() {
    this.HTMLArray.splice(0, this.HTMLArray.length);

    this.cashService.getCashDetailsByuid(this.uid).subscribe(res => {
      this.mutualres = res;
      this.AssetArray = res;

      this.AssetArray.forEach(element => {
        this.HTMLArray.push({
          id: element.id,
          assetname: element.cash_source,
          assetvalue: element.amount,
          mappedvalue: 0,
          disable: true
        });
      });

      console.log('html array of cash', this.HTMLArray);
      this.getMappedAsset();
    });
  }
  getProperty() {
    this.HTMLArray.splice(0, this.HTMLArray.length);

    this.propService.getsavePropertyByuid(this.uid).subscribe(res => {
      this.mutualres = res;
      this.AssetArray = res;

      this.AssetArray.forEach(element => {
        this.HTMLArray.push({
          id: element.id,
          assetname: element.prop_name,
          assetvalue: element.current_m_value,
          mappedvalue: 0,
          disable: true
        });
      });

      console.log('html array of prop', this.HTMLArray);
      this.getMappedAsset();
    });
  }
}
