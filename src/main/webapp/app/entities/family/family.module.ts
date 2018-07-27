import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BuckswiseFrontEndSharedModule } from 'app/shared';
import {
    FamilyService,
    FamilyPopupService,
    FamilyComponent,
    FamilyDetailComponent,
    FamilyDialogComponent,
    FamilyPopupComponent,
    FamilyDeletePopupComponent,
    FamilyDeleteDialogComponent,
    familyRoute,
    familyPopupRoute,
    FamilyResolvePagingParams,
} from 'app/entities/family';

const ENTITY_STATES = [
    ...familyRoute,
    ...familyPopupRoute,
];

@NgModule({
    imports: [
        BuckswiseFrontEndSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        FamilyComponent,
        FamilyDetailComponent,
        FamilyDialogComponent,
        FamilyDeleteDialogComponent,
        FamilyPopupComponent,
        FamilyDeletePopupComponent,
    ],
    entryComponents: [
        FamilyComponent,
        FamilyDialogComponent,
        FamilyPopupComponent,
        FamilyDeleteDialogComponent,
        FamilyDeletePopupComponent,
    ],
    providers: [
        FamilyService,
        FamilyPopupService,
        FamilyResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BuckswiseFrontEndFamilyModule {}
