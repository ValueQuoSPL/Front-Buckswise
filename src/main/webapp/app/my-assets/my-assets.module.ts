import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { RouterModule } from "@angular/router";
import { BuckswiseFrontEndSharedModule } from "app/shared";
import { StocksService } from "app/my-assets/assets/stocks.service";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { BsDatepickerModule } from "ngx-bootstrap/datepicker";
import {
  AssetsComponent,
  MutualFundComponent,
  mutualRoute,
  userprofileState
} from "app/my-assets";
import { MutualFundService } from "app/my-assets/assets/mutual-fund.service";
import { AssetsService } from "app/my-assets/assets/assets.service";
import { StocksComponent } from "../my-assets/mutual-fund/mutual-fund.component";
// import { stocksRoute } from '../entities/stocks';

@NgModule({
  imports: [
    BuckswiseFrontEndSharedModule,
    RouterModule.forChild(userprofileState),
    BsDatepickerModule.forRoot()
  ],
  declarations: [AssetsComponent, MutualFundComponent, StocksComponent],
  providers: [StocksService, NgbActiveModal, MutualFundService, AssetsService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BuckswiseFrontEndMyAssetsModule {}
