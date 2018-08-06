import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SERVER_API_URL } from 'app/app.constants';
import { LifeInsurance, MedicalInsurance, Questionnaire } from 'app/risk/risk.model';
@Injectable()
export class RiskService {

  constructor(private http: HttpClient) { }
 public SaveLifeInsurance(lifeInsurance) {

     return this.http.post<LifeInsurance[]>(SERVER_API_URL + 'api/', lifeInsurance);
 }
 public SaveMedicalInsurance(medicalInsurance) {
    return this.http.post<MedicalInsurance[]>(SERVER_API_URL + 'api/', medicalInsurance);
 }
 public SaveQuestionnaire(questionnaire) {
    return this.http.post<Questionnaire[]>(SERVER_API_URL + 'api/', questionnaire);
 }
}
