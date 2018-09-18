import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { RouterModule } from "@angular/router";
import { BuckswiseFrontEndSharedModule } from "app/shared";
import { CustomMaterialModule } from "app/custom-material.module";
import { MatInputModule } from "@angular/material";
import { FormsModule } from "@angular/forms";
import { contactRoute } from "../contactus/contact.route";
import { ContactusComponent } from "./contactus.component";
import { ContactService } from "./contact.service";

@NgModule({
  imports: [
    FormsModule,
    BuckswiseFrontEndSharedModule,
    RouterModule.forRoot([contactRoute], { useHash: true }),
    CustomMaterialModule,
    MatInputModule
  ],
  declarations: [ContactusComponent],
  providers: [ContactService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BuckswiseContactModule {}
