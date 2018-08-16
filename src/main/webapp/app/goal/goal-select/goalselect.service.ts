import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from 'app/app.constants';
import {
  GoalSelect,
  EducationSelect,
  VehicleSelect,
  ChildBirthSelect,
  MerrageSelect,
  NewGoalSelect,
  RetirementFundSelect,
  EmergencyFundSelect,
  VacationSelect,
  FamilySupportSelect,
  BusinessSelect
} from 'app/goal/goal-select/goalselect.model';
@Injectable()
export class GoalselectService {
  ServiceAPIParam: any;
  constructor(private http: HttpClient) {}
  saveHome(goalselect: any): Observable<any> {
    // console.log(goalselect);
    return this.http.post(SERVER_API_URL + 'api/goal', goalselect);
  }
  // tslint:disable-next-line:no-shadowed-variable
  saveEducation(EducationSelect): Observable<any> {
    // console.log(EducationSelect);
    return this.http.post(SERVER_API_URL + 'api/goal', EducationSelect);
  }
    // tslint:disable-next-line:no-shadowed-variable
  saveVehicle(VacationSelect: any): Observable<any> {
    // console.log(EducationSelect);
    return this.http.post(SERVER_API_URL + 'api/goal', VacationSelect);
  }
    // tslint:disable-next-line:no-shadowed-variable
  saveChildBirth(ChildBirthSelect: any): Observable<any> {
    // console.log(EducationSelect);
    return this.http.post(SERVER_API_URL + 'api/goal', ChildBirthSelect);
  }
    // tslint:disable-next-line:no-shadowed-variable
  saveMerrage(MerrageSelect: any): Observable<any> {
    // console.log(EducationSelect);
    return this.http.post(SERVER_API_URL + 'api/goal', MerrageSelect);
  }
    // tslint:disable-next-line:no-shadowed-variable
  saveBusiness(BusinessSelect: any): Observable<any> {
    // console.log(EducationSelect);
    return this.http.post(SERVER_API_URL + 'api/goal', BusinessSelect);
  }
    // tslint:disable-next-line:no-shadowed-variable
  saveFamilySupport(FamilySupportSelect: any): Observable<any> {
    // console.log(EducationSelect);
    return this.http.post(SERVER_API_URL + 'api/goal', FamilySupportSelect);
  }
    // tslint:disable-next-line:no-shadowed-variable
  saveVacation(VacationSelect: any): Observable<any> {
    // console.log(EducationSelect);
    return this.http.post(SERVER_API_URL + 'api/goal', VacationSelect);
  }
    // tslint:disable-next-line:no-shadowed-variable
  saveEmergencyFund(EmergencyFundSelect: any): Observable<any> {
    // console.log(EducationSelect);
    return this.http.post(SERVER_API_URL + 'api/goal', EmergencyFundSelect);
  }
  saveRetirementFund(RetirementFundselect: any): Observable<any> {
    // console.log(EducationSelect);
    return this.http.post(SERVER_API_URL + 'api/goal', RetirementFundselect);
  }
    // tslint:disable-next-line:no-shadowed-variable
  saveNewGoal(NewGoalSelect: any): Observable<any> {
    // console.log(EducationSelect);
    return this.http.post(SERVER_API_URL + 'api/goal', NewGoalSelect);
  }
  // in service
  public getgoal() {
    //   console.log('in goalselect service', id);
    //  this.ServiceAPIParam = 'api/goal' + '/' + id;
    //  return this.http.get(SERVER_API_URL + this.ServiceAPIParam).map((res)  => res);
    return this.http.get(SERVER_API_URL + 'api/goal').map(res => res);
    //   }
  }
  public getgoalbyid(uid) {
    console.log('in service uid', uid);
    this.ServiceAPIParam = 'api/goal' + '/' + uid;
    return this.http.get(SERVER_API_URL + this.ServiceAPIParam).map(res => res);
    // return this.http.get(SERVER_API_URL + 'api/goal/{uid}').map((res) => res);
  }
}
