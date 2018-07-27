import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HowItWorkComponent, SpendingComponent, SubscriptionComponent, pratikState} from 'app/pratik';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
// tslint:disable-next-line:max-line-length
import { IncomeService, UtilityService, HouseService, TravelService, MiscService, LoanService, LifeService, HealthService, GeneralService, CreditService } from 'app/pratik/spending/spending.service';

// material
// import { MatTabsModule} from '@angular/material/tabs';

@NgModule({
    imports: [
        FormsModule,
        BrowserModule, CommonModule,
        RouterModule.forChild(pratikState),
        BsDatepickerModule.forRoot(),
        // material
        // MatTabsModule
    ],
    declarations: [
        HowItWorkComponent,
        SpendingComponent,
        SubscriptionComponent
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
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BuckswiseFrontEndPratikModule {}
