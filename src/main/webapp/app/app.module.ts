import {
  JhiMainComponent,
  NavbarComponent,
  FooterComponent,
  ProfileService,
  PageRibbonComponent,
  ErrorComponent,
  SidebarComponent,
  SidenavComponent
} from "app/layouts";
import "./vendor.ts";
import { JhiEventManager } from "ng-jhipster";
import { NgModule, Injector } from "@angular/core";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { BrowserModule } from "@angular/platform-browser";
import { BsDatepickerModule } from "ngx-bootstrap/datepicker";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AuthInterceptor } from "app/blocks/interceptor/auth.interceptor";
import { AuthExpiredInterceptor } from "app/blocks/interceptor/auth-expired.interceptor";
import {
  Ng2Webstorage,
  LocalStorageService,
  SessionStorageService
} from "ngx-webstorage";
import { ErrorHandlerInterceptor } from "app/blocks/interceptor/errorhandler.interceptor";
import { NotificationInterceptor } from "app/blocks/interceptor/notification.interceptor";
import { PaginationConfig } from "app/blocks/config/uib-pagination.config";
import { BuckswiseFrontEndHomeModule } from "app/home/home.module";
import { BuckswiseFrontEndAppRoutingModule } from "app/app-routing.module";
import {
  BuckswiseFrontEndSharedModule,
  UserRouteAccessService
} from "app/shared";
import { BuckswiseFrontEndAdminModule } from "app/admin/admin.module";

import { BuckswiseFrontEndPratikModule } from "app/pratik/pratik.module";
import { BuckswiseFrontEndAccountModule } from "app/account/account.module";
import { BuckswiseFrontEndEntityModule } from "app/entities/entity.module";
import { DashBoardModule } from "app/dashboard/dashboard.module";
import { BuckswiseFrontEndMyAssetsModule } from "app/my-assets/my-assets.module";
import { FamilyModule } from "app/family/family.module";
import { GoalModule } from "app/goal/goal.module";
import { BuckswiseFrontEndRiskModule } from "app/risk/risk.module";
import { SuccessComponent } from "app/success/success.component";
import { FailComponent } from "app/fail/fail.component";
import { DraggableModule } from "app/shared/draggable/draggable.module";
import { CustomDirectiveModule } from "app/shared/directive/directive.module";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { CustomMaterialModule } from "app/custom-material.module";
import { SpinnerComponent } from "./spinner/spinner.component";
import { FlexLayoutModule } from "@angular/flex-layout";
import { BuckswiseTaxModule } from "../app/sheetal/tax/tax.module";

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    BuckswiseFrontEndAppRoutingModule,
    Ng2Webstorage.forRoot({ prefix: "jhi", separator: "-" }),
    BuckswiseFrontEndSharedModule,
    BuckswiseFrontEndHomeModule,
    BuckswiseFrontEndAdminModule,
    BuckswiseFrontEndAccountModule,
    BuckswiseFrontEndEntityModule,
    FlexLayoutModule,
    BuckswiseFrontEndMyAssetsModule,
    BuckswiseFrontEndRiskModule,
    FamilyModule,
    FormsModule,
    BsDatepickerModule.forRoot(),
    GoalModule,
    BuckswiseFrontEndPratikModule,
    DraggableModule,
    CustomDirectiveModule,
    CustomMaterialModule,
    DashBoardModule,
    FontAwesomeModule,
    BuckswiseTaxModule
    // BuckswiseFrontEndprimengModule
    // ServiceWorkerModule.register('/ngsw-worker.js')
  ],
  declarations: [
    JhiMainComponent,
    NavbarComponent,
    ErrorComponent,
    PageRibbonComponent,
    FooterComponent,
    SuccessComponent,
    FailComponent,
    SidebarComponent,
    SidenavComponent,
    SpinnerComponent
  ],
  providers: [
    ProfileService,
    PaginationConfig,
    UserRouteAccessService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
      deps: [LocalStorageService, SessionStorageService]
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthExpiredInterceptor,
      multi: true,
      deps: [Injector]
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorHandlerInterceptor,
      multi: true,
      deps: [JhiEventManager]
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: NotificationInterceptor,
      multi: true,
      deps: [Injector]
    }
  ],
  bootstrap: [JhiMainComponent],

  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BuckswiseFrontEndAppModule {}
