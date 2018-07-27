import { DashboardRoutingModule } from 'app/dashboard/dashboard.routes';
import { NgModule } from '@angular/core';
import { DashboardComponent } from 'app/dashboard/dashboard.component';
import { DraggableModule } from 'app/shared/draggable/draggable.module';
import { CustomMaterialModule } from 'app/custom-material.module';

@NgModule({
    imports: [
        DashboardRoutingModule, DraggableModule, CustomMaterialModule
    ] ,
    exports: [

    ] ,
    providers: [

    ] ,
    declarations: [
        DashboardComponent
    ]
})

export class DashBoardModule {}
