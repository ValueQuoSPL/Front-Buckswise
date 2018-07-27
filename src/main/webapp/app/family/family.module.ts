import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FamilyComponent, familyRoute } from 'app/family';
import { FamilyserviceService } from 'app/family/familyservice.service';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [
        RouterModule.forRoot([familyRoute], { useHash: true }),
        FormsModule,
        CommonModule,
        BsDatepickerModule.forRoot()
    ],
    declarations: [
        FamilyComponent
    ],
    entryComponents: [
    ],
    providers: [
        FamilyserviceService
    ]
})
export class FamilyModule { }
