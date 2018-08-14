import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FamilyComponent, familyRoute } from "app/family";
import { FamilyserviceService } from "app/family/familyservice.service";
import { BsDatepickerModule } from "ngx-bootstrap/datepicker";
import { FamilyprofileComponent } from "../family/familyprofile/familyyprofile.component";
import { FamilysprofileComponent } from "../family/familyprofile/familyprofile.component";
import { CommonModule } from "@angular/common";
import { AssumptionComponent } from "././assumption/assumption.component";
import { MyprofileComponent } from "../family/myprofile/myprofile.component";

@NgModule({
  imports: [
    RouterModule.forRoot([familyRoute], { useHash: true }),
    FormsModule,
    CommonModule,
    BsDatepickerModule.forRoot()
  ],
  declarations: [
    FamilyComponent,
    FamilyprofileComponent,
    AssumptionComponent,
    MyprofileComponent,
    FamilysprofileComponent
  ],
  entryComponents: [],
  providers: [FamilyserviceService]
})
export class FamilyModule {}
