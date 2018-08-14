import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { SERVER_API_URL } from "app/app.constants";
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
} from "app/goal/goal-select/goalselect.model";
@Injectable()
export class GoalselectService {
  ServiceAPIParam: any;
  constructor(private http: HttpClient) {}
  saveHome(goalselect: any): Observable<any> {
    // console.log(goalselect);
    return this.http.post(SERVER_API_URL + "api/goal", goalselect);
  }
  saveEducation(EducationSelect: any): Observable<any> {
    // console.log(EducationSelect);
    return this.http.post(SERVER_API_URL + "api/goal", EducationSelect);
  }
  saveVehicle(VacationSelect: any): Observable<any> {
    // console.log(EducationSelect);
    return this.http.post(SERVER_API_URL + "api/goal", VacationSelect);
  }
  saveChildBirth(ChildBirthSelect: any): Observable<any> {
    // console.log(EducationSelect);
    return this.http.post(SERVER_API_URL + "api/goal", ChildBirthSelect);
  }
  saveMerrage(MerrageSelect: any): Observable<any> {
    // console.log(EducationSelect);
    return this.http.post(SERVER_API_URL + "api/goal", MerrageSelect);
  }
  saveBusiness(BusinessSelect: any): Observable<any> {
    // console.log(EducationSelect);
    return this.http.post(SERVER_API_URL + "api/goal", BusinessSelect);
  }
  saveFamilySupport(FamilySupportSelect: any): Observable<any> {
    // console.log(EducationSelect);
    return this.http.post(SERVER_API_URL + "api/goal", FamilySupportSelect);
  }
  saveVacation(VacationSelect: any): Observable<any> {
    // console.log(EducationSelect);
    return this.http.post(SERVER_API_URL + "api/goal", VacationSelect);
  }
  saveEmergencyFund(EmergencyFundSelect: any): Observable<any> {
    // console.log(EducationSelect);
    return this.http.post(SERVER_API_URL + "api/goal", EmergencyFundSelect);
  }
  saveRetirementFund(RetirementFundselect: any): Observable<any> {
    // console.log(EducationSelect);
    return this.http.post(SERVER_API_URL + "api/goal", RetirementFundselect);
  }
  saveNewGoal(NewGoalSelect: any): Observable<any> {
    // console.log(EducationSelect);
    return this.http.post(SERVER_API_URL + "api/goal", NewGoalSelect);
  }
  // in service
  public getgoal() {
    //   console.log('in goalselect service', id);
    //  this.ServiceAPIParam = 'api/goal' + '/' + id;
    //  return this.http.get(SERVER_API_URL + this.ServiceAPIParam).map((res)  => res);
    return this.http.get(SERVER_API_URL + "api/goal").map(res => res);
    //   }
  }
  public getgoalbyid(uid) {
    console.log("in service uid", uid);
    this.ServiceAPIParam = "api/goal" + "/" + uid;
    return this.http.get(SERVER_API_URL + this.ServiceAPIParam).map(res => res);
    // return this.http.get(SERVER_API_URL + 'api/goal/{uid}').map((res) => res);
  }
}
