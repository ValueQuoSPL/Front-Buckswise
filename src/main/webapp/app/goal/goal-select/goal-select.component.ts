import { Component, OnInit } from '@angular/core';
import { Router, Route } from '@angular/router';
import { FormControl } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { GoalselectService } from './goalselect.service';
import { Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { GoalAddButtonComponent } from '../../goal/goal-add-button/goal-add-button.component';
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

@Component({
  selector: 'jhi-goal-select',
  templateUrl: './goal-select.component.html',
  styles: ['./goal-select.component.css']
})
export class GoalSelectComponent implements OnInit {
  // goalselect: GoalSelect = new GoalSelect();
  // Educationselect: EducationSelect= new EducationSelect();
  // Vehicleselect:VehicleSelect=new VehicleSelect();
  // Childbirthselect:ChildBirthSelect=new ChildBirthSelect();
  // Merrageselect:MerrageSelect=new MerrageSelect();
  // Businessselect:BusinessSelect=new BusinessSelect();
  // FamilySupportselect:FamilySupportSelect=new FamilySupportSelect();
  // Vacationselect:VacationSelect=new VacationSelect();
  // EmergencyFundselect:EmergencyFundSelect=new EmergencyFundSelect();
  // RetirementFundselect:RetirementFundSelect=new RetirementFundSelect();
  // NewGoalselect:NewGoalSelect=new NewGoalSelect();
  selectedday = '';
  isValid: boolean;
  resource: any;
  amount: any;
  closeResult: string;
  assettype: any;
  dialogRef: any;
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

  goalselect: any;
  Educationselect: any;
  Vehicleselect: any;
  Childbirthselect: any;
  Merrageselect: any;
  Businessselect: any;
  FamilySupportselect: any;
  Vacationselect: any;
  EmergencyFundselect: any;
  RetirementFundselect: any;
  NewGoalselect: any;
  goaltype: any;
  userId: any;
  user: any;
  public uid: any;
  public output: any;
  animal: string;
  name: string;
  constructor(
    private router: Router,
    private goalSelectService: GoalselectService,
    private ActiveModal: NgbActiveModal,
    private account: AccountService,
    private modalService: NgbModal,
    public dialog: MatDialog
  ) {
    // this.EducationSelect = new EducationSelect('Educationselect');
  }
  ngOnInit() {
    this.FetchId();
    this.goalselect = {};
    this.Educationselect = {};
    this.Vehicleselect = {};
    this.Childbirthselect = {};
    this.Merrageselect = {};
    this.Businessselect = {};
    this.FamilySupportselect = {};
    this.Vacationselect = {};
    this.EmergencyFundselect = {};
    this.RetirementFundselect = {};
    this.NewGoalselect = {};
  }

  // clear()
  // {
  //   this.ActiveModal.dismiss('cancle');
  // }
  // Add(){
  //   // this.router.navigateByUrl('goalAdd');

  // }
  Home() {
    console.log('the value of type is', this.goaltype);

    this.goalselect.goaltype = this.goaltype;
    this.goalselect.uid = this.uid;
    console.log('inside saveHome details');
    console.log('after adding type', this.goalselect.goaltype);
    console.log('after adding uid', this.goalselect.uid);
    console.log(this.goalselect.goalname);
    console.log(this.goalselect.priority);
    console.log(this.goalselect.price);
    console.log(this.goalselect.notes);
    console.log(this.goalselect.requiremonthinvest);
    this.goalSelectService
      .saveHome(this.goalselect)
      .subscribe(
        responce => console.log(responce),
        error => console.log(error)
      );
    console.log('outside saveHome details');
  }

  Education() {
    console.log('the value of type is', this.goaltype);
    console.log('after adding uid', this.goalselect.uid);
    console.log(this.Educationselect.goalname);
    console.log(this.Educationselect.priority);
    console.log(this.Educationselect.price);
    console.log(this.Educationselect.notes);
    this.Educationselect.goaltype = this.goaltype;
    this.Educationselect.uid = this.uid;
    console.log('inside saveHome details');
    console.log('after adding type', this.Educationselect.type);
    this.goalSelectService
      .saveEducation(this.Educationselect)
      .subscribe(
        responce => console.log(responce),
        error => console.log(error)
      );
    console.log('outside saveHome details');
  }
  Vehicle() {
    console.log('the value of type is', this.goaltype);
    this.Vehicleselect.goaltype = this.goaltype;
    this.Vehicleselect.uid = this.uid;
    console.log('inside saveHome details');
    console.log('after adding type', this.Vehicleselect.type);
    this.goalSelectService
      .saveVehicle(this.Vehicleselect)
      .subscribe(
        responce => console.log(responce),
        error => console.log(error)
      );
    console.log('outside saveHome details');
  }
  Childbirth() {
    console.log('the value of type is', this.goaltype);
    this.Childbirthselect.goaltype = this.goaltype;
    this.Childbirthselect.uid = this.uid;
    console.log('inside saveHome details');
    console.log('after adding type', this.Childbirthselect.goaltype);
    this.goalSelectService
      .saveChildBirth(this.Childbirthselect)
      .subscribe(
        responce => console.log(responce),
        error => console.log(error)
      );
    console.log('outside saveHome details');
  }
  Merrage() {
    console.log('the value of type is', this.goaltype);
    this.Merrageselect.goaltype = this.goaltype;
    this.Merrageselect.uid = this.uid;
    console.log('inside saveHome details');
    console.log('after adding type', this.Merrageselect.goaltype);
    this.goalSelectService
      .saveMerrage(this.Merrageselect)
      .subscribe(
        responce => console.log(responce),
        error => console.log(error)
      );
    console.log('outside saveHome details');
  }
  Business() {
    console.log('the value of type is', this.goaltype);
    this.Businessselect.goaltype = this.goaltype;
    this.Businessselect.uid = this.uid;
    console.log('inside saveHome details');
    console.log('after adding type', this.Businessselect.goaltype);
    this.goalSelectService
      .saveBusiness(this.Businessselect)
      .subscribe(
        responce => console.log(responce),
        error => console.log(error)
      );
    console.log('outside saveHome details');
  }
  Familysupport() {
    console.log('the value of type is', this.goaltype);
    this.FamilySupportselect.goaltype = this.goaltype;
    this.FamilySupportselect.uid = this.uid;
    console.log('inside saveHome details');
    console.log('after adding type', this.FamilySupportselect.goaltype);
    this.goalSelectService
      .saveFamilySupport(this.FamilySupportselect)
      .subscribe(
        responce => console.log(responce),
        error => console.log(error)
      );
    console.log('outside saveHome details');
  }
  Vacation() {
    console.log('the value of type is', this.goaltype);
    this.Vacationselect.goaltype = this.goaltype;
    this.Vacationselect.uid = this.uid;
    console.log('inside saveHome details');
    console.log('after adding type', this.Vacationselect.goaltype);
    console.log(this.goalselect.goalname);
    console.log(this.goalselect.priority);
    console.log(this.goalselect.price);
    console.log(this.goalselect.notes);
    this.goalSelectService
      .saveVacation(this.Vacationselect)
      .subscribe(
        responce => console.log(responce),
        error => console.log(error)
      );
    console.log('outside saveHome details');
  }
  EmergencyFund() {
    console.log('the value of type is', this.goaltype);
    this.EmergencyFundselect.goaltype = this.goaltype;
    this.EmergencyFundselect.uid = this.uid;
    console.log('inside saveHome details');
    console.log('after adding type', this.EmergencyFundselect.goaltype);
    this.goalSelectService
      .saveEmergencyFund(this.EmergencyFundselect)
      .subscribe(
        responce => console.log(responce),
        error => console.log(error)
      );
    console.log('outside saveHome details');
  }
  RetairementFund() {
    console.log('the value of type is', this.goaltype);
    this.RetirementFundselect.goaltype = this.goaltype;
    this.RetirementFundselect.uid = this.uid;
    console.log('inside saveHome details');
    console.log('after adding type', this.RetirementFundselect.goaltype);
    this.goalSelectService
      .saveRetirementFund(this.RetirementFundselect)
      .subscribe(
        responce => console.log(responce),
        error => console.log(error)
      );
    console.log('outside saveHome details');
  }
  NewGoal() {
    console.log('the value of type is', this.goaltype);
    this.NewGoalselect.goaltype = this.goaltype;
    this.NewGoalselect.uid = this.uid;
    console.log('inside saveHome details');
    console.log('after adding goaltype', this.NewGoalselect.goaltype);
    console.log(this.goalselect.goalname);
    console.log(this.goalselect.priority);
    console.log(this.goalselect.price);
    console.log(this.goalselect.notes);
    this.goalSelectService
      .saveNewGoal(this.NewGoalselect)
      .subscribe(
        responce => console.log(responce),
        error => console.log(error)
      );
    console.log('outside saveHome details');
  }
  AddGoal() {
    console.log('in addgoal');
    // this.router.navigate(['goal']);
    this.isValid = false;
  }
  linkAssets() {
    this.router.navigate(['goalAdd']);
  }
  selectChange(event: any) {
    console.log('in selectchange method');
    this.selectedday = event.target.value;
  }
  FetchId(): Promise<any> {
    return this.account
      .get()
      .toPromise()
      .then(response => {
        this.user = response.body;
        console.log('user info', this.user);
        this.uid = this.user.id;
        console.log('in fetchid method', this.uid);
        this.getgoalbyid(this.uid);
      });
  }
  getgoal() {
    //  console.log('in main ts', id);
    this.goalSelectService.getgoal().subscribe(res => {
      console.log(res);
      this.output = res;
      console.log(this.output);
    });
  }
  getgoalbyid(uid) {
    console.log('in main ts', this.uid);
    this.goalSelectService.getgoalbyid(this.uid).subscribe(res => {
      console.log(res);
      this.output = res;
      console.log(this.output);
      // this.isValid=false;
      if (this.output.uid === null) {
        this.isValid = true;
      } else {
        this.isValid = false;
      }
    });
  }
  // changeVthis.output: boolean) {
  //   this.isValid = valid;
  // }
  // openLg(content) {
  //   this.modalService.open(content, { size: 'lg' });
  // }

  openDialog(): void {
    const dialogRef = this.dialog.open(GoalAddButtonComponent, {
      width: '550px'
    });
  }
  closeDialog() {
    const dialogRef = this.dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
