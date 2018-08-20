import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BuckswiseFrontEndSharedModule } from 'app/shared';
import { StocksService } from 'app/my-assets/assets/stocks.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import {
  AssetsComponent,
  MutualFundComponent,
  mutualRoute,
  userprofileState
} from 'app/my-assets';
import { MutualFundService } from 'app/my-assets/assets/mutual-fund.service';
import { AssetsService } from 'app/my-assets/assets/assets.service';
import { LiabilitiesComponent } from './liabilities/liabilities.component';
import { CustomMaterialModule } from 'app/custom-material.module';
import { StocksComponent } from 'app/my-assets/mutual-fund/mutual-fund.component';

@NgModule({
  imports: [
    BuckswiseFrontEndSharedModule,
    RouterModule.forChild(userprofileState),
    BsDatepickerModule.forRoot(),
    CustomMaterialModule
  ],
  declarations: [
    AssetsComponent,
    MutualFundComponent,
    LiabilitiesComponent,
    StocksComponent
  ],
  providers: [StocksService, NgbActiveModal, MutualFundService, AssetsService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BuckswiseFrontEndMyAssetsModule {}
