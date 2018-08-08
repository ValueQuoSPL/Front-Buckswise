import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { BuckswiseFrontEndSharedModule } from 'app/shared';

import { DemoComponent } from 'app/demo/demo.component';
import { DemoRoutingModule } from 'app/demo/demo-routing.module';
import { MyloginService } from 'app/demo/mylogin.service';
import { WidgetModule } from 'app/demo/widget/widget.module';
import { MaterialComponent, IncomeDialogComponent } from 'app/demo/material/material.component';
// import { MaterialModule } from 'app/material.module';
import { CustomMaterialModule } from 'app/custom-material.module';
import { NgBootstrapComponent } from 'app/demo/ng-bootstrap/ng-bootstrap.component';
import { SimpleComponent } from 'app/demo/simple/simple.component';
import { MatNavbarComponent } from 'app/demo/mat-navbar/mat-navbar.component';
import { MobileOtpComponent } from 'app/demo/mobile-otp/mobile-otp.component';

@NgModule({
    imports: [
        NgbModule.forRoot(),
        // MaterialModule,
        CustomMaterialModule,
        BuckswiseFrontEndSharedModule,
        DemoRoutingModule,
        WidgetModule,
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
    entryComponents: [MaterialComponent, IncomeDialogComponent
        ],
    providers: [
        MyloginService
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BuckswiseFrontEndDemoModule {}
