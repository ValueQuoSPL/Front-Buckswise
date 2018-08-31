import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import {
  IncomeService,
  UtilityService,
  HouseService,
  TravelService,
  MiscService,
  LoanService,
  LifeService,
  HealthService,
  GeneralService,
  CreditService
} from 'app/pratik/spending/spending.service';

import {
  HowItWorkComponent,
  SpendingComponent,
  SubscriptionComponent,
  CanDeactivateGuard,
  pratikState
} from 'app/pratik';

import { CustomMaterialModule } from 'app/custom-material.module';
import { CustomDirectiveModule } from 'app/shared/directive/directive.module';
import { IncomeComponent } from 'app/pratik/income/income.component';
import { UtilityComponent } from './spending/utility/utility.component';
import { HouseholdComponent } from './spending/household/household.component';
import { LoanComponent } from './spending/loan/loan.component';
import { CreditComponent } from './spending/credit/credit.component';
import { TravelComponent } from './spending/travel/travel.component';
import { MiscComponent } from './spending/misc/misc.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    CommonModule,
    RouterModule.forChild(pratikState),
    BsDatepickerModule.forRoot(),
    ReactiveFormsModule,
    CustomDirectiveModule,
    // material
    CustomMaterialModule,
    NgbModule
  ],
  declarations: [
    HowItWorkComponent,
    SpendingComponent,
    SubscriptionComponent,
    IncomeComponent,
    UtilityComponent,
    HouseholdComponent,
    LoanComponent,
    CreditComponent,
    TravelComponent,
    MiscComponent
  ],
  providers: [
    IncomeService,
    UtilityService,
    HouseService,
    TravelService,
    MiscService,
    LoanService,
    LifeService,
    HealthService,
    GeneralService,
    CreditService,
    CanDeactivateGuard
  ],
  entryComponents: [SpendingComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BuckswiseFrontEndPratikModule {}
