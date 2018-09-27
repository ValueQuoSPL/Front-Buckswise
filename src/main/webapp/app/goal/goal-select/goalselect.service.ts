import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { SERVER_API_URL } from "../../app.constants";
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
} from "./goalselect.model";
@Injectable()
export class GoalselectService {
  ServiceAPIParam: any;
  constructor(private http: HttpClient) {}
  saveHome(goalselect: any): Observable<any> {
    // console.log(goalselect);
    return this.http.post(SERVER_API_URL + "api/goalset", goalselect);
  }
  // tslint:disable-next-line:no-shadowed-variable
  saveEducation(EducationSelect: any): Observable<any> {
    // console.log(EducationSelect);
    return this.http.post(SERVER_API_URL + "api/goalset", EducationSelect);
  }
  // tslint:disable-next-line:no-shadowed-variable
  saveVehicle(VacationSelect: any): Observable<any> {
    // console.log(EducationSelect);
    return this.http.post(SERVER_API_URL + "api/goalset", VacationSelect);
  }
  // tslint:disable-next-line:no-shadowed-variable
  saveChildBirth(ChildBirthSelect: any): Observable<any> {
    // console.log(EducationSelect);
    return this.http.post(SERVER_API_URL + "api/goalset", ChildBirthSelect);
  }
  // tslint:disable-next-line:no-shadowed-variable
  saveMerrage(MerrageSelect: any): Observable<any> {
    // console.log(EducationSelect);
    return this.http.post(SERVER_API_URL + "api/goalset", MerrageSelect);
  }
  // tslint:disable-next-line:no-shadowed-variable
  saveBusiness(BusinessSelect: any): Observable<any> {
    // console.log(EducationSelect);
    return this.http.post(SERVER_API_URL + "api/goalset", BusinessSelect);
  }
  // tslint:disable-next-line:no-shadowed-variable
  saveFamilySupport(FamilySupportSelect: any): Observable<any> {
    // console.log(EducationSelect);
    return this.http.post(SERVER_API_URL + "api/goalset", FamilySupportSelect);
  }
  // tslint:disable-next-line:no-shadowed-variable
  saveVacation(VacationSelect: any): Observable<any> {
    // console.log(EducationSelect);
    return this.http.post(SERVER_API_URL + "api/goalset", VacationSelect);
  }
  // tslint:disable-next-line:no-shadowed-variable
  saveEmergencyFund(EmergencyFundSelect: any): Observable<any> {
    // console.log(EducationSelect);
    return this.http.post(SERVER_API_URL + "api/goalset", EmergencyFundSelect);
  }
  saveRetirementFund(RetirementFundselect: any): Observable<any> {
    // console.log(EducationSelect);
    return this.http.post(SERVER_API_URL + "api/goalset", RetirementFundselect);
  }
  // tslint:disable-next-line:no-shadowed-variable
  saveNewGoal(NewGoalSelect: any): Observable<any> {
    // console.log(EducationSelect);
    return this.http.post(SERVER_API_URL + "api/goalset", NewGoalSelect);
  }
  // in service
  public getgoal() {
    //   console.log('in goalselect service', id);
    //  this.ServiceAPIParam = 'api/goal' + '/' + id;
    //  return this.http.get(SERVER_API_URL + this.ServiceAPIParam).map((res)  => res);
    return this.http.get(SERVER_API_URL + "api/goalset").map(res => res);
    //   }
  }
  public getgoalbyid(uid) {
    console.log("in service uid", uid);
    this.ServiceAPIParam = "api/goalset" + "/" + uid;
    return this.http.get(SERVER_API_URL + this.ServiceAPIParam).map(res => res);
    // return this.http.get(SERVER_API_URL + 'api/goal/{uid}').map((res) => res);
  }
  public getGoalbyId(commonid) {
    this.ServiceAPIParam = "api/goalsetbyid" + "/" + commonid;
    return this.http.get(SERVER_API_URL + this.ServiceAPIParam);
  }
  public UpdateGoal(goalArray) {
    return this.http.put<GoalSelect[]>(
      SERVER_API_URL + "api/putgoal",
      goalArray
    );
  }

  public PostMapping(data) {
    const url = SERVER_API_URL + "api/assetmappings";
    return this.http.post(url, data);
  }
  public GetMapping() {
    const url = SERVER_API_URL + "api/assetmap";
    return this.http.get(url);
  }

  public DeleteMapping(id) {
    // console.log('deleting data', id);
    const url = SERVER_API_URL + "api/delete/" + id;
    console.log(url);
    return this.http.delete(url);
  }
  public getMutualFund(uid) {
    console.log("in getMutualFundByUid service uid", uid);
    this.ServiceAPIParam = "api/mlfnd" + "/" + uid;
    return this.http.get(SERVER_API_URL + this.ServiceAPIParam);
  }
}
