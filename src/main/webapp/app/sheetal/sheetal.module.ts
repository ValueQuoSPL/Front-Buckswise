import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BuckswiseFrontEndSharedModule } from 'app/shared';

import { MainComponent,
    mainRoute,
    ContactusComponent,
    contactRoute,
    RequestmeetingComponent,
    meetRoute,
    TaxComponent,
    taxRoute,
    sheetalState,
} from 'app/sheetal';
import { FormsModule } from '@angular/forms';
import { GrossService } from 'app/sheetal/main/Services/gross.service';
import { MeetService } from 'app/sheetal/requestmeeting/meet.service';
import { ContactService } from 'app/sheetal/contactus/contact.service';
import { EightydService } from 'app/sheetal/main/Services/eightyd.service';
import { EightycService } from 'app/sheetal/main/Services/eightyc.service';
import { HomeService } from 'app/sheetal/main/Services/home.service';
import { OtherService } from 'app/sheetal/main/Services/other.service';

@NgModule({
    imports: [
        FormsModule,
        BuckswiseFrontEndSharedModule,
        RouterModule.forChild(sheetalState)
    ],
    declarations: [
        MainComponent,
        ContactusComponent,
        RequestmeetingComponent,
        TaxComponent,
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
