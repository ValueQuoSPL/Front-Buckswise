import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { RouterModule, Route } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BuckswiseFrontEndSharedModule } from "../shared";
import { BsDatepickerModule } from "ngx-bootstrap/datepicker";
// import { goalSelectRoute } from './goal-select/goal-select.route';
//  import { GoalComponent, goalRoot } from './';
// import { GoalSelectComponent } from './Goal-select/goalselect.component';
// import { GoalAddComponent } from './Goal-AddButton/goalAddButton.component';
import { GoalselectService } from "./goal-select/goalselect.service";
import { CustomMaterialModule } from "../custom-material.module";
import { GoalComponent, goalRoot } from "./";
import { GoalAddButtonComponent } from "./goal-add-button/goal-add-button.component";
import { GoalSelectComponent } from "./goal-select/goal-select.component";
import { CommonModule } from "@angular/common";
import { NgbActiveModal, NgbModule } from "@ng-bootstrap/ng-bootstrap";

@NgModule({
  imports: [
    RouterModule.forRoot([goalRoot], { useHash: true }),
    // RouterModule.forRoot([ goalSelectRoute ], { useHash: true }),
    BsDatepickerModule.forRoot(),
    FormsModule,
    CommonModule,
    CustomMaterialModule,
    NgbModule
  ],
  declarations: [
    GoalComponent,
    GoalAddButtonComponent,
    GoalSelectComponent
    // GoalSelectComponent,
    // GoalAddComponent
  ],
  entryComponents: [],
  providers: [GoalselectService, NgbActiveModal]
})
export class GoalModule {}
// import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
// import { RouterModule } from '@angular/router';

// import { BuckswiseFrontEndSharedModule } from '../shared';

// import {
//     GoalComponent,
//     GoalSelectComponent,
//     accountState
// } from './';

// @NgModule({
//     imports: [
//         BuckswiseFrontEndSharedModule,
//         RouterModule.forChild(accountState)
//     ],
//     declarations: [
//         GoalComponent,
//         GoalSelectComponent
//     ],
//     providers: [
//            ],
//     schemas: [CUSTOM_ELEMENTS_SCHEMA]
// })
// export class GoalModule {}
