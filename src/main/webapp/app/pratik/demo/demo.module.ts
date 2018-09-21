import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { RouterModule } from "@angular/router";
import { BuckswiseFrontEndSharedModule } from "app/shared";

import { DemoComponent } from "./demo.component";
import { DemoRoutingModule } from "./demo-routing.module";
import { MyloginService } from "./mylogin.service";
import { WidgetModule } from "./widget/widget.module";
import {
  MaterialComponent,
  IncomeDialogComponent
} from "./material/material.component";
// import { MaterialModule } from 'app/material.module';
import { CustomMaterialModule } from "app/custom-material.module";
import { NgBootstrapComponent } from "./ng-bootstrap/ng-bootstrap.component";
import { SimpleComponent } from "./simple/simple.component";
import { MatNavbarComponent } from "./mat-navbar/mat-navbar.component";
import { MobileOtpComponent } from "./mobile-otp/mobile-otp.component";

@NgModule({
  imports: [
    NgbModule.forRoot(),
    // MaterialModule,
    CustomMaterialModule,
    BuckswiseFrontEndSharedModule,
    DemoRoutingModule,
    WidgetModule
  ],
  declarations: [
    DemoComponent,
    MaterialComponent,
    NgBootstrapComponent,
    IncomeDialogComponent,
    SimpleComponent,
    MatNavbarComponent,
    MobileOtpComponent
  ],
  entryComponents: [MaterialComponent, IncomeDialogComponent],
  providers: [MyloginService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BuckswiseFrontEndDemoModule {}
