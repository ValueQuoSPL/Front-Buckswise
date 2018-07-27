import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from 'app/app.constants';
// tslint:disable-next-line:max-line-length
import { GoalSelect, EducationSelect, VehicleSelect, ChildBirthSelect, MerrageSelect, NewGoalSelect, RetirementFundSelect, EmergencyFundSelect, VacationSelect, FamilySupportSelect, BusinessSelect} from 'app/goal/goal-select/goalselect.model';
@Injectable()
export class GoalselectService {

  constructor(private http: HttpClient) {

   }
  public saveHome(GOALSELECT: any[]) {
    // console.log(goalselect.goalname);
    // console.log(goalselect.priority);
    // console.log(goalselect.price);
    // console.log(goalselect.notes);
    // console.log(goalselect.loanrequire);
    // console.log(goalselect.creationdate);
    // return this.http.post<EducationSelect[]>(SERVER_API_URL + 'api/',Goalselect);
    return this.http.post('https://myproject-577cd.firebaseio.com/data.json', GOALSELECT);
  }

  public saveEducation(EDUCATIONSELECT: any[]) {
    // console.log(Educationselect.goalname);
    // console.log(Educationselect.priority);
    // console.log(Educationselect.price);
    // console.log(Educationselect.duration);
    // console.log(Educationselect.notes);
    // console.log(Educationselect.loanrequire);
    // console.log(Educationselect.creationdate);

    // return this.http.post<EducationSelect[]>(SERVER_API_URL + 'api/',Educationselect);
    return this.http.post('https://myproject-577cd.firebaseio.com/data.json', EDUCATIONSELECT);
  }
  public saveVehicle(VEHICLESELECT) {
    // console.log(Vehicleselect.goalname);
    // console.log(Vehicleselect.priority);
    // console.log(Vehicleselect.price);
    // console.log(Vehicleselect.notes);
    // console.log(Vehicleselect.loanrequire);
    // console.log(Vehicleselect.creationdate);

    // return this.http.post<VehicleSelect[]>(SERVER_API_URL + 'api/',Vehicleselect);
    return this.http.post('https://myproject-577cd.firebaseio.com/data.json', VEHICLESELECT);
  }
  public saveChildbirth(CHILDBIRTHSELECT) {
    // console.log(Childbirthselect.goalname);
    // console.log(Childbirthselect.priority);
    // console.log(Childbirthselect.price);
    // console.log(Childbirthselect.notes);
    // console.log(Childbirthselect.loanrequire);
    // console.log(Childbirthselect.creationdate);

    // return this.http.post<ChildBirthSelect[]>(SERVER_API_URL + 'api/',Childbirthselect);
    return this.http.post('https://myproject-577cd.firebaseio.com/data.json', CHILDBIRTHSELECT);
  }
  public saveMerrage(MERRAGESELECT) {
    // console.log(MerrageSelect.goalname);
    // console.log(MerrageSelect.priority);
    // console.log(MerrageSelect.price);
    // console.log(MerrageSelect.notes);
    // console.log(MerrageSelect.loanrequire);
    // console.log(MerrageSelect.creationdate);

   // return this.http.post<MerrageSelect[]>(SERVER_API_URL + 'api/',MerrageSelect);
   return this.http.post('https://myproject-577cd.firebaseio.com/data.json', MERRAGESELECT);
  }
  public saveBusiness(BUSINESSSELECT) {
    // console.log(Businessselect.goalname);
    // console.log(Businessselect.priority);
    // console.log(Businessselect.price);
    // console.log(Businessselect.notes);
    // console.log(Businessselect.loanrequire);
    // console.log(Businessselect.creationdate);

    // return this.http.post<BusinessSelect[]>(SERVER_API_URL + 'api/',Businessselect);
    return this.http.post('https://myproject-577cd.firebaseio.com/data.json', BUSINESSSELECT);
  }
  public saveFamilysup(FAMILYSUPSELECT) {
    // console.log(FamilySupportselect.goalname);
    // console.log(FamilySupportselect.priority);
    // console.log(FamilySupportselect.price);
    // console.log(FamilySupportselect.notes);
    // console.log(FamilySupportselect.loanrequire);
    // console.log(FamilySupportselect.creationdate);

    // return this.http.post<FamilySupportSelect[]>(SERVER_API_URL + 'api/',FamilySupportselect);
    return this.http.post('https://myproject-577cd.firebaseio.com/data.json', FAMILYSUPSELECT);
  }
  public saveVacation( VACATIONSELECT) {
    // console.log( Vacationselect.goalname);
    // console.log( Vacationselect.priority);
    // console.log( Vacationselect.price);
    // console.log( Vacationselect.notes);
    // console.log( Vacationselect.loanrequire);
    // console.log( Vacationselect.creationdate);

   // return this.http.post<VacationSelect[]>(SERVER_API_URL + 'api/',Vacationselect);
   return this.http.post('https://myproject-577cd.firebaseio.com/data.json', VACATIONSELECT);
  }
  public  saveEmergencyFund(EMERGENCYSELECT) {
    // console.log(EmergencyFundselect.goalname);
    // console.log(EmergencyFundselect.priority);
    // console.log(EmergencyFundselect.price);
    // console.log(EmergencyFundselect.notes);
    // console.log(EmergencyFundselect.loanrequire);
    // console.log(EmergencyFundselect.creationdate);

    // return this.http.post<EmergencyFundSelect[]>(SERVER_API_URL + 'api/',EmergencyFundselect);
    return this.http.post('https://myproject-577cd.firebaseio.com/data.json', EMERGENCYSELECT);
  }
  public saveRetairementFund(RETIREMENTSELECT) {
    // console.log(RetirementFundselect.goalname);
    // console.log(RetirementFundselect.priority);
    // console.log(RetirementFundselect.price);
    // console.log(RetirementFundselect.duration);
    // console.log(RetirementFundselect.notes);
    // console.log(RetirementFundselect.loanrequire);
    // console.log(RetirementFundselect.creationdate);

    // return this.http.post<RetirementFundSelect[]>(SERVER_API_URL + 'api/',RetirementFundselect);
    return this.http.post('https://myproject-577cd.firebaseio.com/data.json', RETIREMENTSELECT);
  }
  public saveNewGoal(NEWGOALSELECT) {
    // console.log(NewGoalselect.goalname);
    // console.log(NewGoalselect.priority);
    // console.log(NewGoalselect.price);
    // console.log(NewGoalselect.notes);
    // console.log(NewGoalselect.loantype);
    // console.log(NewGoalselect.loanrequire);
    // console.log(NewGoalselect.creationdate);

    // return this.http.post<NewGoalSelect[]>(SERVER_API_URL + 'api/',NewGoalselect);
    return this.http.post('https://myproject-577cd.firebaseio.com/data.json', NEWGOALSELECT);
  }

}
