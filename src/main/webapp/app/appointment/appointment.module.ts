import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { RouterModule, Route } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BuckswiseFrontEndSharedModule } from "../shared";
import { BsDatepickerModule } from "ngx-bootstrap/datepicker";
import { TimepickerModule } from "ngx-bootstrap/Timepicker";
import { CustomMaterialModule } from "../custom-material.module";
import { DraggableModule } from "app/shared/draggable/draggable.module";
import { AppointmentComponent, appointRoot } from "./";
import { CommonModule } from "@angular/common";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

@NgModule({
  imports: [
    RouterModule.forRoot([appointRoot], { useHash: true }),
    FormsModule,
    CommonModule,
    CustomMaterialModule,
    DraggableModule,
    // BsDatepickerModule.forRoot(),
    TimepickerModule.forRoot()
  ],
  declarations: [AppointmentComponent],
  entryComponents: [],
  providers: [NgbActiveModal]
})
export class AppointmentModule {}
