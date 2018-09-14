import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BuckswiseFrontEndSharedModule } from 'app/shared';
import { StockService } from 'app/my-assets/stocks/stocks.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import {
  // AssetsComponent,
  MutualFundComponent,
  mutualRoute,
  liRoute
} from 'app/my-assets';
import { myasstsRoute } from './my-assets.route';
// import { AssetsService } from 'app/my-assets/assets/assets.service';
import { LiabilitiesComponent } from './liabilities/liabilities.component';
import { CustomMaterialModule } from 'app/custom-material.module';
import { StockComponent } from 'app/my-assets/stocks/stocks.component';
import { StocksComponent } from 'app/my-assets/mutual-fund/mutual-fund.component.ts';
import { PropertyComponent } from 'app/my-assets/property/property.component';
import { SavingSchemeComponent } from 'app/my-assets/saving-scheme/savingscheme.component';
import { SavingSchemeService } from 'app/my-assets/saving-scheme/savingscheme.service';
import { FutureOptionComponent } from './future-option/futureoption.component';
import { ChitFundComponent } from './chit-funds/chitfund.component';
import { CashComponent } from './cash/cash.component';
import { AlternativeComponent } from './alternate-investment/alternateinvest.component';
import { MyAssetsComponent } from './my-assets.component';
import { MutualComponent } from 'app/my-assets/mutual/mutual.component';
// import { MutualFundComponent } from 'app/my-assets/mutual-fund/mutual-fund.component.ts';
import { MutualfundService } from 'app/my-assets/mutual/mutual.service';
import { AlternateService } from './alternate-investment/alternateinvest.service';
import { CashService } from './cash/cash.service';
import { ChitFundService } from './chit-funds/chitfund.service';
import { PropertyService } from './property/property.service';
import { FutureOptionService } from './future-option/futureoption.service';

@NgModule({
  imports: [
    BuckswiseFrontEndSharedModule,
    RouterModule.forRoot([myasstsRoute], { useHash: true }),
    RouterModule.forRoot([liRoute], { useHash: true }),
    BsDatepickerModule.forRoot(),
    CustomMaterialModule
  ],
  declarations: [
    // AssetsComponent,
    MutualComponent,
    MutualFundComponent,
    LiabilitiesComponent,
    AlternativeComponent,
    CashComponent,
    ChitFundComponent,
    FutureOptionComponent,
    PropertyComponent,
    SavingSchemeComponent,
    StockComponent,
    StocksComponent,
    MyAssetsComponent
  ],
  providers: [
    StockService,
    FutureOptionService,
    NgbActiveModal,
    PropertyService,
    MutualfundService,
    SavingSchemeService,
    AlternateService,
    CashService,
    ChitFundService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BuckswiseFrontEndMyAssetsModule {}
