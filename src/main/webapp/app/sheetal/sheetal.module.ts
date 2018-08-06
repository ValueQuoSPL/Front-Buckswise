import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { RouterModule } from "@angular/router";
import { BuckswiseFrontEndSharedModule } from "../shared";
import { CustomMaterialModule } from "app/custom-material.module";
import { ReactiveFormsModule } from "@angular/forms";
import {
  MatToolbarModule,
  MatButtonModule,
  MatInputModule
} from "@angular/material";
import {
  MainComponent,
  mainRoute,
  ContactusComponent,
  contactRoute,
  RequestmeetingComponent,
  meetRoute,
  TaxComponent,
  taxRoute,
  sheetalState
} from "./";
import { FormsModule } from "@angular/forms";
import { GrossService } from "./main/Services/gross.service";
import { MeetService } from "./requestmeeting/meet.service";
import { ContactService } from "./contactus/contact.service";
import { EightydService } from "./main/Services/eightyd.service";
import { EightycService } from "./main/Services/eightyc.service";
import { HomeService } from "./main/Services/home.service";
import { OtherService } from "./main/Services/other.service";
@NgModule({
  imports: [
    FormsModule,
    BuckswiseFrontEndSharedModule,
    RouterModule.forChild(sheetalState),
    CustomMaterialModule,
    ReactiveFormsModule
  ],
  exports: [MatToolbarModule, MatButtonModule, MatInputModule],
  declarations: [
    MainComponent,
    ContactusComponent,
    RequestmeetingComponent,
    TaxComponent
  ],
  providers: [
    GrossService,
    EightycService,
    HomeService,
    EightydService,
    OtherService,
    MeetService,
    ContactService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BuckswiseAppSheetalModule {}
