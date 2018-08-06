import { Component, OnInit } from '@angular/core';
import { Router, Route } from '@angular/router';
import { GoalselectService } from 'app/goal/goal-select/goalselect.service';
// tslint:disable-next-line:max-line-length
import { GoalSelect, EducationSelect, VehicleSelect, ChildBirthSelect, MerrageSelect, BusinessSelect, FamilySupportSelect, VacationSelect, EmergencyFundSelect, RetirementFundSelect, NewGoalSelect} from 'app/goal/goal-select/goalselect.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component( {
  selector: 'jhi-goal-select',
  templateUrl: './goal-select.component.html',
  styles: []
})
export class GoalSelectComponent implements OnInit  {
goalselect: GoalSelect  =  new GoalSelect();
Educationselect: EducationSelect =  new EducationSelect();
Vehicleselect: VehicleSelect = new VehicleSelect();
Childbirthselect: ChildBirthSelect = new ChildBirthSelect();
Merrageselect: MerrageSelect = new MerrageSelect();
Businessselect: BusinessSelect = new BusinessSelect();
FamilySupportselect: FamilySupportSelect = new FamilySupportSelect();
Vacationselect: VacationSelect = new VacationSelect();
EmergencyFundselect: EmergencyFundSelect = new EmergencyFundSelect();
RetirementFundselect: RetirementFundSelect = new RetirementFundSelect();
NewGoalselect: NewGoalSelect = new NewGoalSelect();
// goalselectArray  =  [];
HOMESELECT = [];
EDUCATIONSELECT = [];
VEHICLESELECT = [];
CHILDBIRTHSELECT = [];
MERRAGESELECT = [];
BUSINESSSELECT = [];
FAMILYSUPSELECT = [];
VACATIONSELECT = [];
EMERGENCYSELECT = [];
RETIREMENTSELECT = [];
NEWGOALSELECT = [];
constructor(private router: Router,
private goalSelectService: GoalselectService, private ActiveModal: NgbActiveModal) {
// this.EducationSelect  =  new EducationSelect('Educationselect');
}
ngOnInit()  {}
  // clear()
  //  {
  //   this.ActiveModal.dismiss('cancle');
  // }
  // Add() {
  //   // this.router.navigateByUrl('goalAdd');

  // }
  saveHome(): void  {
    // this.goalselectArray.push( {
    //   goalname: this.goalselect.goalname,
    //   priority: this.goalselect.priority,
    //   price: this.goalselect.price,
    //   notes: this.goalselect.notes,
    //   loanrequire: this.goalselect.loanrequire,
    //   creationdate: this.goalselect.creationdate,
    // });
    this.HOMESELECT.push( {
     Goalname: this.goalselect.goalname,
     Priority: this.goalselect.priority,
     Price: this.goalselect.price,
     Notes: this.goalselect.notes,
     loanRequire: this.goalselect.loanrequire,
     CreationDate: this.goalselect.creationdate
    });
    console.log('inside saveHome details');
    this.goalSelectService.saveHome(this.HOMESELECT).subscribe((data)  =>  {
      alert('Data saved successfully');
      console.log('Data saved successfully');
    });
  }
  saveEducation(): void {
    this.EDUCATIONSELECT.push( {
      Goalname: this.Educationselect.goalname,
      Priority: this.Educationselect.priority,
      Price: this.Educationselect.price,
      Notes: this.Educationselect.notes,
      loanRequire: this.Educationselect.loanrequire,
      CreationDate: this.Educationselect.creationdate
    });

    console.log('inside saveEducation');
    this.goalSelectService.saveEducation(this.EDUCATIONSELECT).subscribe((data)  =>     {
      alert('Data saved successfully');
      console.log('Data saved successfully');
    });
  }
  saveVehicle(): void   {
    this.VEHICLESELECT.push( {
      Goalname: this.Vehicleselect.goalname,
      Priority: this.Vehicleselect.priority,
      Price: this.Vehicleselect.price,
      Notes: this.Vehicleselect.notes,
      loanRequire: this.Vehicleselect.loanrequire,
      CreationDate: this.Vehicleselect.creationdate
    });
  console.log('inside saveVehicle');
  this.goalSelectService.saveVehicle(this.VEHICLESELECT).subscribe((data)  => {
    alert('Data saved successfully');
    console.log('Data saved successfully');
  });
}
saveChildbirth(): void {
  this.CHILDBIRTHSELECT.push( {
    Goalname: this.Childbirthselect.goalname,
    Priority: this.Childbirthselect.priority,
    Price: this.Childbirthselect.price,
    Notes: this.Childbirthselect.notes,
    loanRequire: this.Childbirthselect.loanrequire,
    CreationDate: this.Childbirthselect.creationdate
  });
  console.log('inside saveChildBirth');
  this.goalSelectService.saveChildbirth(this.CHILDBIRTHSELECT).subscribe((data)  => {
    alert('Data saved successfully');
    console.log('Data saved successfully');
  });
}
  saveMerrage(): void {
    this.MERRAGESELECT.push( {
      Goalname: this.Merrageselect.goalname,
      Priority: this.Merrageselect.priority,
      Price: this.Merrageselect.price,
      Notes: this.Merrageselect.notes,
      loanRequire: this.Merrageselect.loanrequire,
      CreationDate: this.Merrageselect.creationdate
    });
  console.log('inside saveChildBirth');
  this.goalSelectService.saveMerrage(this.MERRAGESELECT).subscribe((data)  => {
    alert('Data saved successfully');
    console.log('Data saved successfully');
    });
  }
  saveBusiness(): void {
    this.BUSINESSSELECT.push( {
      Goalname: this.Businessselect.goalname,
      Priority: this.Businessselect.priority,
      Price: this.Businessselect.price,
      Notes: this.Businessselect.notes,
      loanRequire: this.Businessselect.loanrequire,
      CreationDate: this.Businessselect.creationdate
    });
  console.log('inside saveChildBirth');
  this.goalSelectService.saveBusiness(this.BUSINESSSELECT).subscribe((data)  => {
    alert('Data saved successfully');
    console.log('Data saved successfully');
  });
}
saveFamilysup(): void {
  this.FAMILYSUPSELECT.push( {
    Goalname: this.FamilySupportselect.goalname,
    Priority: this.FamilySupportselect.priority,
    Price: this.FamilySupportselect.price,
    Notes: this.FamilySupportselect.notes,
    loanRequire: this.FamilySupportselect.loanrequire,
    CreationDate: this.FamilySupportselect.creationdate
  });
console.log('inside saveChildBirth');
this.goalSelectService.saveFamilysup(this.FAMILYSUPSELECT).subscribe((data)  => {
    alert('Data saved successfully');
    console.log('Data saved successfully');
  });
}
saveVacation(): void {
    this.VACATIONSELECT.push( {
      Goalname: this.Vacationselect.goalname,
      Priority: this.Vacationselect.priority,
      Price: this.Vacationselect.price,
      Notes: this.Vacationselect.notes,
      loanRequire: this.Vacationselect.loanrequire,
      CreationDate: this.Vacationselect.creationdate
    });
  console.log('inside saveChildBirth');
  this.goalSelectService.saveVacation(this.VACATIONSELECT).subscribe((data)  => {
    alert('Data saved successfully');
    console.log('Data saved successfully');
  });
}
  saveEmergencyFund(): void {
    this.EMERGENCYSELECT.push( {
      Goalname: this.EmergencyFundselect.goalname,
      Priority: this.EmergencyFundselect.priority,
      Price: this.EmergencyFundselect.price,
      Notes: this.EmergencyFundselect.notes,
      loanRequire: this.EmergencyFundselect.loanrequire,
      CreationDate: this.EmergencyFundselect.creationdate
    });
  console.log('inside saveChildBirth');
  this.goalSelectService.saveEmergencyFund(this.EMERGENCYSELECT).subscribe((data)  => {
    alert('Data saved successfully');
    console.log('Data saved successfully');
  });
}
  saveRetairementFund(): void {
    this.RETIREMENTSELECT.push( {
      Goalname: this.RetirementFundselect.goalname,
      Priority: this.RetirementFundselect.priority,
      Price: this.RetirementFundselect.price,
      Notes: this.RetirementFundselect.notes,
      Duration: this.RetirementFundselect.duration,
      loanRequire: this.RetirementFundselect.loanrequire,
      CreationDate: this.RetirementFundselect.creationdate
    });
  console.log('inside saveChildBirth');
  this.goalSelectService.saveRetairementFund(this.RETIREMENTSELECT).subscribe((data)  => {
    alert('Data saved successfully');
    console.log('Data saved successfully');
  });
}
  saveNewGoal(): void {
    this.NEWGOALSELECT.push( {
      Goalname: this.NewGoalselect.goalname,
      Priority: this.NewGoalselect.priority,
      Price: this.NewGoalselect.price,
      Notes: this.NewGoalselect.notes,
      loanRequire: this.NewGoalselect.loanrequire,
      CreationDate: this.NewGoalselect.creationdate
    });
  console.log('inside saveChildBirth');
  this.goalSelectService.saveNewGoal(this.NEWGOALSELECT).subscribe((data)  => {
    alert('Data saved successfully');
    console.log('Data saved successfully');
  });
  }
}
