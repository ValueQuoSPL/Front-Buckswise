import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { DraggableModule } from 'app/demo/widget/draggable/draggable.module';
import { GridComponent } from 'app/demo/widget/grid/grid.component';

@NgModule({
    imports: [
        BrowserModule,
        DraggableModule
        ],
    declarations: [ GridComponent
    ],
    entryComponents: [
    ],
    providers: [
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class WidgetModule {}
