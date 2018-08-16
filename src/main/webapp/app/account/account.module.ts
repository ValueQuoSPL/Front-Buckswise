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

@NgModule({
    imports: [
        BuckswiseFrontEndSharedModule,
        RouterModule.forChild(accountState),
        CustomMaterialModule,
        CustomDirectiveModule
    ],
    declarations: [
        ActivateComponent,
        RegisterComponent,
        PasswordComponent,
        PasswordStrengthBarComponent,
        PasswordResetInitComponent,
        PasswordResetFinishComponent,
        SettingsComponent
    ],
    providers: [
        Register,
        ActivateService,
        PasswordService,
        PasswordResetInitService,
        PasswordResetFinishService,
        UserMgmtComponent,
        UserService
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BuckswiseFrontEndAccountModule {}
