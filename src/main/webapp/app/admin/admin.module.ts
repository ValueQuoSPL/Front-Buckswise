import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BuckswiseFrontEndSharedModule } from 'app/shared';
/* jhipster-needle-add-admin-module-import - JHipster will add admin modules imports here */

import {
  adminState,
  AuditsComponent,
  UserMgmtComponent,
  UserMgmtDetailComponent,
  UserMgmtUpdateComponent,
  UserMgmtDeleteDialogComponent,
  LogsComponent,
  JhiMetricsMonitoringModalComponent,
  JhiMetricsMonitoringComponent,
  JhiHealthModalComponent,
  JhiHealthCheckComponent,
  JhiConfigurationComponent,
  JhiDocsComponent,
  UserMgmtDialogComponent,
  UserDialogComponent,
  PromoCodeManageComponent
} from './';
import { CustomMaterialModule } from 'app/custom-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomDirectiveModule } from 'app/shared/directive/directive.module';
import { AppointmentManageComponent } from './appointment-manage/appointment-manage.component';

@NgModule({
  imports: [
    BuckswiseFrontEndSharedModule,
    RouterModule.forChild(adminState),
    CustomMaterialModule,
    CustomDirectiveModule,
    FormsModule,
    ReactiveFormsModule
    /* jhipster-needle-add-admin-module - JHipster will add admin modules here */
  ],
  declarations: [
    AuditsComponent,
    UserMgmtComponent,
    UserMgmtDetailComponent,
    UserMgmtDialogComponent,
    UserDialogComponent,
    UserMgmtUpdateComponent,
    UserMgmtDeleteDialogComponent,
    LogsComponent,
    JhiConfigurationComponent,
    JhiHealthCheckComponent,
    JhiHealthModalComponent,
    JhiDocsComponent,
    JhiMetricsMonitoringComponent,
    JhiMetricsMonitoringModalComponent,
    PromoCodeManageComponent,
    AppointmentManageComponent
  ],
  entryComponents: [
    UserMgmtDeleteDialogComponent,
    JhiHealthModalComponent,
    JhiMetricsMonitoringModalComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BuckswiseFrontEndAdminModule {}
