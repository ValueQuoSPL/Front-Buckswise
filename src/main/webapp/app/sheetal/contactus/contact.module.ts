import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { RouterModule } from "@angular/router";
import { BuckswiseFrontEndSharedModule } from "app/shared";
import { CustomMaterialModule } from "app/custom-material.module";
import { MatInputModule } from "@angular/material";
import { FormsModule } from "@angular/forms";
import { contactRoute } from "../contactus/contact.route";
import { ContactusComponent } from "./contactus.component";
import { ContactService } from "./contact.service";
import { CustomDirectiveModule } from "app/shared/directive/directive.module";

@NgModule({
  imports: [
    FormsModule,
    BuckswiseFrontEndSharedModule,
    RouterModule.forRoot([contactRoute], { useHash: true }),
    CustomMaterialModule,
    MatInputModule,
    CustomDirectiveModule
  ],
  declarations: [ContactusComponent],
  providers: [ContactService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BuckswiseContactModule {}
