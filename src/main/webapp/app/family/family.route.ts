import { Route } from '@angular/router';

import { UserRouteAccessService } from 'app/shared';
import { FamilyComponent } from 'app/family';

export const familyRoute: Route = {
    path: 'myfamily',
    component: FamilyComponent,
    data: {
        authorities: [],
        pageTitle: 'family.title'
    }
};
