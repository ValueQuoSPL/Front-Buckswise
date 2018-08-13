import { Component, OnInit } from '@angular/core';
import { Router, Route } from '@angular/router';
import { GoalselectService } from './goalselect.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
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
  constructor(
    private router: Router,
    private goalSelectService: GoalselectService,
    private ActiveModal: NgbActiveModal,
    private account: AccountService,
   private modalService: NgbModal
  ) {
    // this.EducationSelect = new EducationSelect('Educationselect');
  }
  ngOnInit() {
    this.FetchId();
    this.getgoalbyid(this.uid);
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
  openLg(content) {
    this.modalService.open(content, { size: 'lg' });
  }

  //   saveHome():void{
  // this.goalselectArray.push({
  //   goalname: this.goalselect.goalname,
  //   priority:this.goalselect.priority,
  //   price:this.goalselect.price,
  //   notes:this.goalselect.notes,
  //   loanrequire:this.goalselect.loanrequire,
  //   creationdate:this.goalselect.creationdate,
  // });
  // this.HOMESELECT.push({
  //  Goalname:this.goalselect.goalname,
  //  Priority:this.goalselect.priority,
  //  Price:this.goalselect.price,
  //  Notes:this.goalselect.notes,
  //  loanRequire:this.goalselect.loanrequire,
  //  CreationDate:this.goalselect.creationdate
  // })
  //   saveEducation():void{
  //     this.EDUCATIONSELECT.push({
  //       Goalname:this.Educationselect.goalname,
  //       Priority:this.Educationselect.priority,
  //       Price:this.Educationselect.price,
  //       Notes:this.Educationselect.notes,
  //       loanRequire:this.Educationselect.loanrequire,
  //       CreationDate:this.Educationselect.creationdate
  //     })

  //     console.log('inside saveEducation');
  //     this.goalSelectService.saveEducation(this.EDUCATIONSELECT).subscribe(data =>
  //     {
  //       alert('Data saved successfully');
  //       console.log('Data saved successfully');
  //     });
  //   }
  //   saveVehicle():void
  //   {
  //     this.VEHICLESELECT.push({
  //       Goalname:this.Vehicleselect.goalname,
  //       Priority:this.Vehicleselect.priority,
  //       Price:this.Vehicleselect.price,
  //       Notes:this.Vehicleselect.notes,
  //       loanRequire:this.Vehicleselect.loanrequire,
  //       CreationDate:this.Vehicleselect.creationdate
  //     })
  //   console.log('inside saveVehicle');
  //   this.goalSelectService.saveVehicle(this.VEHICLESELECT).subscribe(data =>
  //     {
  //     alert('Data saved successfully');
  //     console.log('Data saved successfully');
  //   });
  // }
  // saveChildbirth():void
  // {
  //   this.CHILDBIRTHSELECT.push({
  //     Goalname:this.Childbirthselect.goalname,
  //     Priority:this.Childbirthselect.priority,
  //     Price:this.Childbirthselect.price,
  //     Notes:this.Childbirthselect.notes,
  //     loanRequire:this.Childbirthselect.loanrequire,
  //     CreationDate:this.Childbirthselect.creationdate
  //   })
  //   console.log('inside saveChildBirth');
  //   this.goalSelectService.saveChildbirth(this.CHILDBIRTHSELECT).subscribe(data =>
  //     {
  //     alert('Data saved successfully');
  //     console.log('Data saved successfully');
  //   });
  // }
  //   saveMerrage(): void
  //   {
  //     this.MERRAGESELECT.push({
  //       Goalname:this.Merrageselect.goalname,
  //       Priority:this.Merrageselect.priority,
  //       Price:this.Merrageselect.price,
  //       Notes:this.Merrageselect.notes,
  //       loanRequire:this.Merrageselect.loanrequire,
  //       CreationDate:this.Merrageselect.creationdate
  //     })
  //   console.log('inside saveChildBirth');
  //   this.goalSelectService.saveMerrage(this.MERRAGESELECT).subscribe(data =>
  //     {
  //     alert('Data saved successfully');
  //     console.log('Data saved successfully');
  //     });
  //   }
  //   saveBusiness():void{
  //     this.BUSINESSSELECT.push({
  //       Goalname:this.Businessselect.goalname,
  //       Priority:this.Businessselect.priority,
  //       Price:this.Businessselect.price,
  //       Notes:this.Businessselect.notes,
  //       loanRequire:this.Businessselect.loanrequire,
  //       CreationDate:this.Businessselect.creationdate
  //     })
  //   console.log('inside saveChildBirth');
  //   this.goalSelectService.saveBusiness(this.BUSINESSSELECT).subscribe(data =>
  //   {
  //     alert('Data saved successfully');
  //     console.log('Data saved successfully');
  //   });
  // }
  // saveFamilysup():void
  // {
  //   this.FAMILYSUPSELECT.push({
  //     Goalname:this.FamilySupportselect.goalname,
  //     Priority:this.FamilySupportselect.priority,
  //     Price:this.FamilySupportselect.price,
  //     Notes:this.FamilySupportselect.notes,
  //     loanRequire:this.FamilySupportselect.loanrequire,
  //     CreationDate:this.FamilySupportselect.creationdate
  //   })
  // console.log('inside saveChildBirth');
  // this.goalSelectService.saveFamilysup(this.FAMILYSUPSELECT).subscribe(data =>
  //   {
  //     alert('Data saved successfully');
  //     console.log('Data saved successfully');
  //   });
  // }
  // saveVacation():void
  //   {
  //     this.VACATIONSELECT.push({
  //       Goalname:this.Vacationselect.goalname,
  //       Priority:this.Vacationselect.priority,
  //       Price:this.Vacationselect.price,
  //       Notes:this.Vacationselect.notes,
  //       loanRequire:this.Vacationselect.loanrequire,
  //       CreationDate:this.Vacationselect.creationdate
  //     })
  //   console.log('inside saveChildBirth');
  //   this.goalSelectService.saveVacation(this.VACATIONSELECT).subscribe(data =>
  //     {
  //     alert('Data saved successfully');
  //     console.log('Data saved successfully');
  //   });
  // }
  //   saveEmergencyFund():void
  //   {
  //     this.EMERGENCYSELECT.push({
  //       Goalname:this.EmergencyFundselect.goalname,
  //       Priority:this.EmergencyFundselect.priority,
  //       Price:this.EmergencyFundselect.price,
  //       Notes:this.EmergencyFundselect.notes,
  //       loanRequire:this.EmergencyFundselect.loanrequire,
  //       CreationDate:this.EmergencyFundselect.creationdate
  //     })
  //   console.log('inside saveChildBirth');
  //   this.goalSelectService.saveEmergencyFund(this.EMERGENCYSELECT).subscribe(data =>
  //     {
  //     alert('Data saved successfully');
  //     console.log('Data saved successfully');
  //   });
  // }
  //   saveRetairementFund():void
  //   {
  //     this.RETIREMENTSELECT.push({
  //       Goalname:this.RetirementFundselect.goalname,
  //       Priority:this.RetirementFundselect.priority,
  //       Price:this.RetirementFundselect.price,
  //       Notes:this.RetirementFundselect.notes,
  //       Duration:this.RetirementFundselect.duration,
  //       loanRequire:this.RetirementFundselect.loanrequire,
  //       CreationDate:this.RetirementFundselect.creationdate
  //     })
  //   console.log('inside saveChildBirth');
  //   this.goalSelectService.saveRetairementFund(this.RETIREMENTSELECT).subscribe(data =>
  //     {
  //     alert('Data saved successfully');
  //     console.log('Data saved successfully');
  //   });
  // }
  //   saveNewGoal():void{
  //     this.NEWGOALSELECT.push({
  //       Goalname:this.NewGoalselect.goalname,
  //       Priority:this.NewGoalselect.priority,
  //       Price:this.NewGoalselect.price,
  //       Notes:this.NewGoalselect.notes,
  //       loanRequire:this.NewGoalselect.loanrequire,
  //       CreationDate:this.NewGoalselect.creationdate
  //     })
  //   console.log('inside saveChildBirth');
  //   this.goalSelectService.saveNewGoal(this.NEWGOALSELECT).subscribe(data =>
  //   {
  //     alert('Data saved successfully');
  //     console.log('Data saved successfully');
  //   });
  //   }
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
        console.log('in service', this.uid);
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
    console.log('in main ts', uid);
    this.goalSelectService.getgoalbyid(uid).subscribe(res => {
      console.log(res);
      this.output = res;
      console.log(this.output);
    });
  }
  changeValue(valid: boolean) {
    this.isValid = valid;
  }
}
