import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HowItWorkComponent, SpendingComponent, SubscriptionComponent, pratikState} from 'app/pratik';
import { CommonModule } from '@angular/common';

import { IncomeService, UtilityService, HouseService, TravelService, MiscService, LoanService,
        LifeService, HealthService, GeneralService, CreditService } from 'app/pratik/spending/spending.service';

// material
import { CustomMaterialModule } from 'app/custom-material.module';
// ng-bootstrap
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// ngx-bootstrap
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { CustomDirectiveModule } from 'app/shared/directive/directive.module';

@NgModule({
    imports: [
        BrowserModule, FormsModule, CommonModule,
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
        // IncomeDialog
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
        CreditService
    ],
    entryComponents: [ SpendingComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BuckswiseFrontEndPratikModule {}
