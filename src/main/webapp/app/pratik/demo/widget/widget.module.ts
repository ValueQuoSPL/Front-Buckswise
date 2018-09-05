import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { GridComponent } from './grid/grid.component';
import { DraggableModule } from 'app/shared/draggable/draggable.module';

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
