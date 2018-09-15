import { DashboardRoutingModule } from 'app/dashboard/dashboard.routes';
import { NgModule } from '@angular/core';
import { DashboardComponent } from 'app/dashboard/dashboard.component';
import { DraggableModule } from 'app/shared/draggable/draggable.module';
import { CustomMaterialModule } from 'app/custom-material.module';
import { ChartsModule } from '../../../../../node_modules/ng2-charts';
import { myasstsRoute } from 'app/my-assets/my-assets.route';
import { RouterModule } from '../../../../../node_modules/@angular/router';

@NgModule({
  imports: [
    DashboardRoutingModule,
    DraggableModule,
    CustomMaterialModule,
    ChartsModule,
    RouterModule.forRoot([myasstsRoute], { useHash: true })
  ],
  exports: [],
  providers: [],
  declarations: [DashboardComponent]
})
export class DashBoardModule {}
