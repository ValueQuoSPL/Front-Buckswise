import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BuckswiseFrontEndSharedModule, UserService } from 'app/shared';
import { UserMgmtComponent } from 'app/admin';

import {
  Register,
  ActivateService,
  PasswordService,
  PasswordResetInitService,
  PasswordResetFinishService,
  PasswordStrengthBarComponent,
  RegisterComponent,
  ActivateComponent,
  PasswordComponent,
  PasswordResetInitComponent,
  PasswordResetFinishComponent,
  SettingsComponent,
  accountState
} from 'app/account';
import { CustomMaterialModule } from 'app/custom-material.module';
import { CustomDirectiveModule } from 'app/shared/directive/directive.module';
import { RecaptchaModule } from 'ng-recaptcha';
import { MobileOtpComponent } from './mobile-otp/mobile-otp.component';
import { MyloginService } from 'app/account/mobile-otp/mylogin.service';

@NgModule({
  imports: [
    BuckswiseFrontEndSharedModule,
    RouterModule.forChild(accountState),
    CustomMaterialModule,
    CustomDirectiveModule,
    RecaptchaModule.forRoot()
  ],
  declarations: [
    ActivateComponent,
    RegisterComponent,
    PasswordComponent,
    PasswordStrengthBarComponent,
    PasswordResetInitComponent,
    PasswordResetFinishComponent,
    SettingsComponent,
    MobileOtpComponent
  ],
  providers: [
    Register,
    ActivateService,
    PasswordService,
    PasswordResetInitService,
    PasswordResetFinishService,
    UserMgmtComponent,
    UserService,
    MyloginService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BuckswiseFrontEndAccountModule {}
