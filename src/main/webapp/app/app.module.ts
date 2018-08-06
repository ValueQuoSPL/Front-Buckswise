import { DashBoardModule } from 'app/dashboard/dashboard.module';
import './vendor.ts';

import { NgModule, Injector } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Ng2Webstorage, LocalStorageService, SessionStorageService  } from 'ngx-webstorage';
import { JhiEventManager } from 'ng-jhipster';
import { AuthInterceptor } from 'app/blocks/interceptor/auth.interceptor';
import { AuthExpiredInterceptor } from 'app/blocks/interceptor/auth-expired.interceptor';
import { ErrorHandlerInterceptor } from 'app/blocks/interceptor/errorhandler.interceptor';
import { NotificationInterceptor } from 'app/blocks/interceptor/notification.interceptor';
import { BuckswiseFrontEndSharedModule, UserRouteAccessService } from 'app/shared';
import { BuckswiseFrontEndAppRoutingModule} from 'app/app-routing.module';
import { BuckswiseFrontEndHomeModule } from 'app/home/home.module';

import { BuckswiseFrontEndPratikModule } from 'app/pratik/pratik.module';
import { BuckswiseFrontEndDemoModule } from 'app/demo/demo.module';
import { BuckswiseAppSheetalModule } from 'app/sheetal/sheetal.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BuckswiseFrontEndAdminModule } from 'app/admin/admin.module';
import { BuckswiseFrontEndAccountModule } from 'app/account/account.module';
import { BuckswiseFrontEndEntityModule } from 'app/entities/entity.module';
import { PaginationConfig } from 'app/blocks/config/uib-pagination.config';

import { Routes } from '@angular/router';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BuckswiseFrontEndMyAssetsModule } from 'app/my-assets/my-assets.module';
import { FamilyModule } from 'app/family/family.module';
import { GoalModule } from 'app/goal/goal.module';
import { BuckswiseFrontEndRiskModule } from 'app/risk/risk.module';
import { RiskComponent } from 'app/risk/risk.component';
import {
    JhiMainComponent,
    NavbarComponent,
    FooterComponent,
    ProfileService,
    PageRibbonComponent,
    ErrorComponent
} from 'app/layouts';
import { SuccessComponent } from 'app/success/success.component';
import { FailComponent } from 'app/fail/fail.component';
import { DraggableModule } from './shared/draggable/draggable.module';
import { CustomDirectiveModule } from 'app/shared/directive/directive.module';

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        BuckswiseFrontEndAppRoutingModule,
        Ng2Webstorage.forRoot({ prefix: 'jhi', separator: '-'}),
        BuckswiseFrontEndSharedModule,
        BuckswiseFrontEndHomeModule,
        BuckswiseFrontEndAdminModule,
        BuckswiseFrontEndAccountModule,
        BuckswiseFrontEndEntityModule,

        BuckswiseFrontEndMyAssetsModule,
        BuckswiseFrontEndRiskModule,
        FamilyModule,
        FormsModule,
        BsDatepickerModule.forRoot(),
        GoalModule,
        BuckswiseFrontEndPratikModule,
        BuckswiseFrontEndDemoModule,
        BuckswiseAppSheetalModule,
        BuckswiseAppSheetalModule,
        DraggableModule,
        CustomDirectiveModule,
        DashBoardModule
    ],
    declarations: [
        JhiMainComponent,
        NavbarComponent,
        ErrorComponent,
        PageRibbonComponent,
        FooterComponent,
        SuccessComponent,
        FailComponent,
        RiskComponent,
    ],
    providers: [
        ProfileService,
        PaginationConfig,
        UserRouteAccessService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true,
            deps: [
                LocalStorageService,
                SessionStorageService
            ]
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthExpiredInterceptor,
            multi: true,
            deps: [
                Injector
            ]
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ErrorHandlerInterceptor,
            multi: true,
            deps: [
                JhiEventManager
            ]
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: NotificationInterceptor,
            multi: true,
            deps: [
                Injector
            ]
        }
    ],
    bootstrap: [ JhiMainComponent ],

    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ],
})
export class BuckswiseFrontEndAppModule {}
