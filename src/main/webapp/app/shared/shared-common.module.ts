import { NgModule, LOCALE_ID } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { registerLocaleData } from '@angular/common';
import locale from '@angular/common/locales/en';

import {
    BuckswiseFrontEndSharedLibsModule,
    JhiAlertComponent,
    JhiAlertErrorComponent
} from 'app/shared';

@NgModule({
    imports: [
        BuckswiseFrontEndSharedLibsModule
    ],
    declarations: [
        JhiAlertComponent,
        JhiAlertErrorComponent
    ],
    providers: [
        Title,
        {
            provide: LOCALE_ID,
            useValue: 'en'
        },
    ],
    exports: [
        BuckswiseFrontEndSharedLibsModule,
        JhiAlertComponent,
        JhiAlertErrorComponent
    ]
})
export class BuckswiseFrontEndSharedCommonModule {
    constructor() {
        registerLocaleData(locale);
    }
}
