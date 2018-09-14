import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BuckswiseFrontEndSharedModule } from 'app/shared';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { RiskService } from 'app/risk/risk.service';
import {
  LifeInsuranceComponent,
  MedicalInsuranceComponent,
  QuestionnaireComponent,
  lifeRoute,
  medicalRoute,
  questionnaireRoute,
  riskRoute
} from 'app/risk';
import { CustomMaterialModule } from 'app/custom-material.module';
import { RiskComponent } from 'app/risk/risk.component';

// import { QuestionnaireComponent } from './questinnaire/questionnaire.component';
@NgModule({
  imports: [
    BuckswiseFrontEndSharedModule,
    RouterModule.forRoot([riskRoute], { useHash: true }),
    BsDatepickerModule.forRoot(),
    CustomMaterialModule
  ],
  declarations: [
    LifeInsuranceComponent,
    MedicalInsuranceComponent,
    QuestionnaireComponent,
    RiskComponent
  ],
  providers: [NgbActiveModal, RiskService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BuckswiseFrontEndRiskModule {}
