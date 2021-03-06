import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { DatePipe } from '@angular/common';

import {
  BuckswiseFrontEndSharedLibsModule,
  BuckswiseFrontEndSharedCommonModule,
  CSRFService,
  AuthServerProvider,
  AccountService,
  UserService,
  StateStorageService,
  LoginService,
  LoginModalService,
  JhiLoginModalComponent,
  Principal,
  HasAnyAuthorityDirective
} from './';
import { CustomMaterialModule } from 'app/custom-material.module';

@NgModule({
  imports: [
    BuckswiseFrontEndSharedLibsModule,
    BuckswiseFrontEndSharedCommonModule,
    CustomMaterialModule
  ],
  declarations: [JhiLoginModalComponent, HasAnyAuthorityDirective],
  providers: [
    LoginService,
    LoginModalService,
    AccountService,
    StateStorageService,
    Principal,
    CSRFService,
    AuthServerProvider,
    UserService,
    DatePipe
  ],
  entryComponents: [JhiLoginModalComponent],
  exports: [
    BuckswiseFrontEndSharedCommonModule,
    JhiLoginModalComponent,
    HasAnyAuthorityDirective,
    DatePipe
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BuckswiseFrontEndSharedModule {}
