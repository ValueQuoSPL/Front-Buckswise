import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BuckswiseFrontEndSharedModule } from 'app/shared';
import { CustomMaterialModule } from 'app/custom-material.module';
import { MatInputModule } from '@angular/material';
import { SheetalComponent } from '.././sheetal/sheetal.component';

import {
  MainComponent,
  mainRoute,
  ContactusComponent,
  contactRoute,
  RequestmeetingComponent,
  meetRoute,
  taxRoute
} from 'app/sheetal';
import { FormsModule } from '@angular/forms';
import { MeetService } from 'app/sheetal/requestmeeting/meet.service';
import { ContactService } from 'app/sheetal/contactus/contact.service';
import { AdviceComponent } from './advice/advice.component';

@NgModule({
  imports: [
    FormsModule,
    BuckswiseFrontEndSharedModule,
    CustomMaterialModule,
    MatInputModule
  ],
  declarations: [
    MainComponent,
    ContactusComponent,
    RequestmeetingComponent,
    AdviceComponent,
    SheetalComponent
  ],
  providers: [MeetService, ContactService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BuckswiseAppSheetalModule {}
